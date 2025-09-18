import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addComment, AllComments, Allfestival, changeComment, deleteComment, fetchComment } from "../../utils/FestivalAPI";
import { IoIosArrowBack } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoNavigate } from "react-icons/io5";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import Dday from "./Dday";
import Menu from "./Menu";
import LoadFind from "./LoadFind";
import CommentCreat from "./CommentCreat";
import CommentList from "./CommentList";


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
    const addComments = async (userID, content, festivalID)=>{
        console.log("addComments 실행됨", userID, content, festivalID);
        const { data, error } = await addComment(userID, content, contentid);
        if(!error && data) {
            setComments(prev => [data[0], ...prev]);
        } //최신 댓글 상단
    }
//댓글 수정
    const changeComments = async (id, userID, newContent) =>{
        const { data, error } = await changeComment(id, userID, newContent);
        if( !error && data ) {
            setComments(prev => //이전 댓글 배열들(업뎃 전)
            //수정하려는 c.id가 이전 id와 같다면 새로운 댓글로 교체, 다르면 그대로 유지(map으로 해당 댓글만 새 내용으로 교체)
                prev.map(c => (c.id===id ? { ...c, content: newContent } : c))
            );
        }
    };
//댓글 삭제
    const deleteComments = async (id, userID) =>{
        const { data, error } = await deleteComment(id, userID);
        if( !error && data ) {
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
// 뒤로가기, 찜, 공유 아이콘        
        <div className="detail-wrap">
            <div className="header-bar">
                <IoIosArrowBack />
                <CiBookmark />
                <CiShare2 />
            </div>
{/* 메뉴와 날씨 정보 */}
            <div className="detail-top">
                {festival.firstimage && <img src={festival.firstimage} alt={festival.title} />}
                <h1>{festival.title}</h1>
                <div className="date-weather">
                    <div className="date-weather-left">
                        <Dday festival={festival}/>
                        <p className="date">{festival.startdate} ~ {festival.enddate}</p>
                    </div>
                    <div className="date-weather-right">
                        <p>날씨 구현</p>
                    </div>
                </div>
            </div>
{/* 축제 정보 텍스트 */}
            <div className="detail-text-wrap">
                <div className="menu">
                    <Menu commentCount={comments.length}/>
                </div>
                <div className="text1">
                    <div id="progress-intro" className="overview">{festival.overview}</div>
                </div>
                <div className="text2">
                    <p><span>일자</span> {festival.startdate} ~ {festival.enddate}</p>
                    <p><span>시간</span> {festival.playtime}</p>
                    <p><span>요금</span> {festival.usetimefestival}</p>
                    {/* 연령제한이 없는 경우는 없음으로 표시하기 구현 */}
                    <p><span>연령</span> {festival.agelimit}</p> 
                    <p><span>주최</span> {festival.telname}</p>
                    <p><span>문의</span> {festival.tel}</p>
                    {/* <p>{festival.addr1}</p> */}
                </div>
                <hr className="bar2"/>
            </div> 
{/* 지도 영역 */}
            <div id="progress-place" className="map-wrapper">
                <div className="map-text-wrap">
                    <div className="map-title">
                        <FaMapMarkerAlt />
                        <p>{festival.addr1}</p>
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
                    style={{ width: "100%", height: "200px" }}
                    level={6}
                >
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
                    isLogin={true} //임시임. 실제 로그인 컴포넌트랑 연동해야함. 현재는 항상 로그인 true상태
                    onAddComment={(content) => {
                        const userID = "testUser"   //임시. 로그인 컴포넌트 연동 후 연결
                        addComments(userID,content,contentid);
                    }}
                />
                <CommentList 
                    comments={comments}
                    onChangeComment={changeComments}
                    onDeleteComment={deleteComment}
                />
            </div>

            
        </div>
        );
    };

export default FestivalDetail;