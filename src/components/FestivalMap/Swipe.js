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

const SwipeMove = ({ isExtend, setIsExtend, baseLocate }) => {
  //상세페이지로 넘어가기
  const navigate = useNavigate();
  const moveDetailPage = (contentid) => {
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
  //api: 상태를 변경할 수 있는 함수로, 드래그나 상태 변화 시 위치를 업데이트 해줌
  const open = 0;
  const closed = window.innerHeight - 120;
  const [{ y }, api] = useSpring(() => ({ y: closed }));

  //확장/축소
  useEffect(() => {
    api.start({ y: isExtend ? open : closed });
  }, [isExtend, api]);
  //isExtend 상태가 변경될 때마다 애니메이션 시작

  //드래그
  const bind = useDrag(
    //down: 현재 드래그 중인지, movement: 드래그 총 이동거리, velocity: 드래그 속도, direction: 드래그 방향
    ({last,movement: [, my], velocity: [, vy],direction: [, dy],event,}) => {
    // 닫힌 상태일때는 토글버튼이나 드래그로만 확장될 수 있도록(= 스와이프 영역 클릭시는 확장 x)
    if (!isExtend) {
      // 닫힌 상태일때 터치 시작 위치가 화면 아래 닫힌 영역(예: window.innerHeight - 120) 아래라면 확장 방지
      const touchY = event.touches ? event.touches[0].clientY : event.clientY;
      if (touchY > window.innerHeight - 120) {
        return; // 닫힌 120px 영역 터치 무시
      }
    }

  //스와이프 영역 전체 드래그와 스와이프 안의 컨텐츠 영역 드래그가 달라서 따로 분리하여 드래그 설정
      const { target } = event;
      const dragContent = target.closest(".swipeContent-wrap"); //.swipeContent-wrap안에서의 드래그 지정
      let drag = true; //드래그 가능 변수

      if (dragContent && isExtend) {
        const isScrollable = dragContent.scrollHeight > dragContent.clientHeight;
        const atTop = dragContent.scrollTop === 0; //dragContent가 맨 위
        const atBottom =
          Math.ceil(dragContent.scrollTop + dragContent.clientHeight) >=
          dragContent.scrollHeight; //dragContent가 맨 아래

        // 아래로 드래그 중이고 리스트 맨 위가 아니면 바텀시트 drag 막기
        if (dy > 0 && !atTop) drag = false;
        // 위로 드래그 중이고 리스트 맨 아래가 아니면 바텀시트 drag 막기
        if (dy < 0 && !atBottom) drag = false;

        if (!drag) return;
      }

      if (last) {
        if (my > 100 || (vy > 0.5 && dy > 0)) setIsExtend(false);
        else setIsExtend(true);
      } else {
        api.start({ y: Math.max(0, my) });
      }
    },
    { from: () => [0, y.get()], filterTaps: true }
  );

  
  // 현재 위치 좌표값 -> 도로명/지번 주소 변환 (classname : locater-title에서 사용)
  const [currentAddress, setCurrentAddress] = useState("");
  useEffect(() => {
    const address = async () => {
      if (!baseLocate.lat || !baseLocate.lng) return;
      try {
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
        const address =
          data.documents[0]?.address?.address_name || "주소 정보 없음";
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
          transform: y.to((v) => `translateY(${v}px)`),
          position: "fixed",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          boxShadow: "0 -4px 10px rgba(0,0,0,0.3)",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          touchAction: "none",
          zIndex: 10000,
          overflow: "auto",
        }}
      >
        <div
          className="bar"
          style={{
            width: 40,
            height: 4,
            background: "#D1D5DB",
            borderRadius: "16px",
            margin: "10px auto",
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            cursor: "grab",
          }}
        />

        {/* 스와이프 안에 들어갈 콘텐츠 자리 */}
        <ul
          className="swipeContent-wrap"
          style={{
            overflowY: isExtend ? "auto" : "hidden",
            maxHeight: isExtend ? "75vh" : "unset", // 75% 화면, 필요시 조정
            WebkitOverflowScrolling: "touch", // iOS 부드러운 스크롤
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="locate-title">
            {currentAddress || `${baseLocate.lat},${baseLocate.lng}`}
          </div>
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

              return (
                <li key={f.contentid} className="swipeContent">
                  {/* 이미지 클릭시 상세페이지 이동 */}
                  {f.firstimage && (
                    <img
                      src={f.firstimage}
                      alt={f.title}
                      onClick={() => moveDetailPage(f.contentid)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  <div className="text-wrap">
                    {/* 20km 반경 축제 목록 상세 설명 */}
                    <div className="top-text">
                      {/* 제목 클릭 시 상세페이지 이동 */}
                      <p
                        className="title"
                        onClick={() => {
                          moveDetailPage(f.contentid);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {f.title}
                      </p>
                      {/* 찜 상태 반영, 클릭 이벤트*/}
                      <SwipeFavorite festival={f} className="swipe-favorite" />
                    </div>
                    <div className="text">
                      <div className="date">
                        <p>{f.startdate}</p>
                        <p> ~ {f.enddate}</p>
                      </div>
                      <p>{f.addr1}</p>
                      <p>
                        {calcDistance < 1000
                          ? `${Math.round(calcDistance)} m`
                          : `${(calcDistance / 1000).toFixed(1)} km`}
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

const Swipe = ({ baseLocate }) => {
  const user = getUserInfo();
  const [isExtend, setIsExtend] = useState(false); //스와이프 확장 상태 관리(처음엔 확장하지 않음)
  const [favorites, setFavorites] = useState([]); //내 찜 목록 관리

  //최초 로딩 시 내 찜 목록 불러오기(기존 찜 표시용)
  useEffect(() => {
    if (!user?.id) return;
    const loadFavorites = async () => {
      const { data } = await fetchFavorites(user?.id);
      if (data) {
        setFavorites(data.map((f) => f.favorites?.contentid));
      }
    };
    loadFavorites();
  }, [user?.id]);

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
