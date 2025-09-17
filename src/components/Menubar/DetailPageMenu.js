import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from "react-icons/io";
import { ReactComponent as Mark } from '../../icons/mark-icon.svg';
import { ReactComponent as MarkActive } from '../../icons/mark-active-icon.svg';
import { IoShareSocialOutline } from "react-icons/io5";

const DetailPageMenu = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div className='detail-page-menu'>
      <IoIosArrowBack className="back-icon" onClick={handleGoBack} />
      <div className="icon-wrap">
        <MarkActive />
        <IoShareSocialOutline className="share-icon" />
      </div>
    </div>
  );
};

export default DetailPageMenu;