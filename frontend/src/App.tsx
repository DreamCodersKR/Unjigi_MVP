import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Map from "./routes/Map";
import Risk from "./routes/Risk";
import Test from "./routes/Test";
import RestArea from "./routes/RestArea";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/map" element={<Map/>} />
        <Route path="/risk" element={<Risk/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/rest-area" element={<RestArea/>} />
        <Route path="*" element={<div>페이지를 찾을 수 없습니다</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;