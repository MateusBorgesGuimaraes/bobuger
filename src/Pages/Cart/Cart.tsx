import React from "react";
import styles from "./Cart.module.css";
import { assets } from "../../assets/assets";
import LinkButton from "../../Componets/LinkButton/LinkButton";
import CartContext from "../../Context/CartContext";
import { GET_PROD } from "../../Api";
import { Link } from "react-router-dom";

export type ICart = {
  produtoId: string;
  quantidade: number;
};

export type ICartInfo = {
  produtoId: string;
  quantidade: number;
  nome: string;
  img: string;
  preco: number;
};

const Cart = () => {
  const [quantities, setQuantities] = React.useState<Record<string, number>>(
    {}
  );
  const [cartsInfo, setCartsInfo] = React.useState<ICartInfo[]>([]);
  const { dataCart, addItem, removeItem } = React.useContext(CartContext);

  React.useEffect(() => {
    const fetchProd = async () => {
      const produtos = dataCart?.produtos || [];

      const fetchProductPromises = produtos.map(async (produto: ICart) => {
        const { produtoId, quantidade } = produto;
        const { url, options } = GET_PROD(produtoId);
        const response = await fetch(url, options);
        const produtoData = await response.json();

        const cartInfo: ICartInfo = {
          produtoId: produtoData._id,
          nome: produtoData.nome,
          quantidade,
          img: produtoData.img,
          preco: produtoData.preco,
        };

        return cartInfo;
      });
      const cartsInfo = await Promise.all(fetchProductPromises);
      setCartsInfo(cartsInfo);

      const initialQuantities: Record<string, number> = {};
      cartsInfo.forEach((prod) => {
        initialQuantities[prod.produtoId] = prod.quantidade;
      });
      setQuantities(initialQuantities);
    };
    fetchProd();
  }, [dataCart]);

  // console.log("cartsInfo em Header: " + JSON.stringify(cartsInfo));

  function addFunc(id: string, event: React.MouseEvent) {
    event.preventDefault();
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
    addItem(id);
  }

  function removeFunc(id: string, event: React.MouseEvent) {
    event.preventDefault();
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [id]: Math.max((prevQuantities[id] || 0) - 1, 0),
      };
      return newQuantities;
    });
    removeItem(id);
  }

  return (
    <section className={`${styles.cartBg}`}>
      <section className="container">
        <div className={`${styles.cartGrid} container`}>
          <h1>CART</h1>
          <div className={styles.tableContainer}>
            <table className={styles.cartTable}>
              <caption>Conteudo do seu carrinho</caption>

              <tr>
                <th>PRODUTO</th>
                <th>PREÇO(R$)</th>
                <th>QUANTIDADE</th>
                <th>SUBTOTAL</th>
              </tr>

              {cartsInfo.map((prod) => (
                <tr key={prod.produtoId}>
                  <td>
                    <Link
                      className={styles.col1}
                      to={`/produtos/produto/${prod.produtoId}`}
                    >
                      <img className={styles.prodImg} src={prod.img} alt="" />
                      <p>{prod.nome}</p>
                    </Link>
                  </td>

                  <td className={styles.col2}>
                    <p>R$ {prod.preco}</p>
                  </td>

                  <td className={styles.col3}>
                    <form action="">
                      <button
                        onClick={(event) => removeFunc(prod.produtoId, event)}
                      >
                        <img src={assets.minus} alt="" />
                      </button>
                      <input
                        type="number"
                        value={quantities[prod.produtoId] || 0}
                        readOnly
                      />
                      <button
                        onClick={(event) => addFunc(prod.produtoId, event)}
                      >
                        <img src={assets.plus} alt="" />
                      </button>
                    </form>
                  </td>

                  <td className={styles.col4}>
                    R$ {(prod.preco * quantities[prod.produtoId]).toFixed(2)}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <div className={styles.fecharPedido}>
          <div>
            <p>
              TOTAL: R${" "}
              {cartsInfo
                .reduce(
                  (acc, prod) => acc + prod.preco * quantities[prod.produtoId],
                  0
                )
                .toFixed(2)}
            </p>
            <LinkButton
              href="pedidos/enviar"
              color="#fff"
              backgroundColor="#ff7a00"
              fontSize="24px"
            >
              FECHAR PEDIDO
            </LinkButton>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Cart;
