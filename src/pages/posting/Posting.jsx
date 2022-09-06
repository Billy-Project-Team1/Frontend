// React import
import React, { useState } from 'react';

// Style
import './Posting.scss';

// Component import
import AddPostingHeader from '../../commponents/header/AddPostingHeader';
import { Calendar } from 'react-multi-date-picker';
import { HiOutlineCalendar } from 'react-icons/hi';
import { FaCamera } from 'react-icons/fa';
import KakaoMap from '../../commponents/maps/KakaoMap';
import SearchPlace from '../../commponents/maps/SearchPlace';

const Posting = () => {
	const [title, setTitle] = useState();
	const [price, setPrice] = useState();
	const [deposit, setDeposit] = useState();
	const [content, setContent] = useState();
	const [calendarOpen, setCalendarOpen] = useState(false);
	const calendarClose = () => {
		setCalendarOpen(!calendarOpen);
	};

	const newPosting = {
		title: '맥북쓰고싶은분~',
		content: '새 맥북이 생겨서 올려봅니다 깨끗하게 써주시',
		price: 10000,
		deposit: 100000,
		location: '상봉동',
		latitude: '33.45050036271282',
		longitude: '126.57007065166688',
		blockDateDtoList: '2022-09-22',
		// files: form/data,
	};

	return (
		<div>
			<AddPostingHeader />
			<div className="posting_container">
				<div className="posting_image">
					<div className="v249_1687">
						<div class="name"></div>
						<div class="v249_1689"><FaCamera /> </div>
						<span class="v249_1690">0/10</span>
					</div>
				</div>

				<div className="posting_title">
					<input
						type="text"
						placeholder="제품명"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className="posting_rental">
					<div className="posting_price">
						<label>일 대여금</label>
						<input
							type="text"
							placeholder="₩일 대여금"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>

					<div className="posting_deposit">
						<label>보증금</label>

						<input
							type="text"
							placeholder="₩보증금"
							value={deposit}
							onChange={(e) => setDeposit(e.target.value)}
						/>
					</div>
				</div>

				<div className="posting_calendar_wrap">
					<div className="posting_calendar_icon">
						<HiOutlineCalendar
							style={{ marginRight: '14px' }}
							color="#212121"
							size="24px"
							onClick={calendarClose}
						/>
						{calendarOpen && (
							<Calendar calendarClose={calendarClose}></Calendar>
						)}
						<div className="posting_calendar">
							<Calendar
								style={{ marginRight: '14px' }}
								color="#212121"
								size="24px"
								display="none"
							/>
						</div>
					</div>
				</div>

				<div className="posting_content">
					<textarea
						type="text"
						placeholder="게시물 내용을 작성해주세요. (적절하지 못한 제품은 게시가 제한될 수
				있어요.)"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>

				{/* <SearchPlace />
			<KakaoMap /> */}
			</div>
		</div>
	);
};

export default Posting;
