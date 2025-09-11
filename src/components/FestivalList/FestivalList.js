import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { PiMapPinArea } from "react-icons/pi"; // 아이콘 불러오기

const FestivalList = () => {
	const [search, setSearch] = useState('');
	const [selectedRegion, setSelectedRegion] = useState('all');
	// 현재 활성화된 하위 지역 버튼의 값을 저장할 상태
	const [activeSubRegion, setActiveSubRegion] = useState('전체');

	// 모든 지역 데이터
	const regionDataMap = {
		east: ['전체', '가평', '구리', '광주', '남양주', '성남', '양평', '하남'],
		west: ['전체', '군포', '과천', '광명', '부천', '시흥', '안산', '안양', '의왕'],
		south: ['전체', '수원', '안성', '여주', '오산', '용인', '이천', '평택', '화성'],
		north: ['전체', '고양', '김포', '동두천', '양주', '연천', '의정부', '파주', '포천'],
	};

	// 메인 셀렉트 박스 변경 핸들러
	const handleRegionChange = (e) => {
		const newSelectedRegion = e.target.value;
		setSelectedRegion(newSelectedRegion);
		// 새로운 권역 선택 시, 해당 권역의 첫 번째 항목('전체')을 기본 활성화로 설정
		// 'all'(경기도 전체)을 선택하면 '전체'로 초기화
		if (newSelectedRegion !== 'all' && regionDataMap[newSelectedRegion]) {
			setActiveSubRegion(regionDataMap[newSelectedRegion][0]); // 예를 들어 '전체'가 첫번째라고 가정
		} else {
			setActiveSubRegion('전체'); // 'all' 선택 시 기본값
		}
	};

	// 하위 지역 버튼 클릭 핸들러
	const handleSubRegionClick = (regionName) => {
		setActiveSubRegion(regionName);
		console.log(`선택된 권역: ${selectedRegion}, 하위 지역: ${regionName}`);
		// 여기에서 ${selectedRegion}과 ${regionName}을 사용하여 API 호출 
	};

	// 하위 지역 버튼들을 렌더링하는 헬퍼 함수
	const renderRegionButtons = (regionList) => {
		if (!regionList) return null; // 데이터가 없을 경우 처리

		return regionList.map((regionName) => (
			<li key={regionName}>
				<button
					type='button'
					onClick={() => handleSubRegionClick(regionName)}
					className={activeSubRegion === regionName ? 'active' : ''}
				>
					{regionName}
					{regionName === '전체' && <PiMapPinArea />}
				</button>
			</li>
		));
	};

	// 현재 선택된 지역에 해당하는 데이터 가져오기
	const currentRegionButtonsData = regionDataMap[selectedRegion];

	return (
		<div id='festivalList'>
			<nav className="region-filter">
				<div className='filter'>
					<select
						id="regionSelect"
						className="region-dropdown"
						value={selectedRegion}
						onChange={handleRegionChange}
					>
						<option value="all">경기도 전체</option>
						<option value="east">경기 동부권</option>
						<option value="west">경기 서부권</option>
						<option value="south">경기 남부권</option>
						<option value="north">경기 북부권</option>
					</select>
					<form className="search-container">
						<input
							type='text'
							placeholder='검색'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button type="submit"><IoSearchOutline /></button>
					</form>
				</div>

				{/* selectedRegion이 'all'이 아닐 때만 해당 지역 버튼 목록을 렌더링 */}
				{selectedRegion !== 'all' && currentRegionButtonsData && (
					<ul id={`${selectedRegion}Regions`} className="region-list">
						{renderRegionButtons(currentRegionButtonsData)}
					</ul>
				)}

				{/* '경기도 전체'가 선택되었을 때 메시지 표시 */}
				{selectedRegion === 'all' && (
					<p style={{ marginTop: '20px', textAlign: 'center', color: '#999999' }}>
						지역을 선택하시면 세부 지역 목록이 표시됩니다.
					</p>
				)}
			</nav>
			<div className='festival-info-container'>
				<p>검색결과 <span>17개의</span> 축제가 있어요!</p>
				<div className='controls-wrapper'>
				<label for="check"><input type='radio' id='check' name='check'/>
				진행중 <span> | </span></label>
				<select className="sort-select">
					<option  value="start">개최순</option>
					<option value="end">마감순</option>
				</select>
				</div>
			</div>
		</div>
	);
};

export default FestivalList;