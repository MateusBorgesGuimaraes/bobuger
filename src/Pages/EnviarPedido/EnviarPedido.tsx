import React, { useRef } from "react";
import styles from "./EnviarPedido.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Componets/Form/Button/Button";
import Input from "../../Componets/Form/Input/Input";
import { ICart, ICartInfo } from "../Cart/Cart";
import CartContext from "../../Context/CartContext";
import { GET_PROD, PEDIDO_POST } from "../../Api";
import UserContext from "../../Context/UserContext";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
// import Error from "../../Componets/Helper/Error";

type Endereco = {
  cliente: string;
  rua: string;
  numero: string;
  bairro: string;
};

export type PagamentoStatus = "pix" | "dinheiro" | "cartao";
export type ProcessoStatus =
  | "confirmar"
  | "processando"
  | "caminho"
  | "entregue"
  | "concluido";

export type Status = {
  pagamento: PagamentoStatus;
  processo?: ProcessoStatus;
};

type Produto = {
  produtoId: string;
  img: string;
  preco: number;
  quantidade?: number;
};

export type IPedido = {
  userId: string;
  pedido: {
    endereco: Endereco;
    status: Status;
    produtos: Produto[];
  };
};

const EnviarPedido = () => {
  const { request, error, loading } = useFetch();
  const [quantities, setQuantities] = React.useState<Record<string, number>>(
    {}
  );
  const [cartsInfo, setCartsInfo] = React.useState<ICartInfo[]>([]);
  const { dataCart, clearCard } = React.useContext(CartContext);
  const { data } = React.useContext(UserContext);

  const [inputValue, setInputValue] = React.useState<PagamentoStatus | null>(
    null
  );

  const navigate = useNavigate();
  const nome = useForm("");
  const rua = useForm("");
  const bairro = useForm("");
  const numero = useForm("");
  const nomeRef = useRef(nome);
  const ruaRef = useRef(rua);
  const bairroRef = useRef(bairro);
  const numeroRef = useRef(numero);

  function setInput(value: PagamentoStatus) {
    setInputValue(value);
  }

  React.useEffect(() => {
    if (data) {
      nomeRef.current.setValue(data.usuario);
      ruaRef.current.setValue(data.rua);
      bairroRef.current.setValue(data.bairro);
      numeroRef.current.setValue(String(data.numero));
    }
  }, [data]);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const token = window.localStorage.getItem("token");
      if (!token) throw new Error("Não existe token");
      if (!data?._id) throw new Error("Não existe usuario");
      if (!inputValue) throw new Error("Escolha uma forma de pagamento");
      const { url, options } = PEDIDO_POST<IPedido>(token, {
        userId: data._id,
        pedido: {
          endereco: {
            cliente: nome.value,
            rua: rua.value,
            bairro: bairro.value,
            numero: numero.value,
          },
          status: {
            pagamento: inputValue,
          },
          produtos: cartsInfo,
        },
      });
      console.log("options: " + JSON.stringify(options));

      const { response } = await request(url, options);
      if (!response) throw new Error("Erro ao enviar dados");

      if (dataCart) clearCard(dataCart?._id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={styles.bgSend}>
      <div className="container">
        <div className={styles.containerSend}>
          <h1 className={styles.tituloSend}>ENVIAR PEDIDO</h1>
          <table className={styles.cartTable}>
            <caption>TODOS OS PRODUTOS</caption>

            <tr>
              <th>PRODUTO</th>
              <th>PRECO</th>
              <th>QUANTIDADE</th>
            </tr>

            {cartsInfo.map((cart) => (
              <tr key={cart.produtoId}>
                <td>
                  <Link
                    className={styles.linkCol1}
                    to={`/produtos/produto/${cart.produtoId}`}
                  >
                    <img className={styles.imgCol1} src={cart.img} alt="" />
                    <p className={styles.pCol1}>{cart.nome}</p>
                  </Link>
                </td>

                <td className={styles.col2}>
                  <p className={styles.pCol2}>R$ {cart.preco}</p>
                </td>

                <td className={styles.col3}>{cart.quantidade}</td>
              </tr>
            ))}

            <tfoot className={styles.total}>
              <tr>
                TOTAL: R${" "}
                {cartsInfo
                  .reduce(
                    (acc, prod) =>
                      acc + prod.preco * quantities[prod.produtoId],
                    0
                  )
                  .toFixed(2)}
              </tr>
            </tfoot>
          </table>
          <form
            onSubmit={handleSubmit}
            className={styles.formContainer}
            action=""
          >
            <Input label="NOME" type="text" name="nome" hookProps={nome} />
            <Input label="RUA" type="text" name="rua" hookProps={rua} />
            <Input
              label="BAIRRO"
              type="text"
              name="bairro"
              hookProps={bairro}
            />

            <Input
              label="NUMERO"
              type="text"
              name="numero"
              hookProps={numero}
            />
            <div>
              <p className={styles.categoriaP}>FORMA DE PAGAMENTO</p>
              <div className={styles.radio}>
                <label htmlFor="pix">
                  <input
                    type="radio"
                    id="pix"
                    name="categotiaPrincipal"
                    value="pix"
                    onChange={(event) =>
                      setInput(event.currentTarget.value as PagamentoStatus)
                    }
                    checked={inputValue === "pix"}
                  />
                  PIX
                </label>

                <label htmlFor="cartao">
                  <input
                    type="radio"
                    id="cartao"
                    name="categotiaPrincipal"
                    value="cartao"
                    onChange={(event) =>
                      setInput(event.currentTarget.value as PagamentoStatus)
                    }
                    checked={inputValue === "cartao"}
                  />
                  CARTÃO
                </label>

                <label htmlFor="dinheiro">
                  <input
                    type="radio"
                    id="dinheiro"
                    name="categotiaPrincipal"
                    value="dinheiro"
                    onChange={(event) =>
                      setInput(event.currentTarget.value as PagamentoStatus)
                    }
                    checked={inputValue === "dinheiro"}
                  />
                  DINHEIRO
                </label>
              </div>
            </div>

            {/* {error && <Error error={error} />} */}
            {loading ? (
              <Button>ENVIANDO...</Button>
            ) : (
              <Button>CONFIRMAR</Button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnviarPedido;
