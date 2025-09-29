import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addComment, AllComments, Allfestival, changeComment, deleteComment, fetchComment, getRandomProfile } from "../../utils/FestivalAPI";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import Dday from "./Dday";
import Menu from "./Menu";
import LoadFind from "./LoadFind";
import CommentCreat from "./CommentCreat";
import CommentList from "./CommentList";
import { getUserInfo } from "../../utils/LocalStorage";
import Weather from "./Weather";
import OverViewPlus from "./OverViewPlus";


const FestivalDetail = ({baseLocate}) => {

//contentid 받아오기(축제의 고유 번호로, 각각 해당하는 축제 정보를 띄울 때 필요)
const {contentid} = useParams(); 

//festival data 전체 가져오기(여러 축제 정보 띄울 때 필요)
  const [festivalList, setFestivalList] = useState([]);
  const [festival, setFestival] = useState(null);
  
//지도 sdk 로드 (지도를 사용할 때마다 각 컴포넌트에서 적용)  
    const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_APP_KEY,
    libraries: ["services"], // 필요한 라이브러리 등록
    });

//축제 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await Allfestival();
        if (error) {
          console.error("축제 데이터 로드 실패");
        } else {
          setFestivalList(data);
        //   console.log("선택한 축제:", data);
        
        //contentid와 일치하는 축제 선택
        const select = data.find(f => f.contentid === contentid);
        setFestival(select);
        }
      } catch (err) {
        console.log("예상치 못한 오류 발생", err);
      }
    };
    fetchData();
  }, [contentid]);
// console.log(festivalList);
// console.log(festival);


//댓글 기능(부모에서 관리)
//contentid로 모든 댓글 가져오기
const [comments, setComments] = useState([]);
const user = getUserInfo();
// console.log("user:", user);

useEffect(()=>{
    if(!contentid) return;
    const fetchComments = async () => {
        const { data, error } = await AllComments(contentid);
        // console.log("AllComments data:", data);
        // console.log("AllComments error:", error);
        if (!error && data) setComments(data);
        else setComments([]);
      };
      fetchComments();
    }, [contentid]);

//댓글 추가 
const addComments = async (userID, content) => {
    const user = getUserInfo();
    if (!contentid || !userID || !user) return;

    const { data, error } = await addComment(userID, contentid, content);

    if (!error && data) {
        const newComment = {
            ...data[0],
            content: content,
            users: {
                userName: user.userName,
                profile_image_url: user.profile_image_url
            }
        };
        setComments(prev => [newComment, ...prev]);
    }
};

//댓글 수정
    const changeComments = async (id, newContent) =>{
        if (!user) return;

    // 화면 먼저 업데이트
    setComments(prev =>
        prev.map(c => (c.id===id ? { ...c, content: newContent } : c))
    );    

        const { data, error } = await changeComment(id, user.id, newContent);
        if( error ) {
            console.error("댓글 수정 실패", error);
            // 실패하면 이전 상태로
            setComments(prev => //이전 댓글 배열들(업뎃 전)
            //수정하려는 c.id가 이전 id와 같다면 새로운 댓글로 교체, 다르면 그대로 유지(map으로 해당 댓글만 새 내용으로 교체)
            prev.map(c => (c.id===id ? { ...c, content: comments.find(x => x.id === id).content } : c))
            );
        }
    };

//댓글 삭제
    const deleteComments = async (id) =>{
        const { data, error } = await deleteComment(id, user.id);
        if( !error ) {
            setComments(prev =>
                //삭제에 성공하면 error가 없는 상태가 되어서, 실행(filter로 해당 댓글만 삭제)
                prev.filter(c => c.id !== id) 
            );
        }
    };


//지도 에러시
if(!festival) return <p>Loading...</p>;
if(loading) return <p>지도 로딩중...</p>;
if(error) return <p>지도 로딩 실패</p>



    return (
        <div className="detail-wrap">

{/* 메뉴와 날씨 정보 */}
            <div className="detail-top">
                {festival.firstimage && <img src={festival.firstimage} alt={festival.title} />}
                <h1>{festival.title}</h1>
                <div className="date-weather">
                    <div className="date-weather-left">
                        <Dday festival={festival}/>
                        <p className="date">
                        {festival.startdate
                            .split("-")             
                            .map((v) => String(Number(v))) 
                            .join(".")} ~ {festival.enddate
                            .split("-")
                            .map((v) => String(Number(v)))
                            .join(".")}
                        </p>
                    </div>
                    <div className="date-weather-right">
                        <Weather lat={festival.mapy} lon={festival.mapx} />
                    </div>
                </div>
            </div>
{/* 축제 정보 텍스트 */}
            <div id="progress-intro" className="detail-text-wrap">
                <div className="menu">
                    <Menu commentCount={comments.length}/>
                </div>
                <div className="text1">
                    <OverViewPlus overview={festival.overview}/>
                    {/* <div className="overview">{festival.overview}</div> */}
                </div>
                <div className="text2">
                    <p>
                        <span>일자</span> 
                        <span>
                            {festival.startdate
                                .split("-")
                                .map((v) => String(Number(v)))
                                .join(".")} ~ {festival.enddate
                                .split("-")
                                .map((v) => String(Number(v)))
                                .join(".")
                            }</span>
                    </p>
                    <p>
                        <span>시간</span> 
                        <span>{festival.playtime}</span>    
                    </p>
                    <p>
                        <span>요금</span> 
                        <span className="content">{festival.usetimefestival.replace(/<br\s*\/?>/gi, " ")}</span>
                        
                        </p>

                {/* 방법1 : 연령이 공백일 경우 "-" 하이픈으로 대체 */}
                    <p>
                        <span>연령</span> 
                            <span className="content">
                                {festival.agelimit && festival.agelimit.trim() !== "" ? festival.agelimit : "-"}
                        </span>

                {/* 방법2 : 연령이 공백일 경우 아예 연령 항목 삭제(살짝 위아래 여백 생김) */}
                        {/* <span className="content">
                            {festival.agelimit && festival.agelimit.trim() !=="" &&(
                                <p>
                                    <span>연령</span> 
                                </p>
                            )}
                        </span> */}
                    </p>
                    <p>
                        <span>주최</span> 
                        <span className="content">{festival.telname}</span>
                    </p>
                    <p>
                        <span>문의</span> 
                        <span className="content">{festival.tel}</span>
                    </p>
                    {/* <p>{festival.addr1}</p> */}
                </div>
                <hr className="bar2"/>
            </div> 
{/* 지도 영역 */}
            <div id="progress-place" className="map-wrapper">
                <div className="map-text-wrap">
                    <div className="map-title">
                        <FaMapMarkerAlt />
                        <p className="addr">{festival.addr1}</p>
                    </div>
            {/* 길찾기 */}
                    <div className="load-find">
                        <LoadFind  className="find" baseLocate={baseLocate} festival={festival} />
                    </div>
                </div> 
            {/* 각 축제 지도 노출*/}
                <Map
                    center={{
                        lat: Number(festival.mapy),
                        lng: Number(festival.mapx)
                    }}
                    style={{ width: "100%", height: "200px", borderRadius: "0.8rem" }}
                    level={6}
                >
                <hr className="bar3"/>
            {/* 각 축제 마커 노출 */}
                <MapMarker 
                    position={{
                        lat: Number(festival.mapy),
                        lng: Number(festival.mapx)
                    }}
                    title={festival.title}
                    onClick={() =>
                    window.open(
                        `https://map.kakao.com/link/map/${festival.mapy},${festival.mapx}`,
                        "_blank"
                    )
                    }
                />
                </Map>

            </div>
{/* 댓글 영역 */}
            <div id="progress-comment" className="comment-wrap">
                <div className="comment-num">댓글<span>{comments.length}</span></div>
                <CommentCreat 
                    isLogin={!!user}
                    user={user}
                    onAddComment={addComments}
                    />

                    <CommentList 
                    comments={comments}
                    user={user}
                    onChangeComment={changeComments}
                    onDeleteComment={deleteComments}
                    />
                </div>

            
        </div>
        );
    };

export default FestivalDetail;