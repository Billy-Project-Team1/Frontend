import React, { useEffect, useState, useRef } from 'react';
import { Calendar } from 'react-multi-date-picker';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import './Calendar.scss';

const DetailCalendar = ({ data, pickDate, setPickDate }) => {
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
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [date, setDate] = useState([]);
  const [dates, setDates] = useState();
  const [unavailable, setUnavailable] = useState([]);
  const [toggleOn, setToggleOn] = useState(true);
  console.log(date.toLocaleString());
  // data={detailPost.blockDate?.blockDateList[0]}

  const toggleMode = () => {
    setToggleOn((toggleOn) => !toggleOn);
  };
  const deleteDates = () => {
    setDate([]);
    setDates();
    noDates.current = [];
  };
  console.log(data);
  // .getMonth() + 1 === month
  const disableDate = () => {
    const datesArray = [];
    data.map((v) => {
      if (new Date(v)) {
        datesArray.push(new Date(v).getDate());
      }
    });
    setUnavailable(datesArray);
  };
  console.log(unavailable);

  useEffect(() => {
    const elements = document.querySelectorAll('.rmdp-day');
    // console.log(elements[5].innerText)
    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < unavailable.length; j++) {
        if (elements[i].innerText / 1 === unavailable[j]) {
          elements[i].parentNode.classList.add('.rmdp-day. rmdp-disabled');
        }
      }
    }
  }, [unavailable]);

  // // useEffect(() => {
  // //   if (detailPost) {
  // //     setUnavailable(data);
  // //   }
  // // }, []);
  // // console.log(unavailable);

  // useEffect(() => {
  //   if (detailPost) {
  //     disableDate(data);
  //   }
  // }, []);

  // console.log(unavailable);

  // useEffect(() => {
  //   if (detailPost) {
  //     disableDate(data);
  //   }
  // }, []);

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
            value={date & data}
            onChange={setDate}
            weekDays={weekDays}
            months={months}
            format="YYYY/MM/DD"
            minDate={new Date()}
            maxDate={new Date().setDate(90)}
            onMonthChange={(date) => setMonth(new Date(date).getMonth() + 1)}
            className="calendar_toggleOn"
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DetailCalendar;
