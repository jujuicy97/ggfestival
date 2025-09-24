import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const SearchMenuBar = ({ pagename }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className='search-menu'>
      <IoIosArrowBack className="back-icon" onClick={handleGoBack}/>
      <p>
        {pagename ? pagename : "페이지 이름"}
      </p>
      <IoSearch className="search-icon" onClick={()=>{navigate('/search')}}/>
    </div>
  );
};

export default SearchMenuBar;