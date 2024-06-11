import { BrowserRouter, Route, Routes } from "react-router-dom";
import { assets } from "./assets/assets";
import Header from "./Componets/Header/Header";
import Home from "./Pages/Home/Home";
import Footer from "./Componets/Footer/Footer";
import Login from "./Pages/Login/Login";
import "./App.css";
import Receitas from "./Pages/Receitas/Receitas";
import { UserStorage } from "./Context/UserContext";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Receita from "./Pages/Receita/Receita";
import Produto from "./Pages/Produto/Produto";
import Pedidos from "./Pages/Pedidos/Pedidos";
import ProtectedRouterGeral from "./Componets/Helper/ProtectedRouterGeral";
import Cart from "./Pages/Cart/Cart";
import ScrollToTop from "./Componets/ScrollToTop/ScrollToTop";
import { CartStorage } from "./Context/CartContext";
import EnviarPedido from "./Pages/EnviarPedido/EnviarPedido";
import Pedido from "./Pages/Pedido/Pedido";
import Produtos from "./Pages/Produtos/Produtos";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <UserStorage>
          <CartStorage>
            <Header />
            <main className="AppBody">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login/*" element={<Login />} />
                <Route path="receitas/*" element={<Receitas />} />
                <Route path="/receitas/receita/:id" element={<Receita />} />
                <Route path="produtos/*" element={<Produtos />} />
                <Route path="/produtos/produto/:id" element={<Produto />} />
                <Route
                  path="pedidos/*"
                  element={
                    <ProtectedRouterGeral>
                      <Pedidos />
                    </ProtectedRouterGeral>
                  }
                />
                <Route path="pedidos/enviar" element={<EnviarPedido />} />
                <Route path="pedidos/pedido/:id" element={<Pedido />} />
                <Route path="dashboard/*" element={<Dashboard />} />

                <Route
                  path="cart/*"
                  element={
                    <ProtectedRouterGeral>
                      <Cart />
                    </ProtectedRouterGeral>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </CartStorage>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
