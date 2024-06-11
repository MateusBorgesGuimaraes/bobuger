import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import UserContext from "../../Context/UserContext";
import CartContext from "../../Context/CartContext";

const Header = () => {
  const [ativo, setAtivo] = React.useState(false);
  const { data, userLogout, admin, login } = React.useContext(UserContext);

  const { dataCart } = React.useContext(CartContext);
  const [quantidadeTotal, setQuantidadeTotal] = React.useState<
    number | undefined
  >(0);

  React.useEffect(() => {
    function loadQuantityCart() {
      if (dataCart?.produtos) {
        const total = dataCart?.produtos.reduce(
          (acc, curr) => acc + curr.quantidade,
          0
        );
        setQuantidadeTotal(total);
        if (!login) {
          setQuantidadeTotal(0);
        }
      }
    }
    loadQuantityCart();
  }, [dataCart, login]);

  return (
    <header>
      <nav className={`${styles.header} container`}>
        <Link className={`${styles.logo} ${ativo ? styles.active : ""}`} to="/">
          <img src={assets.logoLaranja} alt="logo" />
        </Link>
        <ul className={styles.containerLinks}>
          <div
            className={`${styles.linksParte1} ${
              ativo ? styles.ativo : styles.naoAtivo
            }`}
          >
            {admin && (
              <li className={styles.dashboard}>
                <Link className={styles.links} to="/dashboard">
                  DASHBOARD
                </Link>
              </li>
            )}
            <li>
              <Link className={styles.links} to="/produtos">
                PRODUTOS
              </Link>
            </li>
            <li>
              <Link className={styles.links} to="/pedidos">
                PEDIDOS
              </Link>
            </li>
            <li>
              <Link className={styles.links} to="/receitas">
                RECEITAS
              </Link>
            </li>
          </div>
          <div className={styles.linksParte2}>
            <Link className={styles.userName} to="/login">
              {data ? (
                <div className={styles.userDiv}>
                  <p>{data.usuario}</p>
                  <button className={styles.btnSair} onClick={userLogout}>
                    sair
                  </button>
                </div>
              ) : (
                <img src={assets.conta} alt="logar conta icone" />
              )}
            </Link>

            <Link className={styles.numero} to="/cart">
              <img src={assets.cart} alt="cart icone" />
              <p>{quantidadeTotal}</p>
            </Link>
          </div>
          <button
            onClick={() => setAtivo(!ativo)}
            className={styles.toggleButton}
          >
            {ativo ? (
              <img src={assets.fechar} alt="" />
            ) : (
              <img src={assets.menu} alt="" />
            )}
          </button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
