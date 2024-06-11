import React from "react";
import { ATT_CART, CREATE_USER_CART, GET_USER_CART_BY_ID } from "../Api";
import UserContext from "./UserContext";

type ICart = {
  _id: string;
  usuarioId: string;
  produtos: { produtoId: string; quantidade: number }[];
};

export type ICartContext = {
  dataCart: ICart | null;
  loading: boolean;
  error: string | null;
  createCart: () => Promise<void>;
  addItem: (id: string, more?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCard: (id: string) => Promise<void>;
};

export const CartContext = React.createContext<ICartContext>(
  {} as ICartContext
);

export const CartStorage = ({ children }: React.PropsWithChildren) => {
  const { data: userData, login } = React.useContext(UserContext) || {};

  const [dataCart, setDataCart] = React.useState<ICart | null>(null);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const token = window.localStorage.getItem("token");

  async function createCart() {
    if (!token || !userData || !userData._id) return;

    setLoading(true);
    setError(null);

    try {
      const { url: getUrl, options: getOptions } = GET_USER_CART_BY_ID(
        userData._id,
        token
      );
      const response = await fetch(getUrl, getOptions);
      const getJson = await response.json();

      if (getJson.length > 0) {
        setDataCart(getJson[0]);
      } else {
        const { url: createUrl, options: createOptions } = CREATE_USER_CART(
          token,
          userData._id
        );
        const response = await fetch(createUrl, createOptions);
        const createJson = await response.json();
        setDataCart(createJson);
      }
    } catch (error) {
      setError("Erro ao processar o carrinho.");
    } finally {
      setLoading(false);
    }
  }

  async function clearCard(id: string) {
    if (!token || !dataCart) {
      console.log("Token or dataCart is missing.");
      return;
    }
    try {
      const clearDataCartProds = {
        ...dataCart,
        produtos: [],
      };
      const { url, options } = ATT_CART<ICart>(
        token,
        dataCart._id,
        clearDataCartProds
      );

      const response = await fetch(url, options);
      if (!response) throw new Error("erro ao limpar o carrinho");
      const json = await response.json();
      setDataCart(json);
      console.log("clear data cart: " + JSON.stringify(clearDataCartProds));
    } catch (err) {
      console.log(err);
    }
  }

  async function addItem(id: string, more: number = 0) {
    if (!token || !dataCart) {
      console.log("Token or dataCart is missing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedProducts = [...dataCart.produtos];

      const productIndex = updatedProducts.findIndex(
        (item) => item.produtoId === id
      );

      if (productIndex !== -1) {
        if (more && more > 0) {
          updatedProducts[productIndex].quantidade += more;
        } else {
          updatedProducts[productIndex].quantidade += 1;
        }
      } else {
        if (more && more > 0) {
          updatedProducts.push({ produtoId: id, quantidade: more });
        } else {
          updatedProducts.push({ produtoId: id, quantidade: 1 });
        }
      }

      const updatedCart = {
        ...dataCart,
        produtos: updatedProducts,
      };

      const { url, options } = ATT_CART<ICart>(
        token,
        dataCart._id,
        updatedCart
      );

      const response = await fetch(url, options);
      const json = await response.json();

      setDataCart(json);
    } catch (error) {
      console.log("Error caught: ", error);
      if (error instanceof Error)
        setError(error.message || "Erro ao adicionar item.");
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(productId: string) {
    if (!token || !dataCart) return;

    setLoading(true);
    setError(null);

    try {
      // Create a new products array with updated quantities
      const newProducts = dataCart.produtos
        .map((prod) => {
          if (prod.produtoId === productId) {
            const newQuantity = prod.quantidade - 1;
            return newQuantity > 0
              ? { ...prod, quantidade: newQuantity }
              : null;
          } else {
            return prod;
          }
        })
        .filter(Boolean); // Remove null values (products with zero quantity)

      // Update the cart on the server
      const { url, options } = ATT_CART(token, dataCart._id, {
        ...dataCart,
        produtos: newProducts,
      });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Failed to update cart");

      const json = await response.json();
      setDataCart(json);
    } catch (error) {
      setError("Erro ao remover item.");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (login) {
      createCart();
    }
  }, [login]);

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        createCart,
        clearCard,
        dataCart,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
