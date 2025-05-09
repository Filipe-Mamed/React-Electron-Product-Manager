import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip"; // Importa Tooltip para dicas
import Produtos from "./pages/Produtos";
import Home from "./pages/Home";
import Footer from "./layouts/Footer";
import ContainerToastify from "./layouts/ContainerToastify";
import ContainerTooltip from "./layouts/ContainerTooltip";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
        <Footer />
      </Router>
      <ContainerToastify />
      <ContainerTooltip />
    </>
  );
}

export default App;
