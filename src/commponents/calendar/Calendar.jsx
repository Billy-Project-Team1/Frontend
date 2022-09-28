// React import
import React, { useEffect, useState, useRef } from 'react';
// Library import
import { Calendar } from 'react-multi-date-picker';
// Icon import
import {
	HiOutlineCalendar,
	HiOutlineChevronDown,
	HiOutlineChevronUp,
} from 'react-icons/hi';
// Style import
import './Calendar.scss';

const PostingCalendar = ({ setData, data }) => {
	const noDates = useRef();
	const noDates2 = useRef();
	const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
	const months = [
		'1월',
		'2월',
		'3월',
		'4월',
		'5월',
		'6월',
		'7월',
		'8월',
		'9월',
		'10월',
		'11월',
		'12월',
	];
	const [date, setDate] = useState([]);
	const [dates, setDates] = useState();
	const [toggleOn, setToggleOn] = useState(false);

	const toggleMode = () => {
		setToggleOn((toggleOn) => !toggleOn);
	};
	const deleteDates = () => {
		setDate([]);
		setDates();
		noDates.current = [];
	};
	const setDateFormat = () => {
		if (date?.length > 0) {
			noDates.current = null;
			const getDates = date.map((v, i) => {
				return v.format(v._format);
			});
			setDates(getDates);
			if (date?.length < 2) {
				noDates.current = [];
				noDates2.current = [];
				for (let i = 0; i < date.length; i++) {
					const dateItem = `${
						date[i].month.number < 10
							? '0' + date[i].month.number
							: date[i].month.number
					}월 ${date[i].day < 10 ? '0' + date[i].day : date[i].day}일 (${
						weekDays[date[i].weekDay.index]
					})`;
					noDates2.current.push(dateItem);
					noDates.current = `${noDates2.current[0]}`;
				}
			} else if (date?.length <= 2) {
				noDates.current = [];
				noDates2.current = [];
				for (let i = 0; i < date.length; i++) {
					const dateItem = `${
						date[i].month.number < 10
							? '0' + date[i].month.number
							: date[i].month.number
					}월 ${date[i].day < 10 ? '0' + date[i].day : date[i].day}일 (${
						weekDays[date[i].weekDay.index]
					})`;
					noDates2.current.push(dateItem);
					noDates.current = `${noDates2.current[0]}, ${noDates2.current[1]}`;
				}
			} else {
				noDates2.current = [];
				for (let i = 0; i < date.length; i++) {
					const dateItem = `${
						date[i].month.number < 10
							? '0' + date[i].month.number
							: date[i].month.number
					}월 ${date[i].day < 10 ? '0' + date[i].day : date[i].day}일 (${
						weekDays[date[i].weekDay.index]
					})`;
					noDates2.current.push(dateItem);
				}
				noDates.current = noDates2.current.sort();

				noDates.current = `${noDates.current[0]}, ${noDates.current[1]}외 ${
					date.length - 2
				}일`;
			}
		} else {
			noDates.current = [];
		}
	};
	const blockDate = date.map((v) => {
		v = v.toLocaleString();
		return v;
	});

	useEffect(() => {
		setDateFormat();
		setData({
			...data,
			blockDateDtoList: blockDate,
		});
	}, [date]);

	return (
		<div className="calendar_wrap">
			<div className="calendar_box">
				<HiOutlineCalendar
					color="#757575"
					size="18px"
					style={{ margin: '2px 6px 0 0' }}
				/>
				{noDates.current?.length > 0 ? (
					<div
						onClick={() => {
							toggleMode();
						}}
						className="calendar_box_text"
					>
						{noDates.current}
					</div>
				) : (
					<div
						onClick={() => {
							toggleMode();
						}}
						className="calendar_box_text2"
					>
						대여 불가능한 날짜를 체크해주세요
					</div>
				)}
				<div className="calendar_toggleIcon">
					{toggleOn === true ? (
						<HiOutlineChevronUp />
					) : (
						<HiOutlineChevronDown />
					)}
				</div>
			</div>
			{toggleOn === true ? (
				<div>
					<Calendar
						multiple
						value={date}
						onChange={setDate}
						weekDays={weekDays}
						months={months}
						format="YYYY/MM/DD"
						minDate={new Date()}
						maxDate={new Date().setDate(90)}
					/>
					<div className="calendar_btns">
						<p onClick={() => deleteDates()}>전체 삭제</p>
						<button
							onClick={() => {
								toggleMode(false);
							}}
						>
							저장
						</button>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default PostingCalendar;
