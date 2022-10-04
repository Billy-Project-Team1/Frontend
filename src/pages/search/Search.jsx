// React import
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Redux import
import { useDispatch, useSelector } from 'react-redux';
import {
	getsearchPostsList,
	onRemoveHandler,
} from '../../redux/modules/SearchSlice';
// Component import
import Footer from '../../commponents/footer/Footer';
import MainListCard from '../../commponents/mainListCard/MainListCard';
// Style & icon import
import './Search.scss';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';

const Search = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [inputText, setInputText] = useState('');
	const onChange = (e) => {
		setInputText(e.target.value);
	};
	const onResetButton = () => {
		setInputText('');
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(getsearchPostsList({ inputText }));
	};
	useEffect(() => {
		dispatch(onRemoveHandler());
	}, []);

	const searchPostList = useSelector((state) => state.searchPost.postsList);

	return (
		<>
			<div className="search_wrap">
				<form className="search_header" onSubmit={onSubmitHandler}>
					<div className="search_header_icon_box">
						<HiOutlineChevronLeft
							style={{ cursor: 'pointer' }}
							className="search_header_icon"
							onClick={() => navigate(-1)}
						/>
					</div>
					<input
						className="search_header_input"
						placeholder="검색어를 입력해주세요."
						onChange={onChange}
						value={inputText}
					/>
					{inputText === '' ? (
						''
					) : (
						<FiX
							className="search_header_input_xbutton"
							onClick={() => {
								onResetButton();
							}}
						/>
					)}
				</form>
			</div>

			{searchPostList.length === 0 ? (
				<div className="search_empty_text">
					👉🏻 지역명, 제품명을 검색하여 필요한 제품을 찾아보세요! <br /> 예) 강남
					자전거, 분당 노트북
				</div>
			) : (
				<div className="search_post_list">
					{searchPostList.map((post) => {
						return <MainListCard post={post} key={post.id} />;
					})}
				</div>
			)}
			<Footer />
		</>
	);
};

export default Search;
