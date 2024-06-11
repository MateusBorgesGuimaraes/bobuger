import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import styles from "./ReceitaCard.module.css";
import { IReceitaID } from "../../Pages/Dashboard/DashboardReceitas/DashboardReceitas";
import { IReceitaData, formatarData } from "../../Pages/Receita/Receita";

const ReceitaCard = ({ receita }: { receita: IReceitaData }) => {
  // function formatarData(data: Date): string {
  //   const meses = [
  //     "janeiro",
  //     "fevereiro",
  //     "março",
  //     "abril",
  //     "maio",
  //     "junho",
  //     "julho",
  //     "agosto",
  //     "setembro",
  //     "outubro",
  //     "novembro",
  //     "dezembro",
  //   ];
  //   const dataObj = new Date(data);
  //   const dia = dataObj.getDate();
  //   const mes = meses[dataObj.getMonth()];
  //   const ano = dataObj.getFullYear();
  //   return `${dia} ${mes}, ${ano}`;
  // }
  return (
    <div className={styles.card}>
      <Link
        className={styles.imgCardContainer}
        to={`/receitas/receita/${receita._id}`}
      >
        <span className={styles.categoria}>{receita.categoria}</span>
        <img src={receita.img} alt="" />
      </Link>
      <div className={styles.cardContainer}>
        <div className={styles.data}>
          <img src={assets.calendario} alt="" />
          <p>{formatarData(receita.createdAt)}</p>
        </div>
        <p className={styles.nomeReceita}>{receita.titulo}</p>
      </div>
    </div>
  );
};

export default ReceitaCard;
