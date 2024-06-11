import React, { useContext } from "react";
import styles from "./DashboardProdutosAdd.module.css";
import Input from "../../../Componets/Form/Input/Input";
import Button from "../../../Componets/Form/Button/Button";
import useForm from "../../../Hooks/useForm";
import { PROD_POST } from "../../../Api";
import {
  IMainCategories,
  IProduto,
} from "../DashboardProdutos/DashboardProdutos";
import useFetch from "../../../Hooks/useFetch";
import UserContext from "../../../Context/UserContext";
import { Await } from "react-router-dom";
import Error from "../../../Componets/Helper/Error";

const DashboardProdutosAdd = () => {
  const [inputValue, setInputValue] = React.useState<IMainCategories>("normal");
  const { admin } = useContext(UserContext);
  const { request, error, loading } = useFetch();
  const nome = useForm("");
  const nomeResumido = useForm("");
  const descricao = useForm("");
  const preco = useForm("");
  const img = useForm("");
  const subCategorias = useForm("");

  function setInput(value: IMainCategories) {
    setInputValue(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (token && admin) {
      const { url, options } = PROD_POST<IProduto>(token, {
        nome: nome.value,
        nomeResumido: nomeResumido.value,
        descricao: descricao.value,
        preco: +preco.value,
        img: img.value,
        subCategorias: subCategorias.value.split(","),
        categotiaPrincipal: inputValue,
      });

      const { response } = await request(url, options);
      // console.log("json: " + JSON.stringify(json));
      // console.log("response: " + JSON.stringify(response));
      if (response?.ok) {
        console.log("Produto adicionado");
      } else {
        console.log("Produto não adicionado");
      }
    } else {
      console.log("voce nao tem permissao para fazer isso");
    }
  }

  return (
    <div className={styles.prodAddGid}>
      <h1 className={styles.title}>ADD PRODUTO</h1>
      <form onSubmit={handleSubmit} action="">
        <Input label="NOME" type="text" name="nome" hookProps={nome} />
        <Input
          label="NOME RESUMIDO"
          type="text"
          name="nomeResumido"
          hookProps={nomeResumido}
        />
        <Input
          label="DESCRIÇÃO"
          type="text"
          name="descricao"
          hookProps={descricao}
        />
        <Input label="PREÇO" type="number" name="preco" hookProps={preco} />
        <Input
          label="LINK DA IMAGEM DO PRODUTO"
          type="text"
          name="img"
          hookProps={img}
        />
        <Input
          label="SUBCATEGORIAS (SEPARADAS POR , )"
          type="text"
          name="subCategorias"
          hookProps={subCategorias}
        />
        <div>
          <p className={styles.categoriaP}>CATEGORIA PRINCIPAL</p>
          <div className={styles.radio}>
            <label htmlFor="html">
              <input
                type="radio"
                id="normal"
                name="categotiaPrincipal"
                value="normal"
                onClick={(event) =>
                  setInput(event.currentTarget.value as IMainCategories)
                }
              />
              NORMAL
            </label>

            <label htmlFor="diet">
              <input
                type="radio"
                id="diet"
                name="categotiaPrincipal"
                value="diet"
                onClick={(event) =>
                  setInput(event.currentTarget.value as IMainCategories)
                }
              />
              DIET
            </label>

            <label htmlFor="vegetariana">
              <input
                type="radio"
                id="vegetariana"
                name="categotiaPrincipal"
                value="vegetariana"
                onClick={(event) =>
                  setInput(event.currentTarget.value as IMainCategories)
                }
              />
              VEGETARIANA
            </label>

            <label htmlFor="organica">
              <input
                type="radio"
                id="organica"
                name="categotiaPrincipal"
                value="organica"
                onClick={(event) =>
                  setInput(event.currentTarget.value as IMainCategories)
                }
              />
              ORGÂNICA
            </label>
          </div>
        </div>
        {error && <Error error={error} />}
        {loading ? <Button>SALVANDO...</Button> : <Button>SALVAR</Button>}
      </form>
    </div>
  );
};

export default DashboardProdutosAdd;
