import { useNavigate } from "react-router-dom";
import { BsFillPatchCheckFill } from "react-icons/bs";

const DeleteComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="delete-complete">
      <div className="top">
        <BsFillPatchCheckFill />
        <div className="text-wrap">
          <p>회원 탈퇴가 정상적으로 처리되었습니다.</p>
        </div>

      </div>

      <button onClick={() => navigate("/")}>
        홈으로 이동
      </button>
    </div>
  );
};

export default DeleteComplete;
