import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { IoIosArrowForward } from "react-icons/io";
import { BiSolidPencil } from "react-icons/bi";

import { getUserInfo } from '../../utils/LocalStorage';
import { changeInfo, getAllProfiles } from '../../utils/FestivalAPI';

const EditInfo = () => {
  const navigate = useNavigate();

  // 유저 정보
  const [userInfo, setUserInfo] = useState(getUserInfo() || {
    userName: "",
    email: "",
    userid: "",
    password: "",
    phone: "",
    profile_image_url: ""
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [loading, setLoading] = useState(false);

  // 프로필 모달
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileList, setProfileList] = useState([]);
  const [tempProfile, setTempProfile] = useState(userInfo.profile_image_url);

  // 일반 정보 수정 모달 열기
  const openModal = (field) => {
    setEditingField(field);
    setTempValue(userInfo[field]);
  };

  // 일반 정보 저장
  const handleSave = async () => {
    setLoading(true);

    const payload = {
      userId: userInfo.userid,
      newPass: editingField === 'password' ? tempValue : userInfo.password,
      newName: editingField === 'userName' ? tempValue : userInfo.userName,
      newPhone: editingField === 'phone' ? tempValue : userInfo.phone,
      newProfile: userInfo.profile_image_url,
    };

    const { error } = await changeInfo(payload);

    if (!error) {
      const updatedUserInfo = { ...userInfo, [editingField]: tempValue };
      setUserInfo(updatedUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      setEditingField(null);
    } else {
      alert("정보 수정 중 오류가 발생했습니다.");
    }

    setLoading(false);
  };

  const handleClose = () => setEditingField(null);

  // 프로필 모달 열기
  const openProfileModal = async () => {
  setShowProfileModal(true);
  const { data, error } = await getAllProfiles();
  if (!error) setProfileList(data);
};

  // 프로필 저장
  const handleProfileSave = async () => {
    setLoading(true);

    const payload = {
      userId: userInfo.userid,
      newPass: userInfo.password,
      newName: userInfo.userName,
      newPhone: userInfo.phone,
      newProfile: tempProfile,
    };

    const { error } = await changeInfo(payload);

    if (!error) {
      const updatedUserInfo = { ...userInfo, profile_image_url: tempProfile };
      setUserInfo(updatedUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      setShowProfileModal(false);
    } else {
      alert("프로필 수정 중 오류 발생");
    }

    setLoading(false);
  };

  return (
    <div className='edit-info'>
      {/* 일반 정보 수정 모달 */}
      {editingField && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>정보 수정</h4>
            <input
              // type={editingField === "password" ? "password" : "text"}
              type="text"
              value={tempValue}
              onChange={e => setTempValue(e.target.value)}
              disabled={loading}
            />
            <div className="modal-btns">
              <button onClick={handleClose} disabled={loading}>취소</button>
              <button onClick={handleSave} disabled={loading}>저장</button>
            </div>
          </div>
        </div>
      )}

      {/* 프로필 선택 모달 */}
      {showProfileModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>프로필 선택</h4>
            <div className="profile-list">
              {profileList.map(url => (
                <img
                  key={url}
                  src={url}
                  className={tempProfile === url ? "selected" : ""}
                  onClick={() => setTempProfile(url)}
                />
              ))}
            </div>
            <div className="modal-btns">
              <button onClick={() => setShowProfileModal(false)}>취소</button>
              <button onClick={handleProfileSave}>저장</button>
            </div>
          </div>
        </div>
      )}

      {/* 프로필 이미지 */}
      <div className='user-pic'>
        <div className="img-wrap" onClick={openProfileModal}>
          <span className="img">
            <img src={userInfo.profile_image_url} alt="프로필" />
          </span>
          <button>
            <BiSolidPencil />
          </button>
        </div>
      </div>

      {/* 사용자 정보 */}
      <div className='user-info-wrap'>
        <ul>
          <li className="disabled">
            <p>이메일</p>
            <span>{userInfo.email}</span>
          </li>

          <li className="disabled">
            <p>아이디</p>
            <span>{userInfo.userid}</span>
          </li>

          <li className="enabled" onClick={() => openModal("userName")}>
            <p>이름</p>
            <div className="wrap">
              <span>{userInfo.userName}</span>
              <IoIosArrowForward />
            </div>
          </li>

          <li className="enabled" onClick={() => openModal("password")}>
            <p>비밀번호</p>
            <div className="wrap">
              <span>{userInfo.password}</span>
              <IoIosArrowForward />
            </div>
          </li>

          <li className="enabled" onClick={() => openModal("phone")}>
            <p>전화번호</p>
            <div className="wrap">
              <span>{userInfo.phone}</span>
              <IoIosArrowForward />
            </div>
          </li>
        </ul>

        <div className='accountRemoveBtnWrap'>
          <p>회원정보를 삭제하시겠어요?</p>
          <p onClick={() => navigate("/delete-account")}>회원탈퇴</p>
        </div>
      </div>
    </div>
  );
};

export default EditInfo;
