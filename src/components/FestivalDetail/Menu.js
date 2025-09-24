import { useState } from "react";

const Menu = ({commentCount}) => {
  const [selectMenu, setSelectMenu] = useState(0);
  const menus = ["행사소개", " 장소 정보", `댓글(${commentCount})`];
  const ids = ["progress-intro","progress-place","progress-comment"];

  const clickMenu = (i)=>{
    setSelectMenu(i);
    const each = document.getElementById(ids[i]);
    if(each){
      each.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="menu">
      {menus.map((menu, i) => {
        return (
          <div
            key={i}
            className={`menu-item ${selectMenu === i ? "tap" : ""}`}
            onClick={() => clickMenu(i)}
          >
            <p>{menu}</p>
            {/* 선택된 메뉴일 때 프로그래스바 표시 */}
            {selectMenu === i && <div className="progress-bar" />}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
