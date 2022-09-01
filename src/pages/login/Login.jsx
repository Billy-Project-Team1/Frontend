import React, { useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import kakaoLoginimg from "../../static/image/kakao_login_original.png";
import "./Login.scss";
import { loginMemberDB } from "../../redux/modules/memberSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordView, setPasswordView] = useState("password");

  const onVisablePassword = () => {
    setPasswordView("text");
  };
  const onDisVisablePassword = () => {
    setPasswordView("password");
  };
  const email_ref = useRef(null);
  const pw_ref = useRef(null);

  const Loginform = (event) => {
    const email = email_ref.current.value;
    const password = pw_ref.current.value;
    if (email_ref.current.value == "" || pw_ref.current.value == "") {
      event.preventDefault();
      alert("아이디와 비밀번호를 입력해주세요");
    } else {
      event.preventDefault();
      dispatch(loginMemberDB({ email, password })).then((res) => {
        console.log(res);
      })
      .catch((err)=>{
        console.log(err)
      });
    }
  };

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
            {passwordView === "text" ? (
              <AiFillEyeInvisible onClick={onDisVisablePassword} />
            ) : (
              <AiFillEye onClick={onVisablePassword} />
            )}
          </div>
        </div>
        <button className="LoginButton" onClick={Loginform}>
          로그인
        </button>
        <button className="LoginKakao">
          <div className="LoginKakaoBox">
            <img src={kakaoLoginimg} className="KakaoLoginImg" />
            <div className="LoginKakaoTitle">카카오로 로그인하기</div>
          </div>
        </button>
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
