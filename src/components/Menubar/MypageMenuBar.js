import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from "react-icons/io";


const MypageMenuBar = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/mypage"); // 마이페이지로 가기
  };

  return (
    <div className='default-menu'>
      <IoIosArrowBack onClick={handleGoBack} />
      <p>
        회원 정보
      </p>
    </div>
  );
};


export default MypageMenuBar;