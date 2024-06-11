import React from "react";
import styles from "./Receita.module.css";
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import { IReceitaID } from "../Dashboard/DashboardReceitas/DashboardReceitas";
import useFetch from "../../Hooks/useFetch";
import { GET_RECEITA } from "../../Api";

export type IReceitaData = IReceitaID & {
  createdAt: Date;
};

export function formatarData(data: Date): string {
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const dataObj = new Date(data);
  const dia = dataObj.getDate();
  const mes = meses[dataObj.getMonth()];
  const ano = dataObj.getFullYear();
  return `${dia} ${mes}, ${ano}`;
}

const Receita = () => {
  const urlSite = useParams();
  const [data, setData] = React.useState<IReceitaData | null>(null);
  const { request } = useFetch();
  React.useEffect(() => {
    async function getProd() {
      if (urlSite.id) {
        const { url, options } = GET_RECEITA(urlSite.id);
        const { response, json } = await request(url, options);
        if (response?.ok) {
          setData(json);
        } else {
          console.log("receita nao encontrada");
        }
      }
    }
    getProd();
  }, [urlSite, request]);

  return (
    <main className={`${styles.receitaBg}`}>
      <section className="container">
        <div className={styles.receitaGrid}>
          <div className={styles.receitaCol1}>
            <div className={styles.receitaIngredientes}>
              <h2>INGREDIENTES</h2>
              <ul className={styles.receitaLista}>
                {data?.ingredientes.map((ingrediente, i) => (
                  <li>
                    <p key={i}>{ingrediente}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.receitaImagem}>
              <img src={data?.img} alt="" />
            </div>
          </div>

          <div className={styles.receitaCol2}>
            <h1 className={styles.receitaTitle}>{data?.titulo}</h1>
            <div className={styles.receitaSubFooter}>
              <div>
                <img src={assets.ingredientes} alt="" />
                <p>{data?.ingredientes.length} INGREDIENTES</p>
              </div>
              <p className={styles.categoria}>{data?.categoria}</p>
              <div>
                <img src={assets.calendarioWhite} alt="" />
                <p>{data && formatarData(data?.createdAt)}</p>
              </div>
            </div>

            <div className={styles.receitaContent}>
              <h3 className="orange">PASSO A PASSO</h3>
              <p>{data?.receita}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Receita;
