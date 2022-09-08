import React from 'react';
import { useState, useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { BsCheckSquare, BsCheckSquareFill } from 'react-icons/bs';
import './SignUp.scss';
import { useDispatch } from 'react-redux';
import { apis } from '../../shared/api';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    email: '',
    nickname: '',
    password: '',
    password2: '',
  };

  let [passwordCheck, setPasswordCheck] = useState(false);
  let [emailCheck, setEmailCheck] = useState(false);
  let [emailDuplicate, setEmailDuplicate] = useState(false);
  let [nicknameCheck, setNicknameCheck] = useState(false);

  const [member, setMember] = useState(initialState);

  const nickspe = member.nickname.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  const num = member.password.search(/[0-9]/g);
  const eng = member.password.search(/[a-z]/gi);
  const spe = member.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  // 이메일 유효성 검사
  useEffect(() => {
    if (!emailRegex.test(member.email)) {
      setEmailCheck(false);
    } else {
      setEmailCheck(true);

      // 이메일 중복 검사
      apis
        .checkEmailDuplicate(member.email)
        .then((res) => {
          if (res.data.success === true) {
            setEmailDuplicate(true);
          } else {
            setEmailDuplicate(false);
          }
        })
        .catch((err) => {
          setEmailDuplicate(false);
        });
    }
  }, [member.email]);

  // 닉네임 유효성 검사
  useEffect(() => {
    if (member.nickname.length < 2 || member.nickname.length > 8) {
      setNicknameCheck(false);
    } else if (!nickspe) {
      setNicknameCheck(false);
    } else if (member.nickname.search(/\s/) != -1) {
      setNicknameCheck(false);
    } else if (member.nickname === null) {
      setNicknameCheck(false);
    } else {
      setNicknameCheck(true);
    }
  }, [member.nickname]);

  //패스워드 유효성 검사
  useEffect(() => {
    if (member.password.length > 14) {
      setPasswordCheck(false);
    } else if (member.password.search(/\s/) != -1) {
      setPasswordCheck(false);
    } else if (num < 0 || eng < 0 || spe < 0) {
      setPasswordCheck(false);
    } else if (member.password === null) {
      setPasswordCheck(false);
    } else {
      setPasswordCheck(true);
    }
  }, [member.password]);

  const onSignUpHandler = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const [signUpAgree, setSignUpAgree] = useState(false);

  const onCheckAgreeHandler = () => {
    setSignUpAgree(!signUpAgree);
  };

  const onSubmitHandler = (event) => {
    if (
      emailCheck === false ||
      nicknameCheck === false ||
      passwordCheck === false ||
      emailDuplicate === false ||
      member.password !== member.password2
    ) {
      event.preventDefault();
    } else if (signUpAgree === false) {
      event.preventDefault();
    } else {
      event.preventDefault();
      apis
        .createMember(member)
        .then((res) => {
          if (res.data.success === true) {
            navigate(`/login`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="SignUpWrap">
      <form onSubmit={onSubmitHandler}>
        <div className="SignUpTopName">회원가입</div>
        <div className="SignUpInputBox">
          <div>닉네임</div>
          {member.nickname === '' ? (
            <input
              className="SignUpInput"
              placeholder="2-8자 이내, 특수문자/띄어쓰기 불가"
              name="nickname"
              value={member.nickname}
              onChange={onSignUpHandler}
            />
          ) : nicknameCheck ? (
            <input
              className="SignUpInput"
              placeholder="2-8자 이내, 특수문자/띄어쓰기 불가"
              name="nickname"
              value={member.nickname}
              onChange={onSignUpHandler}
            />
          ) : (
            <input
              className="SignUpInputAlert"
              placeholder="2-8자 이내, 특수문자/띄어쓰기 불가"
              name="nickname"
              value={member.nickname}
              onChange={onSignUpHandler}
            />
          )}

          {member.nickname === '' ? (
            <div className="SignUpAlertText">&nbsp;</div>
          ) : nicknameCheck ? (
            <div className="SignUpAlertText">&nbsp;</div>
          ) : (
            <div className="SignUpAlertText">
              특수문자, 띄어쓰기는 불가하며 2-8자 이내로 입력해주세요.
            </div>
          )}
        </div>
        <div className="SignUpInputBox">
          <div>이메일</div>
          {member.email === '' ? (
            <input
              className="SignUpInput"
              placeholder="이메일 주소 입력"
              name="email"
              value={member.email}
              onChange={onSignUpHandler}
            />
          ) : emailCheck ? (
            emailDuplicate ? (
              <input
                className="SignUpInput"
                placeholder="이메일 주소 입력"
                name="email"
                value={member.email}
                onChange={onSignUpHandler}
              />
            ) : (
              <input
                className="SignUpInputAlert"
                placeholder="이메일 주소 입력"
                name="email"
                value={member.email}
                onChange={onSignUpHandler}
              />
            )
          ) : (
            <input
              className="SignUpInputAlert"
              placeholder="이메일 주소 입력"
              name="email"
              value={member.email}
              onChange={onSignUpHandler}
            />
          )}
          {member.email === '' ? (
            <div className="SignUpAlertText">&nbsp;</div>
          ) : emailCheck ? (
            emailDuplicate ? (
              <div className="SignUpAlertText">&nbsp;</div>
            ) : (
              <div className="SignUpAlertText">
                이미 가입된 이메일 주소입니다.
              </div>
            )
          ) : (
            <div className="SignUpAlertText">
              이메일 형식이 올바르지 않습니다
            </div>
          )}
        </div>
        <div className="SignUpInputBox">
          <div>비밀번호</div>
          {member.password === '' ? (
            <input
              className="SignUpInput"
              type="password"
              placeholder="영문, 숫자, 특수기호 포함하여 14자 이내"
              name="password"
              value={member.password}
              onChange={onSignUpHandler}
            />
          ) : passwordCheck ? (
            <input
              className="SignUpInput"
              type="password"
              placeholder="영문, 숫자, 특수기호 포함하여 14자 이내"
              name="password"
              value={member.password}
              onChange={onSignUpHandler}
            />
          ) : (
            <input
              className="SignUpInputAlert"
              type="password"
              placeholder="영문, 숫자, 특수기호 포함하여 14자 이내"
              name="password"
              value={member.password}
              onChange={onSignUpHandler}
            />
          )}

          {member.password === '' ? (
            <div className="SignUpAlertText">&nbsp;</div>
          ) : passwordCheck ? (
            <div className="SignUpAlertText">&nbsp;</div>
          ) : (
            <div className="SignUpAlertText">
              영문, 숫자, 특수기호를 포함하여 14자 이내로 입력해주세요.
            </div>
          )}
        </div>
        <div className="SignUpInputBox">
          <div>비밀번호 확인</div>
          {member.password2 === '' ? (
            <input
              className="SignUpInput"
              type="password"
              placeholder="비밀번호와 동일하게 입력"
              name="password2"
              value={member.password2}
              onChange={onSignUpHandler}
            />
          ) : member.password === member.password2 ? (
            <input
              className="SignUpInput"
              type="password"
              placeholder="비밀번호와 동일하게 입력"
              name="password2"
              value={member.password2}
              onChange={onSignUpHandler}
            />
          ) : (
            <input
              className="SignUpInputAlert"
              type="password"
              placeholder="비밀번호와 동일하게 입력"
              name="password2"
              value={member.password2}
              onChange={onSignUpHandler}
            />
          )}

          {member.password2 === '' ? (
            <div className="SignUpAlertText">&nbsp;</div>
          ) : member.password === member.password2 ? (
            <div className="SignUpAlertText">&nbsp;</div>
          ) : (
            <div className="SignUpAlertText">비밀번호와 동일하지 않습니다.</div>
          )}
        </div>
        <div className="SignUpAgreeBox">
          <div className="SignUpAgreeLeft">
            {!signUpAgree ? (
              <div className="SignUpAgreeLeft1">
                <BsCheckSquare
                  className="BsCheckSquareOpacity"
                  onClick={() => onCheckAgreeHandler()}
                />
              </div>
            ) : (
              <div className="SignUpAgreeLeft1">
                <BsCheckSquareFill
                  className="BsCheckSquareFill"
                  onClick={() => onCheckAgreeHandler()}
                />
              </div>
            )}

            <div className="SignUpEssential">
              [필수] 서비스 이용약관 및 개인정보 수집 이용에 동의
            </div>
          </div>
          <div className="SignUpAdd">보기</div>
        </div>
        <button className="SignUpButton">완료</button>
      </form>
    </div>
  );
};

export default SignUp;
