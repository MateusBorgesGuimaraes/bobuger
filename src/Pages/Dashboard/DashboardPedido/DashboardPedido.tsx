import React from "react";
import { Link, useParams } from "react-router-dom";

import { GET_USER_PEDIDO_BY_ID, PEDIDO_PUT } from "../../../Api";
import useFetch from "../../../Hooks/useFetch";
import { IRegistro } from "../../Login/LoginCreate/LoginCreate";
import styles from "./DashboardPedido.module.css";
import Button from "../../../Componets/Form/Button/Button";
import { IPedidoID } from "../../Pedidos/Pedidos";
import { ProcessoStatus } from "../../EnviarPedido/EnviarPedido";

export type IUsuarioID = IRegistro & {
  _id: string;
};

const DashboardPedido = () => {
  const { id } = useParams<{ id: string }>();
  const [pedido, setPedido] = React.useState<IPedidoID | null>(null);
  const [inputValue, setInputValue] = React.useState<ProcessoStatus | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);
  const { request } = useFetch();
  const token = window.localStorage.getItem("token");

  React.useEffect(() => {
    async function getProd() {
      if (token && id) {
        try {
          const { url, options } = GET_USER_PEDIDO_BY_ID(id, token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Erro ao buscar o pedido");
          const json = await response.json();
          setPedido(json);
        } catch (err) {
          console.error(err);
          setError((err as Error).message);
        }
      }
    }
    getProd();
  }, [token, id, request]);

  React.useEffect(() => {
    if (pedido?.pedido.status.processo) {
      setInputValue(pedido.pedido.status.processo);
    }
  }, [pedido]);

  if (!pedido) return null;

  const calcularPrecoTotal = (): number => {
    return pedido.pedido.produtos.reduce((total, produto) => {
      const quantidade = produto.quantidade ?? 0;
      return total + produto.preco * quantidade;
    }, 0);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (!token) throw new Error("Token não encontrado");
      if (!pedido?._id) throw new Error("ID do pedido não encontrado");

      const { url, options } = PEDIDO_PUT<IPedidoID>(token, pedido._id, {
        ...pedido,
        pedido: {
          ...pedido.pedido,
          status: {
            ...pedido.pedido.status,
            processo: inputValue || "processando",
          },
        },
      });

      const response = await fetch(url, options);

      if (!response.ok) throw new Error("Erro ao atualizar pedido");
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.cartTable}>
        <caption>TODOS OS PRODUTOS</caption>
        <thead>
          <tr>
            <th>PRODUTO</th>
            <th>PREÇO</th>
            <th>QUANTIDADE</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          {pedido.pedido.produtos.map((prod) => (
            <tr key={prod.produtoId}>
              <td>
                <Link
                  className={styles.linkCol1}
                  to={`/produtos/produto/${prod.produtoId}`}
                >
                  <img className={styles.imgCol1} src={prod.img} alt="" />
                </Link>
              </td>
              <td className={styles.col2}>
                <p className={styles.pCol2}>R$ {prod.preco.toFixed(2)}</p>
              </td>
              <td className={styles.col3}>{prod.quantidade}</td>
              <td className={styles.col3}>
                R${" "}
                {prod.quantidade && (prod.preco * prod.quantidade).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className={styles.total}>
          <tr>
            <td colSpan={3}>TOTAL:</td>
            <td>R$ {calcularPrecoTotal().toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div className={styles.infosPedidos}>
        <p>
          ID DO PEDIDO: <span className={styles.subP}>{pedido._id}</span>
        </p>
        <p>
          ENTREGAR PARA:{" "}
          <span className={styles.subP}>{pedido.pedido.endereco.cliente}</span>
        </p>
        <p>
          RUA: <span className={styles.subP}>{pedido.pedido.endereco.rua}</span>
        </p>
        <p>
          BAIRRO:{" "}
          <span className={styles.subP}>{pedido.pedido.endereco.bairro}</span>
        </p>
        <p>
          NÚMERO:{" "}
          <span className={styles.subP}>{pedido.pedido.endereco.numero}</span>
        </p>
        <p>
          FORMA DE PAGAMENTO:{" "}
          <span className={styles.subP}>{pedido.pedido.status.pagamento}</span>
        </p>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.radio}>
          {(
            [
              "confirmar",
              "processando",
              "caminho",
              "entregue",
              "concluido",
            ] as ProcessoStatus[]
          ).map((status) => (
            <label key={status} htmlFor={status}>
              <input
                type="radio"
                id={status}
                name="status"
                value={status}
                onChange={(event) =>
                  setInputValue(event.currentTarget.value as ProcessoStatus)
                }
                checked={inputValue === status}
              />
              {status.toUpperCase()}
            </label>
          ))}
        </div>
        {error && <p>{error}</p>}
        <Button>ATUALIZAR</Button>
      </form>
    </div>
  );
};

export default DashboardPedido;
