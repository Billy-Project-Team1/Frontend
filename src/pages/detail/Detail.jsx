import React from 'react';
import { useLocation } from 'react-router-dom';
import DetailHeader from '../../commponents/header/DetailHeader';
import './Detail.scss';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';

const Detail = () => {
	return (
		<div className="detail_container">
			<DetailHeader></DetailHeader>
			
		</div>
	);
};

export default Detail;
