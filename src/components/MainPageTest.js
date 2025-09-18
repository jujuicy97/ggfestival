import { useNavigate } from "react-router-dom";

const MainPageTest = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>test page</h1>
            <button onClick={()=> navigate("/mainMap")}>지도로 찾기</button>
        </div>
    );
};

export default MainPageTest;