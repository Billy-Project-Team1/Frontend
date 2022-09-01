import React, { useRef, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import kakaoLoginimg from '../../static/image/kakao_login_original.png';
import { apis } from '../../shared/api';
import { KAKAO_AUTH_URL } from '../../shared/socialAuth';
import { Cookies } from 'react-cookie';
import './Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordView, setPasswordView] = useState('password');
  const cookies = new Cookies();

  const onVisablePassword = () => {
    setPasswordView('text');
  };
  const onDisVisablePassword = () => {
    setPasswordView('password');
  };
  const email_ref = useRef(null);
  const pw_ref = useRef(null);

  const Loginform = (event) => {
    const email = email_ref.current.value;
    const password = pw_ref.current.value;
    if (email_ref.current.value == '' || pw_ref.current.value == '') {
      event.preventDefault();
      alert('아이디와 비밀번호를 입력해주세요');
    } else {
      apis
        .loginMember({ email, password })
        .then((res) => {
          if (res.data.success === true) {
            return (
              console.log(res),
              localStorage.setItem('accessToken', res.headers.authorization),
              cookies.set('refreshToken', res.headers[`refresh-token`])
            );
          }
        })
        .catch((err) => {
          window.alert(err.response.data.message);
        });
    }
  };
  console.log(KAKAO_AUTH_URL)

  return (
    <div className="LoginWrap">
      <div className="LoginBackKey">
        <IoArrowBack />
      </div>
      <div className="LoginTopName"></div>
      <div className="LoginEmailBox">
        <div>이메일</div>
        <input
          ref={email_ref}
          className="LoginEmailInput"
          placeholder="이메일을 입력해주세요"
        />
      </div>
      <div className="LoginPassword">
        <div>비밀번호</div>
        <div className="LoginPasswordBox">
          <input
            ref={pw_ref}
            type={passwordView}
            className="LoginPasswordInput"
            placeholder="비밀번호를 입력해주세요"
          />
          <div className="LoginPasswordEye">
            {passwordView === 'text' ? (
              <AiFillEyeInvisible onClick={onDisVisablePassword} />
            ) : (
              <AiFillEye onClick={onVisablePassword} />
            )}
          </div>
        </div>
        <button className="LoginButton" onClick={Loginform}>
          로그인
        </button>
        <a className="LoginKakao" href={KAKAO_AUTH_URL}>
          <div className="LoginKakaoBox" >
            <img src={kakaoLoginimg} className="KakaoLoginImg" />
            <div className="LoginKakaoTitle">
              카카오로 로그인하기
            </div>
          </div>
        </a>
        <div className="LoginFindBox">
          <div className="LoginFind">빌리가 처음 이신가요?</div>
          <div className="LoginFindNavi" onClick={() => navigate(`/signup`)}>
            회원가입
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
