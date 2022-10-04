// React import
import React from 'react';
// Component import
import Headers2 from '../../commponents/header/Headers2';
// Style & Img import
import './Event.scss';
import billyevent from '../../static/image/billyevent.svg';

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
						<a
							className="event_button_text"
							href="https://docs.google.com/forms/d/e/1FAIpQLSfuJqqv3RkODvM_O_QPss5zlK8LTViTbqUjMD6PenEVvhwe8w/viewform"
						>
							<div>설문조사 참여하기</div>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Event;
