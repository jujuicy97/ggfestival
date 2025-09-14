import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindPage from "./components/FindPage/FindPage";
import FestivalCalendar from "./components/CalendarPage/FestivalCalendar";
// import Login from "./components/SearchPage/FindInformation/Login";

const App = () => {
  return (
    <div>
      <FestivalCalendar />
      {/* <Login /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/find/*" element={<FindPage />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );  
};

export default App;
