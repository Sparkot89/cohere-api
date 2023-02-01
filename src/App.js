import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from './pages/Inicio'
import Examen from "./pages/Examen";
function App() {
  return (
    <div className="contenedor">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio></Inicio>}> </Route>
          <Route path="/exam" element={<Examen></Examen>}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
