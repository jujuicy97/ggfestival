//사용자 SwipeMove동작, 스와이프 랜더링 컴포넌트

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from '@use-gesture/react'
import { useEffect, useState } from "react";

const SwipeMove = ({ isExtend, setIsExtend }) => {
 //바텀시트의 수직 위치 0일때 300px 위치, 음수면 화면 위로 올라가게
    //api: 상태를 변경할 수 있는 함수로, 드래그나 상태 변화 시 위치를 업데이트 해줌
    const [{height}, api] = useSpring(()=>({height:150}));  
    const bind = useDrag(
        //down: 현재 드래그 중인지, movement: 드래그 총 이동거리, velocity: 드래그 속도, direction: 드래그 방향
        ({ down, movement: [, my], velocity: [, vy], direction: [, dy] }) => {
            if (down) {
              // 드래그 중일 때는 움직임을 바로 따라가도록 즉시 적용
              api.start({ height: Math.min(Math.max(300 - my, 300), window.innerHeight), immediate: true });
            } else {
              // 손을 떼면 스와이프 속도와 방향에 따라 확장 상태 토글
              if (vy > 0.3) {       //***사용자의 스와이프 조절 부분 : 일정 속도로 올리면 확장***//
                if (dy < 0) setIsExtend(true); // 위로 스와이프 → 확장
                else setIsExtend(false);       // 아래로 스와이프 → 축소
              } else {
            // 속도가 느리면 위치 기준에서 확장 여부 판단
                if (my < -150) setIsExtend(true);  //***사용자의 스와이프 조절 부분 : 일정 이상 올리면 확장***//
                else setIsExtend(false);
              }
            }
        });

    useEffect(() => {
        api.start({
          y: isExtend ? -window.innerHeight + 300 : 0, //확장상태이면, 전체높이+300만큼 확장
          immediate: false,
        });
      }, [isExtend, api]);
      //isExtend 상태가 변경될 때마다 애니메이션 시작

    return(
        <animated.div 
            {...bind()} 
            style={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100%',
                height,
                backgroundColor: '#eee',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.3)',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                touchAction: 'none',
                zIndex: 10000,
                overflow: 'auto'
            }}
        >
            {/* 스와이프 안에 들어갈 콘텐츠 자리 */}
            <h1>test...</h1>
        </animated.div>
    );
};

const Swipe = () => {
    const [isExtend, setIsExtend] = useState(false); //스와이프 확장 상태 관리(처음엔 확장하지 않음)

    return (
        <div>
            <SwipeMove isExtend={isExtend} setIsExtend={setIsExtend}/>
        </div>
    );
};

export default Swipe;