import { useState } from "react";

const OverViewPlus = ({ overview }) => {
  const [isExtend, setIsExtend] = useState(false);
  const limit = 150;
  const longTxt = overview.length > limit;

  const viewTxt =
    isExtend || !longTxt ? overview : overview.slice(0, limit) + "...";

  return (
    <div className="overview-wrap">
      {/* 오버뷰 내용 */}
      <div className="overview">{viewTxt}
      {/* 더보기 버튼 */}
      {longTxt && (
        <button
          className="plus-btn"
          onClick={() => setIsExtend(!isExtend)}
        >
          {isExtend ? "접기" : "더보기"}
        </button>
      )}
      </div>
    </div>
  );
};
export default OverViewPlus;
