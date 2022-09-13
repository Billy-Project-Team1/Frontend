import React, { useEffect, useState, useRef } from 'react';
import { Calendar } from 'react-multi-date-picker';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import './Calendar.scss';

const DetailCalendar = ({ data, detailPost }) => {
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
  const [toggleOn, setToggleOn] = useState(false);
  // console.log(date.toLocaleString());
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

  // const disableDate = () => {
  //   const datesArray = [];
  //   data.map((v) => {
  //     if (new Date(v).getMonth() + 1 === month) {
  //       datesArray.push(new Date(v).getDate());
  //     }
  //   });
  //   setUnavailable(datesArray);
  // };
  // dd console.log(unavailable);

  // 00 useEffect(() => {
  //   if (detailPost) {
  //     setUnavailable(data);
  //   }
  // }, []);
  // console.log(unavailable);

  // useEffect(() => {
  //   if (detailPost) {
  //     disableDate(data);
  //   }
  // }, []);

  // useEffect(() => {
  //   let elements = null;
  //   if (toggleOn === true) {
  //     elements = document.querySelectorAll('.calendar-toggleOn.rmdp-day .sd');
  //   } else {
  //     elements = document.querySelectorAll('.calendar-toggleOn.rmdp-day .sd');
  //   }
  //   for (let i = 0; i < elements.length; i++) {
  //     for (let j = 0; j < unavailable.length; j++) {
  //       if (elements[i].innerText / 1 === unavailable[j]) {
  //         elements[i].parentNode.classList.add('rmdp-disabled');
  //       }
  //     }
  //   }
  // });

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

  const blockDate = date.toLocaleString();

  useEffect(() => {
    setDateFormat();
    // setData({
    //   ...data,
    //   blockDateDtoList: [blockDate],
    // });
  }, [date]);

  return (
    <div className="calendar-wrap">
      <div className="calendar-box">
        희망 대여 날짜
        <input
          readOnly
          className="calendar-input"
          onClick={() => {
            toggleMode();
          }}
          style={{ marginLeft: '10px' }}
          value={noDates.current?.length > 0 ? noDates.current : ''}
        />
        <div className="calendar-toggleIcon">
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
            range
            value={date && date}
            onChange={setDate}
            weekDays={weekDays}
            months={months}
            format="YYYY/MM/DD"
            minDate={new Date()}
            maxDate={new Date().setDate(90)}
            onMonthChange={(date) => setMonth(new Date(date).getMonth() + 1)}
            className="calendar-toggleOn"
          />
          <div className="calendar-btns">
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

export default DetailCalendar;
