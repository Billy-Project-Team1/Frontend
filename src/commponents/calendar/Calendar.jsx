import React, { useEffect, useState, useRef } from 'react';
import { Calendar } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import {
  HiOutlineCalendar,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from 'react-icons/hi';
import './Calendar.scss';

const PostingCalendar = () => {
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
  // console.log(date.toLocaleString());

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
      if (date?.length < 3) {
        noDates.current = [];
        for (let i = 0; i < date.length; i++) {
          const dateItem = `${
            date[i].month.number < 10
              ? '0' + date[i].month.number
              : date[i].month.number
          }.${date[i].day < 10 ? '0' + date[i].day : date[i].day}(${
            weekDays[date[i].weekDay.index]
          })`;
          noDates.current.push(dateItem);
        }
      } else {
        noDates2.current = [];
        for (let i = 0; i < date.length; i++) {
          const dateItem = `${
            date[i].month.number < 10
              ? '0' + date[i].month.number
              : date[i].month.number
          }.${date[i].day < 10 ? '0' + date[i].day : date[i].day}(${
            weekDays[date[i].weekDay.index]
          })`;
          noDates2.current.push(dateItem);
        }
        noDates.current = noDates2.current.sort();

        noDates.current = `${noDates.current[0]},${noDates.current[1]}외 ${
          date.length - 2
        }일`;
      }
    } else {
      noDates.current = [];
    }
  };

  useEffect(() => {
    setDateFormat();
  }, [date]);

  return (
    <div className="calendar-wrap">
      <HiOutlineCalendar
        style={{ marginRight: '14px' }}
        color="#757575"
        size="24px"
      />

      <input
        readOnly
        placeholder="대여 불가능한 날짜를 체크해주세요"
        className="calendar-input"
        onClick={() => {
          toggleMode();
        }}
        value={noDates.current?.length > 0 ? noDates.current : ''}
      />
      {/* {noDates.current?.length > 0 && (
        <button type="button" onClick={() => deleteDates()}>
          삭제
        </button>
      )} */}
      {toggleOn === true ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
      {noDates.current?.length > 0 && (
        <button className="calendar-deleteButton" onClick={() => deleteDates()}>
          삭제
        </button>
      )}

      {toggleOn === true ? (
        <Calendar
          multiple
          value={date}
          onChange={setDate}
          weekDays={weekDays}
          months={months}
          format="YYYY/MM/DD"
          minDate={new Date()}
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
