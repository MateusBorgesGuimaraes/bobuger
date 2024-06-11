import { Link } from "react-router-dom";
import styles from "./Sidenav.module.css";

const Sidenav = () => {
  return (
    <aside className={styles.sidenav}>
      <ul>
        <li>
          <Link to={`/dashboard`}>Inicio</Link>
        </li>

        <li>
          <Link to={`/dashboard/produtos`}>Produtos</Link>
        </li>

        <li>
          <Link to={`/dashboard/receitas`}>Receitas</Link>
        </li>

        <li>
          <Link to={`/dashboard/pedidos`}>Pedidos</Link>
        </li>

        <li>
          <Link to={`/dashboard/usuarios`}>Usuarios</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidenav;
