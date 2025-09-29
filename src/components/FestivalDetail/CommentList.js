import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

const CommentList = ({ comments, user, onChangeComment, onDeleteComment }) => {
  // console.log(comments);
  const [openOption, setOpenOption] = useState(false); //어떤 댓글에서 옵션이 열려있는지 확인
  const [editID, setEditID] = useState(null); //댓글 수정중인지 아닌지
  const [editDetail, setEditDetail] = useState(""); //수정할 댓글 내용
  const [copyID, setCopyID] = useState(null); //댓글 복사

  const handleOption = (id) => {
    setOpenOption((prev) => (prev === id ? null : id));
  };

  //댓글 복사 메시지
  const handleCopy = (c) => {
    navigator.clipboard.writeText(c.content);
    setCopyID(c.id);
    setTimeout(() => setCopyID(null), 1500); //1.5초 후 메시지 사라짐
  };

  return (
    <div className="comment-wrap">
      {comments.length === 0 && <p>댓글이 없습니다</p>}
      {comments.map((c) => {
        const myComment = user?.id === c.userid; //내가 작성한 댓글인지 아닌지
        const myEdit = editID === c.id; //내가 수정할 댓글인지 아닌지

        return (
          <div key={c.id} className="comment-item">
            <div className="profile-info">
              <img
                src={c.users?.profile_image_url || "/default-profile.png"}
                alt="프로필 이미지"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid #eee",
                }}
              />
              <div className="info">
                {copyID === c.id && (
                  <span className="copy-msg">댓글이 복사되었습니다</span>
                )}
                <div className="info1">
                  <div className="info2">
                    <p className="info3">{c.users?.userName || "익명"}</p>
                    <p className="info4">
                      {
                        c.created_at
                          .slice(0, 10)
                          .split("-") //배열로 분리
                          .map((v) => String(Number(v))) // 0 제거
                          .join(". ") //점 뒤에 공백
                      }{" "}
                      <span>{c.created_at.slice(11, 16)}</span>
                    </p>
                  </div>
                  <SlOptionsVertical onClick={() => handleOption(c.id)} />
                </div>


                <div className="info-bottom">
                  {/* 댓글 내용 / 수정 input */}
                  {myEdit ? (
                    <div className="edit-input">
                      <input className="input"
                        type="text"
                        value={editDetail}
                        onChange={(e) => setEditDetail(e.target.value)}
                      />
                      <div className="btn-wrap">
                        <button
                          className="save"
                          onClick={() => {
                            onChangeComment(c.id, editDetail);
                            setEditID(null); //수정 종료
                          }}
                        >
                          저장
                        </button>
                        <button
                          className="cancle"
                          onClick={() => setEditID(null)}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{c.content}</p>
                  )}

                  {/* 메뉴 */}
                  {openOption === c.id && (
                    <div className="comment-option">
                      {myComment ? (
                        <>
                          <button
                            className="edit"
                            onClick={() => {
                              setEditID(c.id);
                              setEditDetail(c.content);
                              setOpenOption(null);
                            }}
                          >
                            수정
                          </button>
                          <button
                            className="delete"
                            onClick={() => {
                              onDeleteComment(c.id);
                            }}
                          >
                            삭제
                          </button>
                          <button
                            className="copy"
                            onClick={() => handleCopy(c)}
                          >
                            댓글 복사
                          </button>
                        </>
                      ) : (
                        <>
                          <button className='report'>신고</button>
                          <button
                            className='copy2'
                            onClick={() => handleCopy(c)}
                          >
                            댓글 복사
                          </button>
                          <button className='block'>작성자 차단</button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
