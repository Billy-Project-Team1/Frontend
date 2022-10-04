// React import
import React from 'react';
// Component import
import JullyReservationCard from './JullyReservationCard';

const JullyReservation = ({ reservationsState, setMyPageState }) => {
	if (reservationsState === '1') {
		return (
			<div>
				<JullyReservationCard
					jullyState={reservationsState}
					setMyPageState={setMyPageState}
				/>
			</div>
		);
	} else if (reservationsState === '2') {
		return (
			<div>
				<JullyReservationCard jullyState={reservationsState} />
			</div>
		);
	} else if (reservationsState === '4') {
		return (
			<div>
				<JullyReservationCard jullyState={reservationsState} />
			</div>
		);
	} else if (reservationsState === '5') {
		return (
			<div>
				<JullyReservationCard jullyState={reservationsState} />
			</div>
		);
	} else if (reservationsState === '3') {
		return (
			<div>
				<JullyReservationCard jullyState={reservationsState} />
			</div>
		);
	} else {
		return '';
	}
};

export default JullyReservation;
