import { SlOptionsVertical } from "react-icons/sl";

const CommentList = ({ comments, onChangeComment, onDeleteComment }) => {
  // console.log(comments);

  return (
    <div className="comment-list">
      {comments.length === 0 && <p>댓글이 없습니다</p>}
      {comments.map((c) => {
        return (
          <div key={c.id} className="comment-item">
            <div className="profile-info">
              <img
                src={c.users.profile_image_url}
                alt="프로필 이미지"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid #eee",
                }}
              />
              <div className="info">
                <div className="info1">
                  <div className="info2">
                    <p className="info3">{c.users.userName}</p>
                    <p className="info4">{c.created_at.slice(0, 10)}</p>
                    <p className="info4">
                      {c.created_at.slice(10, -13).replace("T", "")}
                    </p>
                  </div>
                  <SlOptionsVertical />
                </div>
                <p>{c.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
