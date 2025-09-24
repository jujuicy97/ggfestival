import { HiMiniCheckBadge } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const SignUpComplete = () => {
    const navigate = useNavigate();
    return (
        <div id="signup-complete">
            <div className="badge">
                <HiMiniCheckBadge />
                <p>회원가입이 완료되었습니다!</p>
            </div>
            <div className="bottom">
                <p>지금 로그인하고 경기도의 축제를 즐겨보세요!</p>
                <button className="login-btn" onClick={()=>{navigate('/login')}}>로그인하러 가기</button>
                <button className="home-btn" onClick={()=>{navigate('/')}}>홈으로 가기</button>
            </div>
        </div>
    );
};

export default SignUpComplete;