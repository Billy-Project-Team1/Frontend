// React import
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Style & Img & Icon import
import './MainListCard.scss';
import dailycost from '../../static/image/dailycost.svg';
import deposit from '../../static/image/deposit.svg';
import { FaStar } from 'react-icons/fa';

const MainListCard = ({ post }) => {
	const postPrice = post.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	const navigate = useNavigate();

	const postDeposit = post.deposit
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return (
		<div
			className="mainList_wrap"
			onClick={() => navigate(`/detail/${post.id}`)}
		>
			<div className="mainListCard_container">
				<div className="mainListCard_box">
					<img className="mainListCard_img" src={post.imgUrl} />
					<div className="mainListCard_right_container">
						<div className="mainListCard_right_box">
							<div className="mainListCard_title">
								<div>{post.title}</div>
							</div>
							<div className="mainListCard_place">{post.location}</div>
							<div className="mainListCard_bottom_box">
								<div className="mainListCard_price_box">
									<div className="mainListCard_icon_box">
										<img className="mainListCard_icon" src={dailycost} />
									</div>
									{postPrice}원
								</div>
								<div className="mainListCard_price_box">
									<div className="mainListCard_icon_box">
										<img className="mainListCard_icon" src={deposit} />
									</div>
									{postDeposit}원
								</div>
							</div>
							<div className="mainListCard_review">
								<div className="mainListCard_star_box">
									<FaStar className="mainListCard_star" />
								</div>
								&nbsp;
								<div>{post.avg}</div>
								&nbsp;
								<div>({post.reviewCount})</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainListCard;
