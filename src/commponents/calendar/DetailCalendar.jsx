import React, { useEffect, useState, useRef } from 'react';
import { Calendar, DateObject } from 'react-multi-date-picker';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import './Calendar.scss';
import { Navigate } from 'react-router-dom';

const DetailCalendar = ({ data, pickDate, setPickDate }) => {
  const noDates = useRef();
  const noDates2 = useRef();
  const today = new DateObject();
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
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState([]);
  const [dates, setDates] = useState();
  const [unavailable, setUnavailable] = useState([]);
  const [toggleOn, setToggleOn] = useState(true);
  // console.log(date.toLocaleString());
  // data={detailPost.blockDate?.blockDateList[0]}

  const toggleMode = () => {
    setToggleOn((toggleOn) => !toggleOn);
  };

  const disableDate = () => {
    const datesArray = [];
    data?.map((v) => {
      if (new Date(v).getMonth() + 1 === month) {
        datesArray.push(new Date(v).getDate());
      }
    });

    setUnavailable(datesArray);
  };

  useEffect(() => {
    let elements = null;
    elements = document.querySelectorAll('.calendar_toggleOn .rmdp-day .sd');
    for (let i = 0; i < elements.length; i++) {
      elements[i].parentNode.classList.remove('rmdp-disabled');
      for (let j = 0; j < unavailable.length; j++) {
        if (elements[i].innerText == unavailable[j]) {
          elements[i].parentNode.classList.add('rmdp-disabled');
        }
      }
    }
  }, [unavailable]);

  useEffect(() => {
    if (data) {
      disableDate();
    }
  }, [month, data, date, toggleOn]);

  // console.log(date[0])
  useEffect(() => {
    date.sort();
    console.log(date[0])
    for (let i = 0; i < data?.length; i++) {
      if (
        new Date(date[0]) < new Date(data[i]) &&
        new Date(date[1]) > new Date(data[i])
      ) {
        date.pop();
        return alert('잘못된 날짜입니다');
      }
      else if(date[0]?.toLocaleString() == date[1]?.toLocaleString()){
        date.pop();
        date.pop();
        return alert('최소 1일 이상 설정해주세요')
      }
    }
  }, [date]);

  const setDateFormat = () => {
    if (date?.length > 0) {
      noDates.current = null;
      const getDates = date.map((v, i) => {
        return v.format(v._format);
      });
      setDates(getDates);
      if (date?.length === 2) {
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
          const date1 = new Date(date[0]);
          const date2 = new Date(date[1]);

          const diffDate = date1.getTime() - date2.getTime();
          const diffDateDay = Math.floor(
            Math.abs(diffDate / (1000 * 60 * 60 * 24))
          );
          noDates.current = `${noDates2.current[0]}~${
            noDates2.current[noDates2.current.length - 1]
          } (${diffDateDay}박)`;
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

        noDates.current = `반납 일자를 정해 주세요`;
      }
    } else {
      noDates.current = [];
    }
  };

  useEffect(() => {
    setDateFormat();
    setPickDate({
      ...pickDate,
      startDate: date[0]?.toLocaleString(),
      endDate: date[1]?.toLocaleString(),
    });
  }, [date]);

  return (
    <div className="calendar_wrap">
      <div className="calendar_box">
        <div className="calendar_title">희망 대여 날짜</div>
        <div className="calendar_input">
          <div className="calendar_input_text">
            {noDates.current?.length > 0 ? noDates.current : ''}
          </div>
        </div>
        <div
          className="calendar_toggleIcon"
          onClick={() => {
            toggleMode();
          }}
        >
          {toggleOn === true ? (
            <HiOutlineChevronUp style={{ margin: 'auto' }} />
          ) : (
            <HiOutlineChevronDown style={{ margin: 'auto' }} />
          )}
        </div>
      </div>
      {toggleOn === true ? (
        <div>
          <Calendar
            // multiple
            range
            value={date}
            onChange={setDate}
            weekDays={weekDays}
            months={months}
            format="YYYY/MM/DD"
            minDate={new Date()}
            maxDate={new Date(today.year, today.month.number + 2, today.day)}
            onMonthChange={(date) => setMonth(new Date(date).getMonth() + 1)}
            shadow={false}
            className="calendar_toggleOn"
            id="prevent"
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DetailCalendar;
