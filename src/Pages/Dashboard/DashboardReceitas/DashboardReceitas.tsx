import React from "react";
import styles from "../DashboardProdutos/DashboardProdutos.module.css";
import LinkButton from "../../../Componets/LinkButton/LinkButton";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { GET_ALL_RECEITAS, RECEITA_DELETE } from "../../../Api";
import useFetch from "../../../Hooks/useFetch";

export type ICategorias = "molho" | "salada" | "acompanhamento";

export type IReceita = {
  // _id: string;
  titulo: string;
  receita: string;
  img: string;
  categoria: ICategorias;
  ingredientes: string[];
};

export type IReceitaID = IReceita & {
  _id: string;
};

const DashboardReceitas = () => {
  const [data, setData] = React.useState<IReceitaID[] | null>(null);
  const { request, error } = useFetch();

  async function deleteReceita(id: string) {
    const token = window.localStorage.getItem("token");
    const userConfirmation = confirm(
      "Você tem certeza de que deseja deletar este item?"
    );
    if (token && userConfirmation) {
      const { url, options } = RECEITA_DELETE(token, id);
      const { response } = await request(url, options);
      if (response?.ok) {
        console.log("receita deletada");
        setData(
          (prevData) =>
            prevData?.filter((receita) => receita._id !== id) || null
        );
      } else {
        console.log("erro ao deletar receita");
      }
    }
  }

  React.useEffect(() => {
    async function getReceitas() {
      const { url, options } = GET_ALL_RECEITAS();
      const { response, json } = await request(url, options);
      if (response?.ok) {
        setData(json);
      } else {
        console.log("receitas nao encontrados");
      }
    }
    getReceitas();
  }, [request]);

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.cartTable}>
          <caption>TODAS AS RECEITAS</caption>

          <tr>
            <th>RECEITA</th>
            <th>CATEGORIA</th>
            <th>EDITAR</th>
            <th>EXCLUIR</th>
          </tr>

          {data?.map((receita) => (
            <tr key={receita._id}>
              <td className={styles.col1}>
                <Link
                  className={styles.linkCol1}
                  to={`/receitas/receita/${receita._id}`}
                >
                  <img className={styles.imgCol1} src={assets.link} alt="" />
                  <p className={styles.pCol1}>{receita.titulo}</p>
                </Link>
              </td>

              <td className={styles.col2}>
                <p className={styles.pCol2}>{receita.categoria}</p>
              </td>

              <td className={styles.col3}>
                <Link
                  className={styles.linkCol3}
                  to={`/dashboard/receitas/edit/${receita._id}`}
                >
                  <img className={styles.imgCol3} src={assets.edit} alt="" />
                </Link>
              </td>

              <td className={styles.col4}>
                <button
                  onClick={() => deleteReceita(receita._id)}
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
            href="/dashboard/receitas/add"
            color="#fff"
            backgroundColor="#ff7a00"
            fontSize="24px"
          >
            ADD RECEITA
          </LinkButton>
        </div>
      </div>
    </>
  );
};

export default DashboardReceitas;
