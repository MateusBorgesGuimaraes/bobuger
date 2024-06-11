import React from "react";
import styles from "./Pedidos.module.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { IPedido } from "../EnviarPedido/EnviarPedido";
import { GET_USER_PEDIDOS_BY_ID } from "../../Api";
import UserContext from "../../Context/UserContext";
import useFetch from "../../Hooks/useFetch";

interface ISimplifiedPedido {
  _id: string;
  processo: string;
}

export type IPedidoID = IPedido & {
  _id: string;
};

const Pedidos = () => {
  const [pedidos, setPedidos] = React.useState<ISimplifiedPedido[] | null>(
    null
  );
  const { data } = React.useContext(UserContext);
  const token = window.localStorage.getItem("token");
  const { request } = useFetch();

  React.useEffect(() => {
    async function loadPedidos() {
      if (data?._id && token) {
        try {
          const { url, options } = GET_USER_PEDIDOS_BY_ID(data._id, token);
          const { response, json } = await request(url, options);
          if (!response) throw new Error("Pedidos nao encontrados");

          const simplifiedPedidos: ISimplifiedPedido[] = json.map(
            (pedido: IPedidoID) => ({
              _id: pedido._id,
              processo: pedido.pedido.status.processo,
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

  function setarEstados(estado: string): number {
    switch (estado) {
      case "confirmar":
        return 1;
      case "processando":
        return 2;
      case "caminho":
        return 3;
      case "entregue":
        return 4;
      case "concluido":
        return 5;
      default:
        throw new Error("Estado inválido");
    }
  }

  let setado;

  return (
    <section className={styles.bgPedidos}>
      <div className="container">
        <div className={styles.containerPedidos}>
          <h1 className={styles.tituloPedidos}>TODOS OS PEDIDOS</h1>
          <table className={styles.cartTable}>
            <caption>PEDIDOS</caption>

            <tr>
              <th>_ID PEDIDO</th>
              <th>CONFIRMANDO</th>
              <th>PROCESSANDO</th>
              <th>A CAMINHO</th>
              <th>ENTREGUE</th>
              <th>CONCLUIDO</th>
              <th>PEDIDO</th>
            </tr>

            <tbody>
              {pedidos?.map((pedido) => {
                const setado = setarEstados(pedido.processo);

                return (
                  <tr key={pedido._id}>
                    <td className={styles.id}>
                      <p>{pedido._id}</p>
                    </td>

                    <td className={styles.col1}>
                      <div>
                        <img
                          src={setado >= 1 ? assets.check : assets.processando}
                          alt=""
                        />
                      </div>
                    </td>

                    <td className={styles.col2}>
                      <div>
                        <img
                          src={setado >= 2 ? assets.check : assets.processando}
                          alt=""
                        />
                      </div>
                    </td>

                    <td className={styles.col3}>
                      <div>
                        <img
                          src={setado >= 3 ? assets.check : assets.processando}
                          alt=""
                        />
                      </div>
                    </td>

                    <td className={styles.col4}>
                      <div>
                        <img
                          src={setado >= 4 ? assets.check : assets.processando}
                          alt=""
                        />
                      </div>
                    </td>

                    <td className={styles.col5}>
                      <div>
                        <img
                          src={setado >= 5 ? assets.check : assets.processando}
                          alt=""
                        />
                      </div>
                    </td>

                    <td className={styles.col6}>
                      <Link to={`/pedidos/pedido/${pedido._id}`}>
                        <img src={assets.reticencias} alt="" />
                        <p>PEDIDO</p>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Pedidos;
