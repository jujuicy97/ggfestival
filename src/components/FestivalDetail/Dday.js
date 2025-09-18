
const Dday = ({festival}) => {


// 현재 축제 상황 뱃지 만들기 (진행중/D-3)
    const getFestivalStatus = (festival) =>{
        const today = new Date();
        // 날짜 비교를 위해 시간은 자정으로 설정하기 
        today.setHours(0,0,0,0); 
        // 시작 날짜 시간 설정
        const startDate = new Date(festival.startdate);
        startDate.setHours(0,0,0,0);
        // 종료 날짜 시간 설정
        const endDate = new Date(festival.enddate)
        endDate.setHours(0,0,0,0);

        // 유효하지 않은 날짜들 처리
        if(isNaN(startDate.getTime()) || isNaN(endDate.getTime())){
        return {text:""};// 유효하지 않은 날짜들은 빈칸으로 처리 
        }
        // 진행중인 축제 뱃지 처리 (오늘 >=시작일 & 오늘 <=종료일)
        if(startDate <= today && endDate >= today){
        return {text: '진행중', className: 'status-ongoing'};
        }
        // 앞으로 열릴 축제 뱃지 처리(시작일 > 오늘)
        else if(startDate > today){
        const diffTime = startDate.getTime() - today.getTime();
        // 밀리초 단위를 일 단위로 변환(올림 처리)
        const diffDays = Math.ceil(diffTime/(1000*60*60*24));
        if(diffDays === 0){
            return {text : '진행중', className: 'status-today'};
        } else { // 디데이 처리
            return {text :`D-${diffDays}`,className: 'status-dday'};
        }
        }
        return {text :'종료', className:'status-endded'};
  };

  const { text, className } = getFestivalStatus(festival);
  if(!text) return null;
  
    return (
        <div className={`dday-btn ${className}`}> {text} </div>
    );
};

export default Dday;