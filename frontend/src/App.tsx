import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';
import Home from "./routes/Home";
import Map from "./routes/Map";
import Risk from "./routes/Risk";
import Test from "./routes/Test";
import RestArea from "./routes/RestArea";
import StartTripModal from "./routes/StartTripModal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/map" element={<Map/>} />
        <Route path="/risk" element={<Risk/>} />
        <Route path="/start-trip" element={<StartTripModal/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/rest-area" element={<RestArea/>} />
        <Route path="*" element={<div>페이지를 찾을 수 없습니다</div>} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
