import { useState } from "react";

const CommentCreat = ({}) => {
    const [comment, setComment] = useState("");
    const [isLogin, setIsLogin] = useState(true); // 임시 테스트

    const commentChange = (e)=>{
        setComment(e.target.value);
    }

    const commentSub = ()=>{
        if(!comment.trim()) return;
        //댓글 등록 api호출
        console.log("댓글 등록:", comment);
        setComment(""); //등록 후 input 초기화
    }

    return (
        <div className="comment-creat">
            <input 
                className="creat-input"
                type="text"
                value={comment}
                onChange={commentChange}
                placeholder={ isLogin ? "댓글을 입력하세요" : "로그인이 필요합니다"}
                disabled={!isLogin}
            />
            {isLogin && (
                <button
                    className="creat-btn"
                    onClick={commentSub}
                    disabled={!comment.trim()}
                >
                    등록
                </button>
            )}
        </div>
    );
};

export default CommentCreat;