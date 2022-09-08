import React, { useEffect, useRef, useState } from 'react';
import DatePicker, { Calendar } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { HiOutlineCalendar } from 'react-icons/hi';
import './Calendar.scss';
import DateObject from 'react-date-object';

const PostingCalendar = () => {
  const newdate = new DateObject();
  const [dates, setDates] = useState(new Date());
  console.log(dates.toLocaleString());

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
  //   const [date, setDate] = useState();
  //   const naDate = useRef([]);

  //   useEffect(() => {
  //     if (dates?.length < 3) {
  //       naDate.current = [];
  //       for (let i = 0; i < dates.length; i++) {
  //         const naDateList = `${
  //           dates[i].month.number < 10
  //             ? '0' + dates[i].month.number
  //             : dates[i].month.number
  //         }.${
  //           dates[i].day.number < 10
  //             ? '0' + dates[i].day.number
  //             : dates[i].day.number
  //         }(${weekDays[dates[i].weekDays.index]})`;
  //         naDate.current.push(naDateList);
  //       }
  //     } else {
  //       const naDateList = `${
  //         dates[0].month.number < 10
  //           ? '0' + dates[0].month.number
  //           : dates[0].month.number
  //       }.${
  //         dates[0].day.number < 10
  //           ? '0' + dates[0].day.number
  //           : dates[0].day.number
  //       }(${weekDays[dates[0].weekDays.index]})`;
  //       naDate.current = [`${naDateList} 외 ${dates.length - 1}개`];
  //     }
  //   }, [dates]);

  return (
    <div>
      <HiOutlineCalendar size="50" />
      <Calendar
        multiple
        value={dates}
        onChange={setDates}
        weekDays={weekDays}
        months={months}
        format="YYYY/MM/DD"
        maxDate={new Date().setDate(90)}
        inputClass="custom-input"
        className="rmdp-mobile"
        placeholder="대여 불가능한 날짜를 선택해주세요"
        mobileLabels={{ OK: '확인', CANCEL: '취소' }}
      />
    </div>
  );
};

export default PostingCalendar;
