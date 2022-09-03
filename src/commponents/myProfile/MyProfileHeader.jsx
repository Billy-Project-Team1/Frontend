import React from 'react';
import profileimg from '../../static/image/profileimg.png';
import './MyProfileHeader.scss';

const myProfileHeader = () => {
  return (
    <div className="myProfileHeader-container">
      <div className="myProfileHeader-imgBox">
        <img src={profileimg} className="myProfileHeader-img" />
      </div>
      <div className="myProfileHeader-rightBox">
        <div className="myProfileHeader-nickname">Nickname</div>
        <button className="myProfileHeader-button">Edit</button>
      </div>
    </div>
  );
};

export default myProfileHeader;
