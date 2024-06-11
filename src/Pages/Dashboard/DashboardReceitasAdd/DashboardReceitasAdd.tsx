import React, { useContext } from "react";
import styles from "../DashboardProdutosAdd/DashboardProdutosAdd.module.css";
import Input from "../../../Componets/Form/Input/Input";
import Button from "../../../Componets/Form/Button/Button";
import useForm from "../../../Hooks/useForm";
import { RECEITA_POST } from "../../../Api";
import useFetch from "../../../Hooks/useFetch";
import UserContext from "../../../Context/UserContext";

import Error from "../../../Componets/Helper/Error";
import { ICategorias, IReceita } from "../DashboardReceitas/DashboardReceitas";

const DashboardReceitasAdd = () => {
  const [inputValue, setInputValue] = React.useState<ICategorias>("molho");
  const { admin } = useContext(UserContext);
  const { request, error, loading } = useFetch();
  const titulo = useForm("");
  const ingredientes = useForm("");
  const receita = useForm("");
  const img = useForm("");
  // const categoria = useForm("");

  function setInput(value: ICategorias) {
    setInputValue(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (token && admin) {
      const { url, options } = RECEITA_POST<IReceita>(token, {
        titulo: titulo.value,
        ingredientes: ingredientes.value.split(","),
        receita: receita.value,
        img: img.value,
        categoria: inputValue,
      });

      const { response } = await request(url, options);
      // console.log("json: " + JSON.stringify(json));
      // console.log("response: " + JSON.stringify(response));
      if (response?.ok) {
        console.log("Receita adicionada");
      } else {
        console.log("Receita não adicionada");
      }
    } else {
      console.log("voce nao tem permissao para fazer isso");
    }
  }

  return (
    <div className={styles.prodAddGid}>
      <h1 className={styles.title}>ADD RECEITA</h1>
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
                onClick={(event) =>
                  setInput(event.currentTarget.value as ICategorias)
                }
              />
              MOLHO
            </label>

            <label htmlFor="salada">
              <input
                type="radio"
                id="salada"
                name="categoria"
                value="salada"
                onClick={(event) =>
                  setInput(event.currentTarget.value as ICategorias)
                }
              />
              SALADA
            </label>

            <label htmlFor="acompanhamento">
              <input
                type="radio"
                id="acompanhamento"
                name="categotia"
                value="acompanhamento"
                onClick={(event) =>
                  setInput(event.currentTarget.value as ICategorias)
                }
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

export default DashboardReceitasAdd;
