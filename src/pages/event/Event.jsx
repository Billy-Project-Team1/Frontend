import React from 'react';
import Headers2 from '../../commponents/header/Headers2';
import billyevent from '../../static/image/billyevent.svg';
import './Event.scss';

const Event = () => {
  return (
    <>
      <Headers2 />
      <div className="event_wrap">
        <div className="event_main_img_conatiner">
          <img className="event_main_img" src={billyevent} />
        </div>
        <div className="event_button_container">
          <div className="event_button">
            <div className="event_button_text">
              <div>설문조사 참여하기</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
