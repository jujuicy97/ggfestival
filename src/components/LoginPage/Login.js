import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../utils/FestivalAPI';
import { saveUserInfo } from '../../utils/LocalStorage';
import { GiConsoleController } from 'react-icons/gi';

const Login = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [popUp, setPopUp] = useState(false);
  // const navigate = useNavigate('');


  const LoginSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await fetchLogin(userID, password)
    if(error) {
      console.log('로그인 실패')
      setPopUp(true)
    } else if (data){
      console.log('로그인 성공')
      saveUserInfo(data)
      // navigate('main')
    }
  }
  return (
    <div id='Login'>
      <div className='header'></div>
      <img className="LoginLogo"
      src={`${process.env.PUBLIC_URL}/images/LoginPage/Login01.png`} 
      alt="한눈에 보는 경기도의 모든 축제! 경축 로고 이미지" />
      <form onSubmit={LoginSubmit}>
        <input
        className='custom-input'
          type='text'
          placeholder='아이디를 입력해 주세요'
          value={userID}
          onChange={(e) => { setUserID(e.target.value) }}
        />
        <input
          className='custom-input'
          type='password'
          placeholder='비밀번호를 입력해 주세요'
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button type='submit'>로그인</button>
      </form>
      <div className='Login-btn1'>
      <button>회원가입 ＞</button>
      <ul>
      <li><button>아이디찾기</button></li>
      <li>|</li>
      <li><button>비밀번호 재설정</button></li>
      </ul>
      </div>
      <p>SNS계정으로 간편 로그인하세요</p>
      <div className='snsLogin'>
      <button className='kakao'>
      <img
      
      src={`${process.env.PUBLIC_URL}/images/LoginPage/Login02.png`} 
      alt="카카오톡 간편 로그인 이미지" />
      </button>
      <button className='google'>
        <img 
      src={`${process.env.PUBLIC_URL}/images/LoginPage/Login03.png`} 
      alt="구글 간편 로그인 이미지" />
      </button>
      <button className='naver'>
        <img 
      src={`${process.env.PUBLIC_URL}/images/LoginPage/Login04.png`} 
      alt="네이버 간편 로그인 이미지" />
      </button>
      </div>
      
      {
        popUp && (
          <div className="popup-wrap">
            <div className="popup">
              <div className="popup-top">
                {/* <PiWarningCircleFill className="warning-sign" /> */}
                <p className="popup-ment1">일치하는 회원 정보가 없습니다</p>
                <p className="popup-ment2">회원가입 후 이용해 주세요</p>
              </div>
              <button onClick={() => { setPopUp(false) }}>확인</button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Login;