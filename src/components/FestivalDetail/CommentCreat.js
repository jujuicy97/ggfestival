import { useState } from "react";
import Popup from "../Popup";
import { getUserInfo } from "../../utils/LocalStorage";

const CommentCreat = ({isLogin, user, onAddComment}) => {
    const [comment, setComment] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    //input 값 변경
    const commentChange = (e)=>{
        setComment(e.target.value);
    }

    //댓글 등록
    const commentSub = ()=>{
        if(!comment.trim()) return;
        if(!user) return; //로그인이 안되어 있으면 등록 안됨
        onAddComment(user.id, comment); //부모에게 comment 전달, 부모의 addComments 함수 호출
        setComment(""); //등록 후 input 초기화
    }

    //로그인이 안 되어 있을 때 input 클릭 시 팝업
    const commentClick = ()=>{
        if(!isLogin) setShowPopup(true);
    }

    return (
        <div className="comment-creat">
            <input 
                className="creat-input"
                type="text"
                value={comment}
                onChange={commentChange}
                placeholder={ isLogin ? "댓글을 입력하세요" : "로그인이 필요합니다"}
                // disabled={!isLogin}
                onClick={commentClick}
            />
        {/* 미로그인 input 클릭 시 팝업 */}
            {showPopup && (
            <Popup 
                popup
                mainText="로그인이 필요합니다"
                onClose={() => setShowPopup(false)}
            />
            )}
            {isLogin && (
                <button
                    className="creat-btn"
                    onClick={commentSub}
                    disabled={!comment.trim() || !isLogin}
                >
                    등록
                </button>
            )}
        </div>
    );
};

export default CommentCreat;