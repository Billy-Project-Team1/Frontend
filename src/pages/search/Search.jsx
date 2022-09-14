import React, { useState } from 'react';
import Footer from '../../commponents/footer/Footer';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import './Search.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsXCircle } from 'react-icons/bs';
import {
  getsearchPostsList,
  onRemoveHandler,
} from '../../redux/modules/SearchSlice';
import MainListCard from '../../commponents/mainListCard/MainListCard';
import { useEffect } from 'react';

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
      <div className="SearchWrap">
        <form className="SearchHeader" onSubmit={onSubmitHandler}>
          <div className="SearchHeaderIconBox">
            <HiOutlineChevronLeft
              className="SearchHeaderIcon"
              onClick={() => navigate(-1)}
            />
          </div>
          <input
            className="SearchHeaderInput"
            placeholder="검색어를 입력해주세요."
            onChange={onChange}
            value={inputText}
          />
          {inputText === '' ? (
            ''
          ) : (
            <BsXCircle
              className="SearchHeaderInputXbutton"
              onClick={() => {
                onResetButton();
              }}
            />
          )}
        </form>
      </div>

      {searchPostList.length === 0 ? (
        <div className="SearchEmptyText">
          지역명 + 제품명으로 검색하여 필요한 제품을 찾아보세요! 예) 강남
          자전거, 분당 노트북
        </div>
      ) : (
        <div className="SearchPostList">
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
