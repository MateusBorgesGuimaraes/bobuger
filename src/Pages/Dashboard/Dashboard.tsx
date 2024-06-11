import React from "react";
import styles from "./Dashboard.module.css";
import Sidenav from "../../Componets/Sidenav/Sidenav";
import { Route, Routes } from "react-router-dom";
import DashboardInicio from "./DashboardInicio/DashboardInicio";
import DashboardProdutos from "./DashboardProdutos/DashboardProdutos";
import DashboardProdutosAdd from "./DashboardProdutosAdd/DashboardProdutosAdd";
import DashboardProdutosEdit from "./DashboardProdutosEdit/DashboardProdutosEdit";
import DashboardReceitas from "./DashboardReceitas/DashboardReceitas";
import DashboardReceitasAdd from "./DashboardReceitasAdd/DashboardReceitasAdd";
import DashboardReceitasEdit from "./DashboardReceitasEdit/DashboardReceitasEdit";
import DashboardUsuarios from "./DashboardUsuarios/DashboardUsuarios";
import DashboardPedidos from "./DashboardPedidos/DashboardPedidos";
import DashboardPedido from "./DashboardPedido/DashboardPedido";
import DashboardUsuariosInfo from "./DashboardUsuariosInfo/DashboardUsuariosInfo";

const Dashboard = () => {
  return (
    <section className={styles.dashboardBg}>
      <div className="container">
        <div className={styles.dashboardGrid}>
          <div className={styles.col1}>
            <Sidenav />
          </div>
          <div className={styles.col2}>
            <Routes>
              <Route path="/" element={<DashboardInicio />} />
              <Route path="/produtos/*" element={<DashboardProdutos />} />
              <Route path="/produtos/add" element={<DashboardProdutosAdd />} />
              <Route
                path="/produtos/edit/:id"
                element={<DashboardProdutosEdit />}
              />
              <Route path="/receitas/*" element={<DashboardReceitas />} />
              <Route path="/receitas/add" element={<DashboardReceitasAdd />} />
              <Route
                path="/receitas/edit/:id"
                element={<DashboardReceitasEdit />}
              />
              <Route path="/usuarios/*" element={<DashboardUsuarios />} />
              <Route
                path="/usuarios/usuario/:id"
                element={<DashboardUsuariosInfo />}
              />
              <Route path="/pedidos/*" element={<DashboardPedidos />} />
              <Route path="/pedidos/pedido/:id" element={<DashboardPedido />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
