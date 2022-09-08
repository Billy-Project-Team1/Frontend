import React from 'react';
import './Headers.scss';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { OverflowMenu, OverflowMenuItem } from '@carbon/react';

const DetailHeader = (props) => {
	const navigate = useNavigate();

	const move = () => {
		navigate('/posting', {
			state: {
				title: '글 쓰기',
				done: '완료',
			},
		});
	};

	return (
		<div className="header_detail_container">
			<div className="header_wrap">
				<div className="header_content">
					<HiOutlineChevronLeft
						style={{ marginRight: '22px' }}
						color="#656565"
						size="24px"
						onClick={() => navigate(-1)}
					/>
					<OverflowMenu ariaLabel="overflow-menu" size="md">
						<OverflowMenuItem itemText="Stop app" />
						<OverflowMenuItem itemText="Restart app" />
						<OverflowMenuItem itemText="Rename app" />
						<OverflowMenuItem itemText="Edit routes and access" requireTitle />
						<OverflowMenuItem hasDivider isDelete itemText="Delete app" />
					</OverflowMenu>
				</div>
			</div>
		</div>
	);
};

export default DetailHeader;
