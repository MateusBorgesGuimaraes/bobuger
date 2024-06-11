import React from "react";
import styles from "../DashboardProdutos/DashboardProdutos.module.css";
import LinkButton from "../../../Componets/LinkButton/LinkButton";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { GET_ALL_USUARIOS, USUARIO_DELETE } from "../../../Api";
import useFetch from "../../../Hooks/useFetch";
import { IRegistro } from "../../Login/LoginCreate/LoginCreate";

export type IUsuarioID = IRegistro & {
  _id: string;
};

const DashboardUsuarios = () => {
  const [data, setData] = React.useState<IUsuarioID[] | null>(null);
  const { request, error } = useFetch();

  async function deleteUsuario(id: string) {
    const token = window.localStorage.getItem("token");
    const userConfirmation = confirm(
      "Você tem certeza de que deseja deletar este item?"
    );
    if (token && userConfirmation) {
      const { url, options } = USUARIO_DELETE(token, id);
      const { response } = await request(url, options);
      if (response?.ok) {
        console.log("usuario deletado");
        setData(
          (prevData) =>
            prevData?.filter((usuario) => usuario._id !== id) || null
        );
      } else {
        console.log("erro ao deletar usuario");
      }
    }
  }

  React.useEffect(() => {
    async function getUsuarios() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { url, options } = GET_ALL_USUARIOS(token);
        const { response, json } = await request(url, options);
        if (response?.ok) {
          setData(json);
        } else {
          console.log("usuarios nao encontrados");
        }
      } else {
        console.log("token nao encontrado ou invalido");
      }
    }
    getUsuarios();
  }, [request]);

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.cartTable}>
          <caption>TODOS OS USUARIOS</caption>

          <tr>
            <th>NOME</th>
            <th>NUMERO</th>
            <th>EMAIL</th>
            <th>EXCLUIR</th>
          </tr>

          {data?.map((usuario) => (
            <tr key={usuario._id}>
              <td className={styles.col1}>
                <Link
                  className={styles.linkCol1}
                  to={`/dashboard/usuarios/usuario/${usuario._id}`}
                >
                  <img className={styles.imgCol1} src={assets.link} alt="" />
                  <p className={styles.pCol1}>{usuario.usuario}</p>
                </Link>
              </td>

              <td className={styles.col2}>
                <p className={styles.pCol2}>{usuario.telefone}</p>
              </td>

              <td className={styles.col3}>
                <p className={styles.pCol1}>{usuario.email}</p>
              </td>

              <td className={styles.col4}>
                <button
                  onClick={() => deleteUsuario(usuario._id)}
                  className={styles.buttonCol4}
                >
                  <img className={styles.imgCol4} src={assets.deleta} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default DashboardUsuarios;
