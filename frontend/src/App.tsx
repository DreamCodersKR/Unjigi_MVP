import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Map from "./routes/Map";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/map" element={<Map/>} />
        <Route path="*" element={<div>페이지를 찾을 수 없습니다</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;