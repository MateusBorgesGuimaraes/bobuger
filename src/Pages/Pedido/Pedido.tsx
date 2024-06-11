import React from "react";
import styles from "./Pedido.module.css";
import { Link, useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { IPedidoID } from "../Pedidos/Pedidos";
import { GET_USER_PEDIDO_BY_ID } from "../../Api";
import useFetch from "../../Hooks/useFetch";

const Pedido = () => {
  const { id } = useParams();
  const [pedido, setPedido] = React.useState<IPedidoID | null>(null);
  const { request } = useFetch();
  const token = window.localStorage.getItem("token");

  React.useEffect(() => {
    async function getProd() {
      if (token && id) {
        try {
          const { url, options } = GET_USER_PEDIDO_BY_ID(id, token);
          const { response, json } = await request(url, options);
          if (!response) throw new Error("erro ao pedar o pedido");
          setPedido(json);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getProd();
  }, [token, id, request]);

  if (!pedido) return null;
  const calcularPrecoTotal = (): number => {
    return pedido.pedido.produtos.reduce((total, produto) => {
      const quantidade = produto.quantidade ?? 0;
      return total + produto.preco * quantidade;
    }, 0);
  };

  return (
    <section className={styles.bgSend}>
      <div className="container">
        <div className={styles.containerSend}>
          <h1 className={styles.tituloSend}>PEDIDO</h1>
          <table className={styles.cartTable}>
            <caption>TODOS OS PRODUTOS</caption>

            <tr>
              <th>PRODUTO</th>
              <th>PRECO</th>
              <th>QUANTIDADE</th>
              <th>SUBTOTAL</th>
            </tr>

            {pedido?.pedido.produtos.map((p) => (
              <tr key={p.produtoId}>
                <td>
                  <Link
                    className={styles.linkCol1}
                    to={`/produtos/produto/${p.produtoId}`}
                  >
                    <img className={styles.imgCol1} src={p.img} alt="" />
                  </Link>
                </td>

                <td className={styles.col2}>
                  <p className={styles.pCol2}>R$ {p.preco}</p>
                </td>

                <td className={styles.col3}>{p.quantidade}</td>

                <td className={styles.col3}>
                  {p.quantidade && (p.preco * p.quantidade).toFixed(2)}
                </td>
              </tr>
            ))}

            <p className={styles.total}>
              TOTAL: R$ {calcularPrecoTotal().toFixed(2)}
            </p>
          </table>

          <div className={styles.infosPedidos}>
            <p>
              ID DO PEDIDO: <p className={styles.subP}>{pedido?._id}</p>
            </p>
            <p>
              ENTREGAR PARA:{" "}
              <p className={styles.subP}>{pedido?.pedido.endereco.cliente}</p>
            </p>
            <p>
              RUA: <p className={styles.subP}>{pedido?.pedido.endereco.rua}</p>
            </p>
            <p>
              BAIRRO:{" "}
              <p className={styles.subP}>{pedido?.pedido.endereco.bairro}</p>
            </p>
            <p>
              NUMERO:{" "}
              <p className={styles.subP}>{pedido?.pedido.endereco.numero}</p>
            </p>
            <p>
              FORMA DE PAGAMENTO:{" "}
              <p className={styles.subP}>{pedido?.pedido.status.pagamento}</p>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pedido;
