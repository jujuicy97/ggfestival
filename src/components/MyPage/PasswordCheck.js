import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup';

import { getUserInfo } from '../../utils/LocalStorage';
import { checkPass } from '../../utils/FestivalAPI';

const PasswordCheck = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [popupMainText, setPopupMainText] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleGoPWCheck = async () => {
    const userInfo = getUserInfo(); 

    if (!userInfo || !userInfo.userid) {
      setPopupMainText('사용자 정보 오류');
      setErrorMsg('사용자 정보를 불러올 수 없습니다.');
      setShowPopup(true);
      return;
    }

    const { data, error } = await checkPass(userInfo.userid, password);

    if (error || !data) {
      setPopupMainText('비밀번호가 일치하지 않습니다');
      setErrorMsg('정확한 비밀번호를 입력하신 후 다시 시도해 주세요.');
      setShowPopup(true);
      return;
    }

    navigate('/editinfo');
  };

  const handleForgotPassword = () => {
    setPopupMainText('비밀번호가 기억나지 않아요')
    setErrorMsg('비밀번호는 재설정만 가능해요');
    setShowPopup(true);
  };

  // Enter 키 이벤트 처리
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리로드 방지
    if (password) handleGoPWCheck();
  };

  return (
    <div className='password-check'>
      {showPopup && (
        <Popup
          mainText={popupMainText}
          subText={errorMsg}
          onClose={() => setShowPopup(false)}
        />
      )}

      <form className='top' onSubmit={handleSubmit}>
        <div className='text'>
          <h2>비밀번호를 입력해 주세요</h2>
          <p>입력 후 회원정보 조회 및 수정이 가능해요</p>
        </div>
        <input
          type="password"
          placeholder='비밀번호를 입력해주세요.'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

      <div className='bottom'>
        <p onClick={handleForgotPassword}>비밀번호가 기억나지 않아요</p>
        <button
          disabled={!password}
          className={password ? 'btn-active' : 'btn-disabled'}
          onClick={handleGoPWCheck}>확인</button>
      </div>
    </div>
  );
};

export default PasswordCheck;
