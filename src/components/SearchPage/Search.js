import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { fetchFiveRandom } from "../../utils/FestivalAPI";
import { ReactComponent as Logo } from '../../icons/gray-logo.svg';
import FestivalUpdate from "../../utils/FestivalUpdate";

const Search = ({ setSearchWord, setContentID }) => {
    const [word, setWord] = useState('');
    const [arrayFive, setArrayFive] = useState([]);
    const navigate = useNavigate();
    const handleSumbit = (e) => {
        e.preventDefault();
        setSearchWord(word);
        navigate('/list/:regionId') //만약에 페이지이름이 틀릴시에 수정부탁드려용
    }
    const handleClick = (value) => {
        setSearchWord(value);
        navigate('/list/:regionId');
    }
    const handleMove = (id) => {
        setContentID(id);
        navigate(`/festivals/${id}`);
    }

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 돌아가기
    };

    const randomFest = async () => {
        const { data, error } = await fetchFiveRandom();
        if (data) {
            console.log(data);
        }
        if (error) {
            console.log('에러발생');
        }
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

        setArrayFive(selected);
    }
    useEffect(() => {
        randomFest();
    }, [])
    return (
        <div id="search"
            style={{
                backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg.png')`,
            }}>
            <div className="top">
                <div className="cancel"><IoClose onClick={handleGoBack} /></div>
                <div className="search-tab">
                    <form onSubmit={handleSumbit}>
                        <input
                            id="searchWord"
                            type="text"
                            placeholder="축제를 검색해 보세요"
                            value={word}
                            onChange={(e) => { setWord(e.target.value) }}
                        />
                        <button type="submit"><IoSearch /></button>
                    </form>
                </div>
                <div className="recommend">
                    <h4>추천 키워드</h4>
                    <div className="keyword">
                        <button onClick={() => { handleClick('불꽃축제') }}>불꽃축제</button>
                        <button onClick={() => { handleClick('재즈') }}>재즈</button>
                        <button onClick={() => { handleClick('맥주') }}>맥주</button>
                        <button onClick={() => { handleClick('가을') }}>가을</button>
                        <button onClick={() => { handleClick('여름') }}>여름</button>
                        <button onClick={() => { handleClick('뱃놀이') }}>뱃놀이</button>
                        <button onClick={() => { handleClick('겨울') }}>겨울</button>
                        <button onClick={() => { handleClick('문화재') }}>문화재</button>
                    </div>
                </div>
                <div className="popular">
                    <h4>인기 검색 축제</h4>
                    <div className="list">
                        {
                            arrayFive.map((item, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => { handleMove(item.contentid) }}
                                    >
                                        <p className="num">{idx + 1}</p>
                                        <div>
                                            <p className="title">{item.title}</p>
                                            <p className="sigungu">{item.sigungucode}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <Logo className="logo" />
        </div>
    );
};

export default Search;