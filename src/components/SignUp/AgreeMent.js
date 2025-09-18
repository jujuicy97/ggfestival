import { useState } from "react";
import { FaRegCircle } from "react-icons/fa";

const AgreeMent = () => {
    const agreeArray = [
        {id:1, title:"[필수] 서비스 이용 약관 동의", desc:(
            <ul>
                <li>경기도 내 축제 정보를 제공하는 "경축"을 이용하기 위한 기본 약관입니다.</li>
                <li>서비스 이용과 관련한 권리·의무, 책임 사항이 포함되어 있습니다.</li>
            </ul>
        )},
        {id:2, title: "[필수] 개인정보 수집 및 이용 동의", desc:(
            <ul>
                <li>회원 가입을 위해 이름, 전화번호, 아이디, 비밀번호를 수집합니다.</li>
                <li>수집된 정보는 축제 알림과 맞춤 추천에만 사용됩니다.</li>
            </ul>
        )},
        {id:3, title: "[필수] 위치 정보 이용 동의", desc:(
            <ul>
                <li>현재 위치 기반으로 가까운 축제 정보를 알려드립니다.</li>
                <li>위치 정보는 실시간 서버 저장 없이, 축제 추천 기능에만 사용됩니다.</li>
            </ul>
        )},
        {id:4, title: "[선택] 마케팅 정보 수신 동의", desc:(
            <ul>
                <li>경기도 내 최신 축제 소식, 이벤트, 할인 정보 등을 받아볼 수 있습니다.</li>
            </ul>
        )}
    ]

    //체크된 항목들
    const [checked,setChecked] = useState([false,false,false,false]); //초기값 전부 선택안됨
    //설명이 열려있는 항목
    const [opened,setOpened] = useState(null);
    //동의가 완료되지않음
    const [agreeNeed,setAgreeNeed] = useState(false);
    
    //체크가 반드시 되어야하는 필수 항목
    const allRequiredCheck = checked[0] && checked[1] && checked[2]; //필수 적힌 것들만

    //모든 약관에 동의하기
    const handleAllCheck = (e)=>{
        const isChecked = e.target.checked;
        setChecked(checked.map(()=>{
            return isChecked;
        }))
    }

    //체크 될때마다 상태변경
    const handleCheck = (idx)=>{
        //기존 체크항목
        const newChecked = [...checked];
        //새로운 항목
        newChecked[idx] = !newChecked[idx]; //안되어있으면 되게 되어있으면 안되게
        setChecked(newChecked);
    }

    //상세정보 토글처리
    const handleOpenClose = (id)=>{
        setOpened((prev)=> prev === id ? null : id);
    }

    //다음버튼 처리
    const handleNextBtn = ()=>{
        if(allRequiredCheck){
            Navigate("/signupinfo")
        }
        if(!allRequiredCheck){
            setAgreeNeed(true); 
        }
    }
    return (
        <div id="agree-ment">
            <div className="agree-wrap">
                <h3>이용 약관에 동의해주세요.</h3>
                <div className="all-check">
                    <FaRegCircle />
                </div>
            </div>
            
        </div>
    );
};

export default AgreeMent;