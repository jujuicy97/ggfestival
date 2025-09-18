import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDeleteUser } from "../../utils/FestivalAPI";
import { getUserInfo, removeUserInfo } from "../../utils/LocalStorage";
import Popup from "../Popup";

const DeleteAccount = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const userInfo = getUserInfo();

  const handleDelete = async () => {
    if (!checked) return;
    setLoading(true);

    const { success, error } = await fetchDeleteUser(userInfo.id);

    if (success) {
      removeUserInfo();
      navigate("/delete-complete");
    } else {
      setShowPopup(true);
    }

    setLoading(false);
  };

  return (
    <div className="delete-account">
      {showPopup && (
        <Popup
          mainText="회원 탈퇴 중 오류가 발생했습니다."
          subText="잠시 후 다시 시도해 주세요. 계속해서 문제가 발생하면 고객센터에 문의해 주세요."
          onClose={() => setShowPopup(false)}
        />
      )}
      <div className="terms-wrap">
        <h2>회원을 탈퇴하시겠습니까?</h2>
        <ul className="terms-box">
          <li>1. 회원이 서비스 이용 계약을 해지(회원 탈퇴)하고자 할 경우, 회사가 제공하는 탈퇴 절차에 따라 직접 탈퇴 신청을 하여야 합니다.</li>
          <li>2. 회원이 직접 회원 탈퇴를 진행한 계정은 어떠한 경우에도 복구가 불가능합니다. 회원은 탈퇴 전 신중하게 결정하여야 합니다.</li>
          <li>3. 회원 탈퇴 시 회원의 모든 데이터(저장된 결과물, 활동 내역 등)는 즉시 삭제되며, 이는 복구할 수 없습니다.</li>
          <li>4. 회원 탈퇴 후에는 동일한 계정 정보(아이디, 이메일, 핸드폰 번호 등)로 7일간 재가입이 제한됩니다.</li>
        </ul>
      </div>

      <div className="btn-wrap">

        <label className="agree-check">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          위 내용을 확인했으며, 회원 탈퇴에 동의합니다.
        </label>
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={!checked || loading}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
