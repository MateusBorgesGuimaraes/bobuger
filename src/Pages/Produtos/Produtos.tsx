import React from "react";
import styles from "./Produtos.module.css";
import {
  IProduoID,
  IProduto,
} from "../Dashboard/DashboardProdutos/DashboardProdutos";
import { GET_ALL_PRODS } from "../../Api";
import useFetch from "../../Hooks/useFetch";
import Card from "../../Componets/Card/Card";

const Produtos = () => {
  const [prod, setProd] = React.useState<IProduoID[] | null>();
  const [active, setActive] = React.useState<string>("all");
  const [filteredProd, setFilteredProd] = React.useState<IProduoID[] | null>(
    null
  );
  const { request } = useFetch();

  React.useEffect(() => {
    async function getProds() {
      const { url, options } = GET_ALL_PRODS();
      const { response, json } = await request(url, options);
      if (!response) return null;
      setProd(json as IProduoID[]);
      setFilteredProd(json as IProduoID[]);
    }
    getProds();
  }, [request]);

  const handleClick = (type: string) => {
    if (prod) {
      let filtered = prod;
      switch (type) {
        case "vegetariana":
          filtered = prod.filter(
            (item) => item.categotiaPrincipal === "vegetariana"
          );
          break;
        case "organica":
          filtered = prod.filter(
            (item) => item.categotiaPrincipal === "organica"
          );
          break;
        case "diet":
          filtered = prod.filter((item) => item.categotiaPrincipal === "diet");
          break;
        case "normal":
          filtered = prod.filter(
            (item) => item.categotiaPrincipal === "normal"
          );
          break;
        default:
          filtered = prod;
      }
      setFilteredProd(filtered);
      setActive(type);
    }
  };

  return (
    <section className={styles.bgProdutos}>
      <div className="container">
        <div className={styles.cotainerProds}>
          <div className={styles.buttonsContainer}>
            <button
              className={active === "all" ? styles.active : ""}
              onClick={() => handleClick("all")}
            >
              TODOS
            </button>
            <button
              className={active === "vegetariana" ? styles.active : ""}
              onClick={() => handleClick("vegetariana")}
            >
              VEGETARIANO
            </button>
            <button
              className={active === "organica" ? styles.active : ""}
              // className={styles.active}
              onClick={() => handleClick("organica")}
            >
              ORGANICOS
            </button>
            <button
              className={active === "diet" ? styles.active : ""}
              onClick={() => handleClick("diet")}
            >
              DIET
            </button>
            <button
              className={active === "normal" ? styles.active : ""}
              onClick={() => handleClick("normal")}
            >
              NORMAL
            </button>
          </div>
          <div className={styles.cardContainer}>
            {filteredProd &&
              filteredProd?.map((p) => <Card key={p._id} card={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Produtos;
