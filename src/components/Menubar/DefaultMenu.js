import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from "react-icons/io";

const DefaultMenu = ({ pagename }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className='default-menu'>
      <IoIosArrowBack onClick={handleGoBack}/>
      <p>
        {pagename ? pagename : "페이지 이름"}
      </p>
    </div>
  );
};

export default DefaultMenu;