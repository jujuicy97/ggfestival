import { HiMiniCheckBadge } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";

const FindComplete = ( {message} ) => {
  const location = useLocation();
  const resultId = location.state?.resultId;
  const navigate = useNavigate();

  return (
    <div className="find-complete">
      <div className="complete-content">
        <HiMiniCheckBadge />
        <p>{message}</p>
        <h3>{resultId}</h3>
      </div>
      <div className="btn-wrap">
        <p>지금 로그인하고 경기도의 축제를 즐겨보세요!</p>
        <button onClick={()=>{navigate("/login")}}>로그인하러 가기</button>
      </div>
    </div>
  );
};

export default FindComplete;
