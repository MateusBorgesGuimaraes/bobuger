import React from "react";
import styles from "./Footer.module.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer id="footerId" className={styles.footerBg}>
      <div className={`${styles.footer} container`}>
        <img className={styles.logo} src={assets.logoLaranja} alt="" />
        <div className={styles.contentFooter}>
          <div className={styles.endereco}>
            <h4 className="orange">endereço</h4>
            <p>Rio de Janeiro - RJ</p>
            <p>Bairro Ipanema</p>
            <p>Rua Aruaci</p>
            <p>Numero 232</p>
          </div>
          <div className={styles.faleConosco}>
            <h4 className="orange">fale conosco</h4>
            <p>(34) 99999-9999</p>
            <p>boburgers@gmail.com</p>
            <p>@boburgertt</p>
          </div>
          <div className={styles.redesSociais}>
            <h4 className="orange">redes sociais</h4>
            <div>
              <img src={assets.instagram} alt="" />
              <img src={assets.whatsapp} alt="" />
              <img src={assets.facebook} alt="" />
            </div>
          </div>
        </div>
        <p className={styles.copy}>boburgers@todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
