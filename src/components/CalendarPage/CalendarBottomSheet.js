import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useEffect } from "react";

const CalendarBottomSheet = ({ children, isOpen, onClose }) => {
const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const openHeight = 0; // 화면 상단부터 보여질 y 위치
  const closedHeight = 1100; // 화면에서 내려가 있을 때 y 위치 (px, 필요에 따라 조정)

  // isOpen에 따라 열기/닫기 애니메이션
  useEffect(() => {
    api.start({ y: isOpen ? openHeight : closedHeight });
  }, [isOpen]);

  // 드래그 제스처
  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy], direction: [, dy] }) => {
      if (last) {
        // 드래그 끝났을 때 스냅
        if (my > 100 || (vy > 0.5 && dy > 0)) {
          onClose(); // 닫기
        } else {
          api.start({ y: openHeight }); // 다시 열기
        }
      } else {
        // 드래그 중
        api.start({ y: Math.max(0, my) });
      }
    },
    { from: () => [0, y.get()] }
  );

  return (
    <animated.div
      {...bind()}
      style={{
        y,
        position: "fixed",
        bottom: `-${closedHeight}px`,
        left: 0,
        right: 0,
        height: `${closedHeight}px`,
        background: "#fff",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        boxShadow: "0 -4px 10px rgba(0,0,0,0.1)",
        touchAction: "none",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: 40,
          height: 4,
          background: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          borderRadius: "16px",
        }}
      />
      {children}
    </animated.div>
  );
};

export default CalendarBottomSheet;