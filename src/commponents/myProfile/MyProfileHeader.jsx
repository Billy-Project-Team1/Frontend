import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfileThunk } from '../../redux/modules/profileSlice';
import profileimg from '../../static/image/profileimg.png';
import './MyProfileHeader.scss';
import { Icon } from '@iconify/react';

const MyProfileHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    dispatch(getProfileThunk(id));
  }, [dispatch]);

  const profile = useSelector((state) => state.myprofile.myProfile);
  // console.log(profile);
  // profileUrl
  // {profile.profileUrl}

  return (
    <div className="myProfileHeader-container">
      <div className="myProfileHeader-wrap">
        <div className="myProfileHeader-imgBox">
          <img src={profileimg} className="myProfileHeader-img" />
        </div>
        <div className="myProfileHeader-rightBox">
          <div className="myProfileHeader-nickname">{profile.nickname}</div>
          <p>{profile.email}</p>
          {userId === profile.userId ? (
            <Icon
              icon="ic:baseline-settings"
              onClick={() => navigate('/modifyprofile')}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfileHeader;
