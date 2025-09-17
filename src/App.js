import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FestivalCalendar from "./components/CalendarPage/FestivalCalendar";
import FindPage from "./components/FindPage/FindPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/festivalCalendar" element={<FestivalCalendar /> } />
          <Route path="/find/*" element={<FindPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );  
};

export default App;
