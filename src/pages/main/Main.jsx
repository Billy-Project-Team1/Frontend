// React import
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux import
import { useDispatch, useSelector } from 'react-redux';
import { _postsList } from '../../redux/modules/postsSlice';
// Component import
import MainHeader from '../../commponents/header/MainHeader';
import Footer from '../../commponents/footer/Footer';
import MainListCard from '../../commponents/mainListCard/MainListCard';
// Style & Img import
import './Main.scss';
import eventbanner from '../../static/image/eventbanner.svg';
// Package import
import { useInView } from 'react-intersection-observer';

const Main = () => {
	const dispatch = useDispatch();
	const [ref, inView] = useInView();
	const navigate = useNavigate();
	const SIZE = 7;

	useEffect(() => {
		if (postList.length === 0) {
			dispatch(
				_postsList({
					params: {
						size: SIZE,
						lastPostId: Number.MAX_SAFE_INTEGER,
					},
				})
			);
		}
	}, []);
	const postList = useSelector((state) => state.posts.postsList);

	useEffect(() => {
		if (postList.length !== 0 && inView) {
			dispatch(
				_postsList({
					params: {
						lastPostId: postList[postList.length - 1].id,
						size: SIZE,
					},
				})
			);
		}
	}, [inView]);

	return (
		<div>
			<MainHeader />
			<div className="main_body_container">
				<img
					src={eventbanner}
					style={{ cursor: 'pointer' }}
					onClick={() => navigate('/event')}
				/>
				{postList.map((post) => {
					return <MainListCard post={post} key={post.id} />;
				})}
				<div ref={ref}></div>
			</div>
			<Footer />
		</div>
	);
};

export default Main;
