import { useState, useEffect } from 'react';
import { getUserInfo } from '../../utils/LocalStorage';
import { fetchComment } from '../../utils/FestivalAPI';
import Popup from '../Popup';

import { FaCommentSlash } from "react-icons/fa6";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const userID = getUserInfo()?.id; // UUID 사용

  useEffect(() => {
    if (!userID) {
      setShowPopup(true); // userID 없으면 팝업 표시
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      const { data, error } = await fetchComment(userID);
      if (!error) setComments(data || []);
      setLoading(false);
    };

    fetchData();
  }, [userID]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="comment-list">
      {showPopup && (
        <Popup
          mainText="사용자 정보를 가져올 수 없습니다."
          subText="로그인 후 이용해주세요."
          onClose={() => setShowPopup(false)}
        />
      )}
      {comments.length === 0 ? (
        <div className='no-comment'>
          <FaCommentSlash />
          <p>아직 작성한 댓글이 없어요</p>
        </div>
      ) : (
        <ul>
          {comments.map(c => (
            <li key={c.id}>{c.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
