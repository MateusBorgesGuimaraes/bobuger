import React from "react";
import styles from "./Home.module.css";
import LinkButton from "../../Componets/LinkButton/LinkButton";
import { assets } from "../../assets/assets";
import Card from "../../Componets/Card/Card";
import { Link } from "react-router-dom";
import { GET_PROD_BY_QUERY_SUBCATEGORY } from "../../Api";
import {
  IProduoID,
  IProduto,
} from "../Dashboard/DashboardProdutos/DashboardProdutos";
import useFetch from "../../Hooks/useFetch";
import CartContext from "../../Context/CartContext";
import UserContext from "../../Context/UserContext";

const Home = () => {
  const [maisVendidos, setmaisVendidos] = React.useState<IProduoID[] | null>(
    null
  );
  const [recomendacoes, setRecomendacoes] = React.useState<IProduoID[] | null>(
    null
  );
  const { request } = useFetch();

  const scrollSuave = (id: string) => {
    const sectionChoice = document.getElementById(id);
    if (sectionChoice) {
      sectionChoice.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    async function getProdMoreSolds() {
      const { url, options } = GET_PROD_BY_QUERY_SUBCATEGORY("moreSold");
      const { response, json } = await request(url, options);
      if (response?.ok) {
        setmaisVendidos(json);
      } else {
        console.log("moreSold não encontrados");
      }
    }
    async function getRecomendacoes() {
      const { url, options } = GET_PROD_BY_QUERY_SUBCATEGORY("recomendacao");
      const { response, json } = await request(url, options);
      if (response?.ok) {
        setRecomendacoes(json);
      } else {
        console.log("moreSold não encontrados");
      }
    }
    getProdMoreSolds();
    getRecomendacoes();
  }, [request]);

  const { login } = React.useContext(UserContext);
  const { dataCart, createCart } = React.useContext(CartContext);

  // console.log(dataCart);

  return (
    <section className={styles.home}>
      <section className={styles.heroBg}>
        <div className={`container`}>
          <section className={styles.hero}>
            <p className={styles.paragrafoHero}>
              nunca foi tao fácil escolher onde comer, aproveite agora e compre
              da hamburgueria de <span className="orange">MAIOR</span> custo
              beneficio
            </p>
            <h1 className={styles.tituloHero}>
              Os <span className="orange">maiores</span>,{" "}
              <span className="orange">mais</span> saborosos e<br />{" "}
              <span className="orange">mais</span> gostosos
            </h1>
            <div className={`${styles.btnsContainer} ${styles.btnOrange}`}>
              <LinkButton
                className={styles.btn1}
                onClick={() => scrollSuave("maisVendidos")}
                color="#fff"
                backgroundColor="#ff7a00"
                fontSize="24px"
              >
                MAIS PEDIDOS
                <img src={assets.coracao} alt="" />
              </LinkButton>

              <LinkButton
                onClick={() => scrollSuave("footerId")}
                color="#000"
                backgroundColor="#FFF"
                fontSize="24px"
              >
                CONTATE-NOS
                <img src={assets.seta1} alt="" />
              </LinkButton>
            </div>
            <div className={styles.social}>
              <img src={assets.instagram} alt="" />
              <img src={assets.facebook} alt="" />
              <img src={assets.whatsapp} alt="" />
            </div>
          </section>
        </div>
      </section>
      <section id="maisVendidos" className={`${styles.maisVendidos} container`}>
        <h2>
          OS <span className="orange">MAIS</span> VENDIDOS DA SEMANA
        </h2>

        <div className={styles.cardContainer}>
          {maisVendidos?.map((prod) => (
            <Card key={prod._id} card={prod} />
          ))}
        </div>
      </section>

      <section className={`${styles.beneficiosBg}`}>
        <div className={`${styles.beneficios} container`}>
          <div className={styles.beneficio}>
            <div className={styles.beneficioCirculo}>
              <img src={assets.entrega} alt="" />
            </div>
            <p className={styles.beneficioTexto}>
              ENTREGA 24H , 6 DIAS POR SEMANA
            </p>
          </div>

          <div className={styles.beneficio}>
            <div className={styles.beneficioCirculo}>
              <img src={assets.hamburger} alt="" />
            </div>
            <p className={styles.beneficioTexto}>
              TODOS OS PRODUTOS SÃO FEITOS NO DIA
            </p>
          </div>

          <div className={styles.beneficio}>
            <div className={styles.beneficioCirculo}>
              <img src={assets.pagamento} alt="" />
            </div>
            <p className={styles.beneficioTexto}>
              CARTÃO, DINHEIRO OU PIX, VOCÊ ESCOLHE
            </p>
          </div>
        </div>
      </section>

      <section className={styles.recomendacoesBg}>
        <div className={`${styles.recomendacoes} container`}>
          <div className={styles.imgRecomendacoes}>
            <p>
              RECOMENDAÇÕES
              <br /> DO CHEF
            </p>
          </div>
          <div className={styles.cardRecomendacoes}>
            {recomendacoes?.map((recomendacao) => (
              <Card
                key={recomendacao._id}
                card={recomendacao}
                className={styles.cardNew}
              />
            ))}
            {/* <Card className={styles.cardNew} />
            <Card className={styles.cardNew} />
            <Card className={styles.cardNew} />
            <Card className={styles.cardNew} />
            <Card className={styles.cardNew} /> */}
          </div>
        </div>
      </section>

      <section className={styles.qualidadesBg}>
        <div className={`${styles.qualidades} container`}>
          <div>
            <div className={styles.item1}>
              <p>
                AS <span className="orange"> MELHORES </span> ERVAS
              </p>
            </div>
            <div className={styles.item2}>
              <p>orgânico</p>{" "}
            </div>
            <div className={styles.item3}>
              <p>COMBINAÇÕES ESPECIAIS</p>
            </div>
            <div className={styles.item4}>
              <p>
                As <span className="orange">mais</span> saborosas especiarias
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.receitasBg}>
        <section className={`${styles.receitas} container`}>
          <h2>
            <span className="orange">receitas</span> para acompanhar seu lanche
          </h2>
          <div className={styles.receitasContainer}>
            <div className={styles.receitaItem}>
              <h3 className={styles.nomeReceita}>MOLHO DE PICLES APIMENTADO</h3>
              <Link
                className={styles.btnRedondo}
                to="/receitas/receita/532658926"
              >
                <img src={assets.seta2} alt="" />
              </Link>
            </div>

            <div className={styles.receitaItem}>
              <h3 className={styles.nomeReceita}>BATATINHA FRITA CASEIRA</h3>
              <Link
                className={styles.btnRedondo}
                to="/receitas/receita/532658926"
              >
                <img src={assets.seta2} alt="" />
              </Link>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Home;
