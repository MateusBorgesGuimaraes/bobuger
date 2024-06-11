import React from "react";
import styles from "./DashboardProdutos.module.css";
import LinkButton from "../../../Componets/LinkButton/LinkButton";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { GET_ALL_PRODS, PROD_DELETE } from "../../../Api";
import useFetch from "../../../Hooks/useFetch";

export type IMainCategories = "normal" | "diet" | "vegetariana" | "organica";

export type IProduto = {
  // _id: string;
  nome: string;
  nomeResumido: string;
  descricao: string;
  img: string;
  categotiaPrincipal: IMainCategories;
  subCategorias: string[];
  preco: number;
};

export type IProduoID = IProduto & {
  _id: string;
};

const DashboardProdutos = () => {
  const [data, setData] = React.useState<IProduoID[] | null>(null);
  const { request, error } = useFetch();

  async function deleteProd(id: string) {
    const token = window.localStorage.getItem("token");
    const userConfirmation = confirm(
      "Você tem certeza de que deseja deletar este item?"
    );
    if (token && userConfirmation) {
      const { url, options } = PROD_DELETE(token, id);
      const { response } = await request(url, options);
      if (response?.ok) {
        console.log("produto deletado");
        setData(
          (prevData) =>
            prevData?.filter((produto) => produto._id !== id) || null
        );
      } else {
        console.log("erro ao deletar produto");
      }
    }
  }

  React.useEffect(() => {
    async function getProducts() {
      const { url, options } = GET_ALL_PRODS();
      const { response, json } = await request(url, options);
      if (response?.ok) {
        setData(json);
      } else {
        console.log("produtos nao encontrados");
      }
    }
    getProducts();
  }, [request]);

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.cartTable}>
          <caption>TODOS OS PRODUTOS</caption>

          <tr>
            <th>PRODUTO</th>
            <th>CATEGORIA</th>
            <th>EDITAR</th>
            <th>EXCLUIR</th>
          </tr>

          {data?.map((produto) => (
            <tr key={produto._id}>
              <td className={styles.col1}>
                <Link
                  className={styles.linkCol1}
                  to={`/produtos/produto/${produto._id}`}
                >
                  <img className={styles.imgCol1} src={assets.link} alt="" />
                  <p className={styles.pCol1}>{produto.nome}</p>
                </Link>
              </td>

              <td className={styles.col2}>
                <p className={styles.pCol2}>{produto.categotiaPrincipal}</p>
              </td>

              <td className={styles.col3}>
                <Link
                  className={styles.linkCol3}
                  to={`/dashboard/produtos/edit/${produto._id}`}
                >
                  <img className={styles.imgCol3} src={assets.edit} alt="" />
                </Link>
              </td>

              <td className={styles.col4}>
                <button
                  onClick={() => deleteProd(produto._id)}
                  className={styles.buttonCol4}
                >
                  <img className={styles.imgCol4} src={assets.deleta} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.fecharPedido}>
        <div>
          <LinkButton
            href="/dashboard/produtos/add"
            color="#fff"
            backgroundColor="#ff7a00"
            fontSize="24px"
          >
            ADD PRODUTO
          </LinkButton>
        </div>
      </div>
    </>
  );
};

export default DashboardProdutos;
