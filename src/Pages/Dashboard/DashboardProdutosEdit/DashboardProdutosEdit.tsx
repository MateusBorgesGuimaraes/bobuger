import React, { useContext, useRef } from "react";
import styles from "../DashboardProdutosAdd/DashboardProdutosAdd.module.css";
import Input from "../../../Componets/Form/Input/Input";
import UserContext from "../../../Context/UserContext";
import {
  IMainCategories,
  IProduoID,
  IProduto,
} from "../DashboardProdutos/DashboardProdutos";
import useFetch from "../../../Hooks/useFetch";
import useForm from "../../../Hooks/useForm";
import Button from "../../../Componets/Form/Button/Button";
import Error from "../../../Componets/Helper/Error";
import { useParams } from "react-router-dom";
import { GET_PROD, PROD_PUT } from "../../../Api";

const DashboardProdutosEdit = () => {
  const [inputValue, setInputValue] = React.useState<IMainCategories | null>(
    null
  );
  const [data, setData] = React.useState<IProduoID | null>(null);
  const { id } = useParams();
  const { admin } = useContext(UserContext);
  const { request, error, loading } = useFetch();
  const nome = useForm("");
  const nomeResumido = useForm("");
  const descricao = useForm("");
  const preco = useForm("");
  const img = useForm("");
  const subCategorias = useForm("");

  const setInputValueRef = useRef(setInputValue);
  const nomeRef = useRef(nome);
  const nomeResumidoRef = useRef(nomeResumido);
  const descricaoRef = useRef(descricao);
  const precoRef = useRef(preco);
  const imgRef = useRef(img);
  const subCategoriasRef = useRef(subCategorias);

  function setInput(value: IMainCategories) {
    setInputValue(value);
  }

  React.useEffect(() => {
    async function getProd() {
      if (id) {
        const { url, options } = GET_PROD(id);
        const { response, json } = await request(url, options);
        if (response?.ok) {
          setData(json);
        } else {
          console.log("produto nao encontrado");
        }
      }
    }
    getProd();
  }, [id, request]);

  React.useEffect(() => {
    if (data) {
      setInputValue(data.categotiaPrincipal);
      nomeRef.current.setValue(data?.nome);
      nomeResumidoRef.current.setValue(data?.nomeResumido);
      descricaoRef.current.setValue(data?.descricao);
      precoRef.current.setValue(String(data?.preco));
      imgRef.current.setValue(data?.img);
      subCategoriasRef.current.setValue(data?.subCategorias.toString());
    }
  }, [data]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    if (token && admin && id && inputValue) {
      const { url, options } = PROD_PUT<IProduto>(token, id, {
        nome: nome.value,
        nomeResumido: nomeResumido.value,
        descricao: descricao.value,
        preco: +preco.value,
        img: img.value,
        subCategorias: subCategorias.value.split(","),
        categotiaPrincipal: inputValue,
      });

      const { response } = await request(url, options);

      if (response?.ok) {
        console.log("Produto atualizado");
      } else {
        console.log("Produto não atualizado");
      }
    } else {
      console.log("voce nao tem permissao para fazer isso");
    }
  }

  return (
    <div className={styles.prodAddGid}>
      <h1 className={styles.title}>EDIT PRODUTO</h1>
      <form onSubmit={handleSubmit} action="">
        {/* <form action=""> */}
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
            <label htmlFor="normal">
              <input
                type="radio"
                id="normal"
                name="categotiaPrincipal"
                value="normal"
                onChange={(event) =>
                  setInput(event.currentTarget.value as IMainCategories)
                }
                checked={inputValue === "normal"}
              />
              NORMAL
            </label>

            <label htmlFor="diet">
              <input
                type="radio"
                id="diet"
                name="categotiaPrincipal"
                value="diet"
                onChange={(event) =>
                  setInput(event.currentTarget.value as IMainCategories)
                }
                checked={inputValue === "diet"}
              />
              DIET
            </label>

            <label htmlFor="vegetariana">
              <input
                type="radio"
                id="vegetariana"
                name="categotiaPrincipal"
                value="vegetariana"
                onChange={(event) =>
                  setInput(event.currentTarget.value as IMainCategories)
                }
                checked={inputValue === "vegetariana"}
              />
              VEGETARIANA
            </label>

            <label htmlFor="organica">
              <input
                type="radio"
                id="organica"
                name="categotiaPrincipal"
                value="organica"
                onChange={(event) =>
                  setInput(event.currentTarget.value as IMainCategories)
                }
                checked={inputValue === "organica"}
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

export default DashboardProdutosEdit;
