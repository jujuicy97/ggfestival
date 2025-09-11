
const Search = () => {
    return (
        <div id="search">
            <div className="cancel"></div>
            <div className="search-tab">
                <form>
                    <input></input>
                    <button></button>
                </form>
            </div>
            <div className="recommend">
                <h4>추천 키워드</h4>
                <div className="keyword">
                    <div className="top">
                        <p>불꽃축제</p>
                        <p>재즈</p>
                        <p>맥주</p>
                        <p>가을</p>
                    </div>
                    <div className="bottom">
                        <p>여름</p>
                        <p>뱃놀이</p>
                        <p>겨울</p>
                        <p>문화재</p>
                    </div>
                </div>
            </div>
            <div className="popular">
                <h4>인기 검색 축제</h4>
                <div className="list">
                    <div className="content">
                        <p>1</p>
                        <p></p>
                    </div>
                    <div className="content">
                        <p>2</p>
                        <p></p>
                    </div>
                    <div className="content">
                        <p>3</p>
                        <p></p>
                    </div>
                    <div className="content">
                        <p>4</p>
                        <p></p>
                    </div>
                    <div className="content">
                        <p>5</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;