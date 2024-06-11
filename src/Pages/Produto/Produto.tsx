import React from "react";
import styles from "./Produto.module.css";
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import { IProduoID } from "../Dashboard/DashboardProdutos/DashboardProdutos";
import useFetch from "../../Hooks/useFetch";
import { GET_PROD } from "../../Api";
import CartContext from "../../Context/CartContext";

const Produto = () => {
  const urlSite = useParams();
  const [data, setData] = React.useState<IProduoID | null>(null);
  const [quantity, setQuantity] = React.useState<number | null>(null);
  const { request } = useFetch();
  React.useEffect(() => {
    async function getProd() {
      if (urlSite.id) {
        const { url, options } = GET_PROD(urlSite.id);
        const { response, json } = await request(url, options);
        if (response?.ok) {
          setData(json);
        } else {
          console.log("produto nao encontrado");
        }
      }
    }
    getProd();
  }, [urlSite, request]);

  const { addItem } = React.useContext(CartContext);

  function handleQuantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(event.target.value));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (data) {
      console.log("passou aqui");
      addItem(data._id, Number(quantity));
      setQuantity(0);
    }
  }

  return (
    <section id={data?._id} className={`${styles.produtoBg}`}>
      <section className="container">
        <div className={styles.produtoGrid}>
          <div className={styles.produtoCol1}>
            <img src={data?.img} alt="" />
          </div>
          <div className={styles.produtoCol2}>
            <h1 className={styles.produtoTitle}>{data?.nome}</h1>
            <div className={styles.produtoDesContainer}>
              <h4>DESCRIÇÃO</h4>
              <p>{data?.descricao}</p>
            </div>
            <div className={styles.produtoPrecoContainer}>
              <h4>PREÇO</h4>
              <p>R$ {data?.preco}</p>
            </div>

            <div className={styles.produtoUltimaLinhaContainer}>
              <form
                onSubmit={handleSubmit}
                className={styles.produtoQuantidade}
              >
                <div>
                  <label>QUANTIDADE</label>
                  <input
                    value={quantity ? quantity : 0}
                    type="number"
                    onChange={handleQuantityChange}
                  />
                </div>
                <button>
                  ADD <img src={assets.cart} alt="" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Produto;
