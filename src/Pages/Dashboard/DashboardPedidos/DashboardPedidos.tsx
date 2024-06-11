import React from "react";
import styles from "../DashboardProdutos/DashboardProdutos.module.css";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { GET_ALL_PEDIDOS } from "../../../Api";
import useFetch from "../../../Hooks/useFetch";
import { IRegistro } from "../../Login/LoginCreate/LoginCreate";
import UserContext from "../../../Context/UserContext";
import { IPedidoID } from "../../Pedidos/Pedidos";

export type IUsuarioID = IRegistro & {
  _id: string;
};

interface ISimplifiedPedido2 {
  _id: string;
  processo: string;
  cliente: string;
  pagamento: string;
}

const DashboardPedidos = () => {
  const [pedidos, setPedidos] = React.useState<ISimplifiedPedido2[] | null>(
    null
  );
  const { data } = React.useContext(UserContext);
  const token = window.localStorage.getItem("token");
  const { request } = useFetch();

  React.useEffect(() => {
    async function loadPedidos() {
      if (data?._id && token) {
        try {
          const { url, options } = GET_ALL_PEDIDOS(token);
          const { response, json } = await request(url, options);
          if (!response) throw new Error("Pedidos nao encontrados");

          const simplifiedPedidos: ISimplifiedPedido2[] = json.map(
            (pedido: IPedidoID) => ({
              _id: pedido._id,
              processo: pedido.pedido.status.processo,
              cliente: pedido.pedido.endereco.cliente,
              pagamento: pedido.pedido.status.pagamento,
            })
          );

          setPedidos(simplifiedPedidos);
        } catch (err) {
          console.log(err);
        }
      }
    }
    loadPedidos();
  }, [data?._id, token, request]);

  // console.log("pedidos: " + pedidos);

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.cartTable}>
          <caption>TODOS OS PEDIDOS</caption>

          <tr>
            <th>PEDIDO</th>
            <th>PAGAMENTO</th>
            <th>STATUS</th>
            <th>CONCLUIDO</th>
          </tr>

          {pedidos?.map((pedido) => (
            <tr>
              <td className={styles.col1}>
                <Link
                  className={styles.linkCol1}
                  to={`/dashboard/pedidos/pedido/${pedido._id}`}
                >
                  <img className={styles.imgCol1} src={assets.link} alt="" />
                  <p className={styles.pCol1}>{pedido.cliente}</p>
                </Link>
              </td>

              <td className={styles.col2}>
                <p className={styles.pCol2}>{pedido.pagamento}</p>
              </td>

              <td className={styles.col3}>
                <p
                  style={{ textTransform: "uppercase" }}
                  className={styles.pCol1}
                >
                  {pedido.processo}
                </p>
              </td>

              <td className={styles.col4}>
                <img
                  src={
                    pedido.processo === "concluido"
                      ? assets.check
                      : assets.processando
                  }
                  alt=""
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default DashboardPedidos;
