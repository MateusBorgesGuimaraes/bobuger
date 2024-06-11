import React, { useContext, useRef } from "react";
import styles from "../DashboardProdutosAdd/DashboardProdutosAdd.module.css";
import Input from "../../../Componets/Form/Input/Input";
import UserContext from "../../../Context/UserContext";
import useFetch from "../../../Hooks/useFetch";
import useForm from "../../../Hooks/useForm";
import Button from "../../../Componets/Form/Button/Button";
import Error from "../../../Componets/Helper/Error";
import { useParams } from "react-router-dom";
import { GET_RECEITA, RECEITA_PUT } from "../../../Api";
import {
  ICategorias,
  IReceita,
  IReceitaID,
} from "../DashboardReceitas/DashboardReceitas";

const DashboardReceitasEdit = () => {
  const [inputValue, setInputValue] = React.useState<ICategorias | null>(null);
  const [data, setData] = React.useState<IReceitaID | null>(null);
  const { id } = useParams();
  const { admin } = useContext(UserContext);
  const { request, error, loading } = useFetch();
  const titulo = useForm("");
  const ingredientes = useForm("");
  const receita = useForm("");
  const img = useForm("");

  const tituloRef = useRef(titulo);
  const ingredientesRef = useRef(ingredientes);
  const receitaRef = useRef(receita);
  const imgRef = useRef(img);

  function setInput(value: ICategorias) {
    setInputValue(value);
  }

  React.useEffect(() => {
    async function getProd() {
      if (id) {
        const { url, options } = GET_RECEITA(id);
        const { response, json } = await request(url, options);
        if (response?.ok) {
          setData(json);
        } else {
          console.log("receita nao encontrada");
        }
      }
    }
    getProd();
  }, [id, request]);

  React.useEffect(() => {
    if (data) {
      setInputValue(data.categoria);
      tituloRef.current.setValue(data?.titulo);
      receitaRef.current.setValue(data?.receita);
      imgRef.current.setValue(data?.img);
      ingredientesRef.current.setValue(data?.ingredientes.toString());
    }
  }, [data]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (token && admin && id && inputValue) {
      const { url, options } = RECEITA_PUT<IReceita>(token, id, {
        titulo: titulo.value,
        receita: receita.value,
        img: img.value,
        ingredientes: ingredientes.value.split(","),
        categoria: inputValue,
      });

      const { response } = await request(url, options);

      if (response?.ok) {
        console.log("Receita atualizada");
      } else {
        console.log("Receita não atualizada");
      }
    } else {
      console.log("voce nao tem permissao para fazer isso");
    }
  }

  return (
    <div className={styles.prodAddGid}>
      <h1 className={styles.title}>EDIT RECEITA</h1>
      <form onSubmit={handleSubmit} action="">
        <Input label="TITULO" type="text" name="titulo" hookProps={titulo} />
        <Input label="RECEITA" type="text" name="receita" hookProps={receita} />

        <Input
          label="LINK DA IMAGEM DO PRODUTO"
          type="text"
          name="img"
          hookProps={img}
        />
        <Input
          label="INGREDIENTES (SEPARADOS POR , )"
          type="text"
          name="ingredientes"
          hookProps={ingredientes}
        />
        <div>
          <p className={styles.categoriaP}>CATEGORIA</p>
          <div className={styles.radio}>
            <label htmlFor="molho">
              <input
                type="radio"
                id="molho"
                name="categoria"
                value="molho"
                onChange={(event) =>
                  setInput(event.currentTarget.value as ICategorias)
                }
                checked={inputValue === "molho"}
              />
              MOLHO
            </label>

            <label htmlFor="SALADA">
              <input
                type="radio"
                id="salada"
                name="categoria"
                value="salada"
                onChange={(event) =>
                  setInput(event.currentTarget.value as ICategorias)
                }
                checked={inputValue === "salada"}
              />
              SALADA
            </label>

            <label htmlFor="acompanhamento">
              <input
                type="radio"
                id="acompanhamento"
                name="categoria"
                value="acompanhamento"
                onChange={(event) =>
                  setInput(event.currentTarget.value as ICategorias)
                }
                checked={inputValue === "acompanhamento"}
              />
              ACOMPANHAMENTO
            </label>
          </div>
        </div>

        {error && <Error error={error} />}
        {loading ? <Button>SALVANDO...</Button> : <Button>SALVAR</Button>}
      </form>
    </div>
  );
};

export default DashboardReceitasEdit;
