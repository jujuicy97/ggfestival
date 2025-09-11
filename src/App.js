import "./App.scss";
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import MainMap from './components/FestivalMap/MainMap'
import MainPageTest from './components/MainPageTest';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageTest/>}/>
        <Route path="/mainMap" element={<MainMap />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
