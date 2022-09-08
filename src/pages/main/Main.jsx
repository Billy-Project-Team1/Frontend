import React, { useEffect } from 'react';
import MainHeader from '../../commponents/header/MainHeader';
import './Main.scss';
import Footer from '../../commponents/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { _postsList } from '../../redux/modules/postsSlice';
import MainListCard from '../../commponents/mainListCard/MainListCard';
import { useInView } from 'react-intersection-observer';

const Main = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const SIZE = 4;

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

  const postList = useSelector((state) => state.posts.postsList);

  return (
    <div>
      <MainHeader />
      <div className="MainBodyContainer">
        {postList.map((post) => {
          return <MainListCard post={post} key={post.id} />;
        })}
      </div>
      <div ref={ref}></div>
      <Footer />
    </div>
  );
};

export default Main;
