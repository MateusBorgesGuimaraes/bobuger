import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import {
  IProduoID,
  IProduto,
} from "../../Pages/Dashboard/DashboardProdutos/DashboardProdutos";
import CartContext from "../../Context/CartContext";

type CardProps = {
  card: IProduoID;
  className?: string;
};

const Card = ({ card, className }: CardProps) => {
  const { addItem } = React.useContext(CartContext);

  function handleClick(id: string) {
    addItem(id);
  }

  return (
    <div className={className}>
      <div className={styles.cardContainer}>
        <Link
          className={styles.imgContainer}
          to={`/produtos/produto/${card._id}`}
        >
          <img src={card.img} alt="" />
        </Link>
        <div className={styles.contentContainer}>
          <ul className={styles.listContainer}>
            {card.subCategorias.map((subCat, i) => (
              <li key={i}>{subCat}</li>
            ))}
          </ul>
          <p className={styles.descContent}>{card.descricao}</p>
          <div className={styles.parteBaixoContainer}>
            <span className={styles.preco}>R$ {card.preco}</span>
            <button
              onClick={() => handleClick(card._id)}
              className={styles.btnAdd}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
