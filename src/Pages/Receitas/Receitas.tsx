import React from "react";
import styles from "./Receitas.module.css";
import { assets } from "../../assets/assets";
import ReceitaCard from "../../Componets/ReceitaCard/ReceitaCard";
import { IReceitaID } from "../Dashboard/DashboardReceitas/DashboardReceitas";
import useFetch from "../../Hooks/useFetch";
import { GET_ALL_RECEITAS } from "../../Api";
import { IReceitaData } from "../Receita/Receita";

const Receitas = () => {
  const [receitas, setReceitas] = React.useState<IReceitaData[] | null>(null);

  const { request } = useFetch();

  React.useEffect(() => {
    async function getAllReceitas() {
      const { url, options } = GET_ALL_RECEITAS();
      const { response, json } = await request(url, options);
      if (response?.ok) {
        setReceitas(json);
      } else {
        console.log("receitas não encontrados");
      }
    }
    getAllReceitas();
  }, [request]);

  return (
    <section>
      <div className={styles.receitasBg}>
        <div className={`${styles.heroReceita} container`}>
          <h1>
            RECEITAS DO <span className="orange">CHEF</span>{" "}
          </h1>
          <div className={styles.contentReceita}>
            <p>
              Segundo o chef, os acompanhamentos são a estrela que podem
              complementa o produto principal: hambúrgueres suculentos e
              irresistíveis. Cada receita é cuidadosamente elaborada para
              realçar os sabores dos hambúrgueres, criando uma experiência
              gastronômica completa. Dos clássicos como batatas fritas crocantes
              e saladas frescas a opções mais criativas como molhos gourmet e
              acompanhamentos exóticos, há uma variedade de escolhas para todos
              os gostos e ocasiões. Os ingredientes são selecionados com rigor,
              garantindo qualidade e sabor em cada prato. Os visitantes do site
              encontram não apenas instruções detalhadas, mas também inspiração
              para elevar seus hambúrgueres caseiros a um nível profissional.
            </p>
            <img src={assets.talheres} alt="" />
          </div>
          <div className={styles.social}>
            <img src={assets.instagram} alt="" />
            <img src={assets.facebook} alt="" />
            <img src={assets.whatsapp} alt="" />
          </div>
        </div>
      </div>

      <div className={`${styles.receitasContainer} container`}>
        <div className={styles.cardsReceitas}>
          {receitas?.map((receita) => (
            <ReceitaCard key={receita._id} receita={receita} />
          ))}
          {/* <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard />
          <ReceitaCard /> */}
        </div>
      </div>
    </section>
  );
};

export default Receitas;
