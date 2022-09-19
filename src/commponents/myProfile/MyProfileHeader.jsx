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
  }, []);

  const profile = useSelector((state) => state.myprofile.myProfile);
  console.log(profile);
  return (
    <>
      <div className="myProfileHeader_container">
        <div className="myProfileHeader_wrap">
          <div className="myProfileHeader_img_box">
            <img
              src={profile.profileUrl ? profile.profileUrl : profileimg}
              className="myProfileHeader_img"
            />
          </div>
          <div className="myProfileHeader_right_box">
            <div className="myProfileHeader_right_topbox">
              <div className="myProfileHeader_nickname">{profile.nickname}</div>
              {userId === profile.userId ? (
                <div className="myProfileHeader_icon">
                  <Icon
                    icon="ic:baseline-settings"
                    onClick={() => navigate('/modifyprofile')}
                    className="myProfileHeader_setting_btn"
                  />
                </div>
              ) : (
                ''
              )}
            </div>

            <p>{profile.email} </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfileHeader;
