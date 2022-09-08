// React import
import React, { useState } from 'react';

// Style
import './Posting.scss';

//icons
import { Calendar } from 'react-multi-date-picker';
import { HiOutlineCalendar } from 'react-icons/hi';
import { FaCamera } from 'react-icons/fa';

// Component import
import AddPostingHeader from '../../commponents/header/AddPostingHeader';
import ImageUploader from '../../commponents/imageUploader/ImageUploader';

import KakaoMap from '../../commponents/maps/KakaoMap';
import SearchPlace from '../../commponents/maps/SearchPlace';
import { Navigate, useNavigate } from 'react-router-dom';
import Footer from '../../commponents/footer/Footer';

const Posting = () => {
	const navigate = useNavigate();
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

	const move = () => {
		navigate('/');
	};

	return (
		<div>
			<AddPostingHeader move={move} />
			<div className="posting_container">
				<div className="posting_image">
					<ImageUploader />
					{/* <div className="v249_1687">
						<div class="name"></div>
						<div class="v249_1689"><FaCamera /> </div>
						<span class="v249_1690">0/10</span>
					</div> */}
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
						<label className="posting_price_label">일 대여금</label>
						<input
							className="posting_price_input"
							type="text"
							placeholder="원"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>

					<div className="posting_deposit">
						<label className="posting_deposit_label">보증금</label>
						<input
							className="posting_deposit_input"
							type="text"
							placeholder="원"
							value={deposit}
							onChange={(e) => setDeposit(e.target.value)}
						/>
					</div>
				</div>

				<div className="posting_calendar_wrap">
					<div className="posting_calendar_icon">
						<HiOutlineCalendar
							style={{ marginRight: '14px' }}
							color="#757575"
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
      <Footer />
    </div>
  );
};

export default Posting;
