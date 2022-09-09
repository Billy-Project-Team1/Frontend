import React, { useEffect, useState, useRef } from 'react';
import { Calendar } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import { HiOutlineCalendar, HiOutlineChevronDown } from 'react-icons/hi';
import './Calendar.scss';
import DateObject from 'react-date-object';

const PostingCalendar = () => {
  const newdate = new DateObject();
  const noDates = useRef();
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
  const [date, setDate] = useState(new Date());
  const [dates, setDates] = useState();
  const [toggleOn, setToggleOn] = useState(false);

  const toggleMode = () => {
    setToggleOn((toggleOn) => !toggleOn);
  };
  const setDateFormat = () => {
    if (date.length > 0) {
      noDates.current = null;
      const getDates = date.map((v, i) => {
        return v.format(v._format);
      });
      setDates(getDates);
      // if (date.length<3){
      //   noDates.current[];
      //   for (let i=0; i< date.length; i ++){

      //   }
      // }
      const dateItem = `${
        date[0].month.number < 10
          ? '0' + date[0].month.number
          : date[0].month.number
      }.${date[0].day < 10 ? '0' + date[0].day : date[0].day}(${
        weekDays[date[0].weekDay.index]
      })`;
      noDates.current = dateItem;
      if (date.length > 2) {
        noDates.current = `${dateItem}외 ${date.length - 1}일`;
      }
    } else {
      noDates.current = [];
    }
  };
  console.log(date.toLocaleString());

  return (
    <div>
      <HiOutlineCalendar size="50" />
      <input
        readOnly
        placeholder="대여 불가능한 날짜를 체크해주세요"
        onClick={() => {
          toggleMode();
          setDateFormat();
        }}
        value={noDates.current?.length > 0 ? noDates.current : ''}
      />
      <HiOutlineChevronDown />
      {toggleOn === true ? (
        <Calendar
          multiple
          value={date}
          onChange={setDate}
          weekDays={weekDays}
          months={months}
          format="YYYY/MM/DD"
          maxDate={new Date().setDate(90)}
          className="rmdp-mobile"
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default PostingCalendar;
