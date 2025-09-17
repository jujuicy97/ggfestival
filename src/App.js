import { useState } from "react";
import Search from "./components/SearchPage/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [ searchWord, setSearchWord ] = useState('');
  const [ contentID, setContentID ] = useState('')
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Search setSearchWord={setSearchWord} setContentID={setContentID}/>}/>
      </Routes>
    </BrowserRouter>
  ); 
};

export default App;
