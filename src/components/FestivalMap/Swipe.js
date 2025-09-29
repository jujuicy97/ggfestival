  //사용자 SwipeMove동작, 스와이프 랜더링 컴포넌트

import { Allfestival, fetchFavorites } from "../../utils/FestivalAPI";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { getDistance } from "../../utils/Distance";
import { FiMapPin } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import SwipeFavorite from "./SwipeFavorite";
import { getUserInfo } from "../../utils/LocalStorage";


//축제 api
const kakaoLestKey = process.env.REACT_APP_KAKAO_REST_KEY;

const SwipeMove = ({ isExtend, setIsExtend, baseLocate}) => {

//상세페이지로 넘어가기
  const navigate = useNavigate();
  const moveDetailPage = (contentid) =>{
    navigate(`/festivals/${contentid}`);
  };

//festival data 전체 가져오기
  const [festivalList, setFestivalList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await Allfestival();
        if (error) {
          console.error("축제 데이터 로드 실패");
        } else {
          setFestivalList(data);
        }
      } catch (err) {
        console.log("예상치 못한 오류 발생", err);
      }
    };
    fetchData();
  }, []);
  // console.log(festivalList);


  //스와이프 바텀 시트
  //바텀시트의 수직 위치 0일때 300px 위치, 음수면 화면 위로 올라가게
  //api: 상태를 변경할 수 있는 함수로, 드래그나 상태 변화 시 위치를 업데이트 해줌
  const [{ height }, api] = useSpring(() => ({ height: 120 }));
  const bind = useDrag(
    //down: 현재 드래그 중인지, movement: 드래그 총 이동거리, velocity: 드래그 속도, direction: 드래그 방향
    ({ down, movement: [, my], velocity: [, vy], direction: [, dy], distance, tap}) => {
    // 확장 상태에서 탭이면 아무 동작도 하지 않음
    if (isExtend && tap) {
      return;
    }
      
      //드래그 중
      if (down) {
        // 드래그 중일 때는 움직임을 바로 따라가도록 즉시 적용
        api.start({
          height: Math.max(300 - my, 300),
          immediate: true,
        });
        return;
      }

      //손을 뗐을 때
      if(!down){
        // 드래그 거리 10px 미만이면 무시
        if (distance < 10) return;
        // 손을 떼면 스와이프 속도와 방향에 따라 확장 상태 토글
        if (vy > 0.3) {
          //***사용자의 스와이프 조절 부분 : 일정 속도로 올리면 확장***//
          if (dy < 0) setIsExtend(true); // 위로 스와이프 → 확장
          else setIsExtend(false); // 아래로 스와이프 → 축소
        } else {
          // 속도가 느리면 위치 기준에서 확장 여부 판단
          if (my < -150) setIsExtend(true);
          //***사용자의 스와이프 조절 부분 : 일정 이상 올리면 확장***//
          else setIsExtend(false);
        }
      }
    },
    {filterTaps: true}
  );

  useEffect(() => {
    api.start({
     height: isExtend ? window.innerHeight : 100, 
    immediate: false,
    });
  }, [isExtend, api]);
  //isExtend 상태가 변경될 때마다 애니메이션 시작


// 현재 위치 좌표값 -> 도로명/지번 주소 변환 (classname : locater-title에서 사용)
  const [currentAddress, setCurrentAddress] = useState("");
  useEffect(()=>{
    const address = async ()=>{
      if(!baseLocate.lat || !baseLocate.lng) return;
      try{
        const res = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${baseLocate.lng}&y=${baseLocate.lat}`,
          {
            headers: {
              Authorization: `KakaoAK ${kakaoLestKey}`,
            },
          }
        );
        const data = await res.json();
        console.log(data);
        const address = data.documents[0]?.address?.address_name || "주소 정보 없음";
        setCurrentAddress(address);
      } catch (err) {
        console.error("주소 변환 오류:", err);
        setCurrentAddress("주소 변환 실패");
      }
    };
    address();
  }, [baseLocate]);


  return (
    <>
{/* 목록보기, 지도보기 버튼 토글 */}
      {!isExtend && (
        <div className="toggle-btn top" onClick={() => setIsExtend(true)}>
          <IoMenu className="listIcone" />
          목록보기
        </div>
      )}
      {isExtend && (
        <div className="toggle-btn bottom" onClick={() => setIsExtend(false)}>
          <FiMapPin className="mapIcon" />
          지도보기
        </div>
      )}

{/* 사용자 시점 스크롤 시 애니메이션 적용(gesture 라이브러리 기능) */}
      <animated.div
        {...bind()}
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          height,
          backgroundColor: "#fff",
          boxShadow: "0 -4px 10px rgba(0,0,0,0.3)",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          touchAction: "none",
          zIndex: 10000,
          overflow: "auto",
        }}
      >
        
{/* 스와이프 안에 들어갈 콘텐츠 자리 */}
        <ul className="swipeContent-wrap">

          <div className="bar"></div>
          <div className="locate-title">{currentAddress || `${baseLocate.lat},${baseLocate.lng}`}</div>
    {/* festivalList 가져온거 뿌리기 */}
          {festivalList
          //먼저 filter로 5키로 이내 축제만 거름
            .filter((f) => {
              const calcDistance = getDistance(
                baseLocate.lat,
                baseLocate.lng,
                Number(f.mapy),
                Number(f.mapx)
              );
              return calcDistance <= 5000; // 5km 이내
            })
            //위 거른 결과를 map으로 랜더링
            .map((f) => {
              const calcDistance = getDistance(
                baseLocate.lat,
                baseLocate.lng,
                Number(f.mapy),
                Number(f.mapx)
              );
            
            return(
            <li key={f.contentid} className="swipeContent">
    {/* 이미지 클릭시 상세페이지 이동 */}
              {f.firstimage && (
                <img 
                  src={f.firstimage} 
                  alt={f.title} 
                  onClick={()=>moveDetailPage(f.contentid)}
                  style={{cursor: "pointer" }}
                  />
                )}
              <div className="text-wrap">
    {/* 20km 반경 축제 목록 상세 설명 */}
                <div className="top-text">
    {/* 제목 클릭 시 상세페이지 이동 */}
                  <p 
                    className="title"
                    onClick={()=>{moveDetailPage(f.contentid)}}
                    style={{cursor: "pointer" }}
                  >{f.title}</p>
    {/* 찜 상태 반영, 클릭 이벤트*/}
                <SwipeFavorite festival={f} className="swipe-favorite"/>
                </div>
                <div className="text">
                  <div className="date">
                    <p>{f.startdate}</p>
                    <p> ~ {f.enddate}</p>
                  </div>
                  <p>{f.addr1}</p>
                  <p>
                  {calcDistance < 1000 ? `${Math.round(calcDistance)} m` : `${(calcDistance / 1000).toFixed(1)} km`}
                  </p>
                </div>

              </div>
            </li>
          );  
        })}

        </ul>

      </animated.div>
    </>
  );
};

const Swipe = ({baseLocate}) => {
  const user = getUserInfo();
  const [isExtend, setIsExtend] = useState(false); //스와이프 확장 상태 관리(처음엔 확장하지 않음)
  const [favorites, setFavorites] = useState([]);  //내 찜 목록 관리

  //최초 로딩 시 내 찜 목록 불러오기(기존 찜 표시용)
  useEffect(()=>{
    if(!user?.id) return;
    const loadFavorites = async () =>{
      const { data } = await fetchFavorites(user?.id);
      if(data){
        setFavorites(data.map((f) => f.favorites?.contentid));
      }
    };
    loadFavorites();
  },[user?.id]);

  return (
    <div>
      <SwipeMove 
        isExtend={isExtend} 
        setIsExtend={setIsExtend} 
        baseLocate={baseLocate} 
      />
    </div>
  );
};

export default Swipe;