import { IoMenu } from "react-icons/io5";

const ControlBar = ({ isOpen, barClick }) => {

    return (
        <>
        <div className="controlBar" onClick={barClick}>
          <div className="handle">
          <IoMenu className="menu"/>
          <p>목록보기</p>
          </div>
        </div>

        <div className="controlBar2">

        </div>
        </>
      );
    };

export default ControlBar;