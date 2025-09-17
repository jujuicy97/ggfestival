import FestivalList from "./components/FestivalList/FestivalList";
import Login from "./components/LoginPage/Login";
import "./App.scss";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/list" element={<FestivalList/>}/>
    </Routes>
    </BrowserRouter>

  );
};

export default App;
