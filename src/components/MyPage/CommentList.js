import { useState, useEffect } from 'react';
import { getUserInfo } from '../../utils/LocalStorage';
import { fetchComment, Allfestival, changeComment, deleteComment } from '../../utils/FestivalAPI';
import Popup from '../Popup';
import Popup2 from '../Popup2';
import { useNavigate } from 'react-router-dom';

import { FaCommentSlash } from "react-icons/fa6";
import { RiMore2Line } from "react-icons/ri";

const CommentList = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const userID = getUserInfo()?.id; // UUID 사용

  const [activeComment, setActiveComment] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    if (!userID) {
      setShowPopup(true);
      setLoading(false);
      return;
    }



    const fetchData = async () => {
      // 1. 댓글 가져오기
      const { data: commentData, error: commentError } = await fetchComment(userID);
      if (commentError) {
        setLoading(false);
        return;
      }

      // 2. 축제 전체 가져오기
      const { data: festivalData, error: festivalError } = await Allfestival();
      if (festivalError) {
        setLoading(false);
        return;
      }
      setFestivals(festivalData);

      // 3. 댓글 + 축제 매칭
      const commentsWithFestival = commentData.map(c => {
        const festival = festivalData.find(f => String(f.contentid) === String(c.contentid));
        return { ...c, festival };
      });

      setComments(commentsWithFestival);
      setLoading(false);
    };

    fetchData();
  }, [userID]);

  if (loading) return <p>로딩 중...</p>;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    // YYYY-MM-DD HH:mm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleDelete = async () => {
    if (!activeComment) return;
    const { error } = await deleteComment(activeComment.id, userID);
    if (!error) {
      setComments(prev => prev.filter(c => c.id !== activeComment.id));
      setShowDeletePopup(false);
      setActiveComment(null);
    }
  };

  // 수정
  const handleEdit = async () => {
    if (!activeComment) return;
    const { error } = await changeComment(activeComment.id, userID, editContent);
    if (!error) {
      setComments(prev => prev.map(c => c.id === activeComment.id ? { ...c, content: editContent } : c));
      setShowEditPopup(false);
      setActiveComment(null);
    }
  };

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
            <li key={c.id}>
              <div className='top'>
                <p>{formatDate(c.created_at)}</p>
                <RiMore2Line
                  onClick={() => {
                    setActiveComment(c);
                    setShowOptions(prev => !prev);
                  }}
                />
                {/* 수정 삭제 모달 */}
                {showOptions && activeComment?.id === c.id && (
                  <>
                    {/* 배경 오버레이 */}
                    <div
                      className="options-overlay"
                      onClick={() => setShowOptions(false)}
                    />
                    <div className="options-popup">
                      <button
                        onClick={() => {
                          setShowEditPopup(true);
                          setEditContent(c.content);
                          setShowOptions(false);
                        }}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          setShowDeletePopup(true);
                          setShowOptions(false);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className='bottom'>
                <p>{c.content}</p>
                {c.festival ? (
                  <p onClick={() => navigate(`/festivals/${c.festival.contentid}`)}>
                    {c.festival.title}
                  </p>
                ) : (
                  <p>축제 정보 없음</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {showDeletePopup && (
        <Popup2
          mainText="작성한 댓글을 삭제하시겠습니까?"
          cancelText="취소"
          confirmText="확인"
          onClose={() => setShowDeletePopup(false)}
          onConfirm={handleDelete}
        />
      )}

      {showEditPopup && (
        <Popup2
          mainText="댓글 내용을 수정한 후 저장 버튼을 눌러주세요."
          subText={
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          }
          hideIcon={true}
          cancelText="취소"
          confirmText="저장"
          onClose={() => setShowEditPopup(false)}
          onConfirm={handleEdit}
        />
      )}

    </div>
  );
};

export default CommentList;
