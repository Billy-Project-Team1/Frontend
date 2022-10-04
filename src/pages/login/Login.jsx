// React import
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
// Redux import
import { useDispatch } from 'react-redux';
import { setCookie } from '../../redux/modules/customCookies';
// Component import
import Headers3 from '../../commponents/header/Headers3';
// Style & Img & Icon import
import './Login.scss';
import kakaoLoginimg from '../../static/image/kakao_login_original.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// Shared import
import { apis } from '../../shared/api';
import { KAKAO_AUTH_URL } from '../../shared/socialAuth';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [passwordView, setPasswordView] = useState('password');
	const [doNotAccess, setDoNotAccess] = useState(true);
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
							localStorage.setItem('nickname', res.data.result.nickname),
							localStorage.setItem('memberId', res.data.result.id),
							localStorage.setItem('userId', res.data.result.userId),
							localStorage.setItem('accessToken', res.headers.authorization),
							setCookie('refreshToken', res.headers[`refresh-token`]),
							navigate(`/`)
						);
					}
				})
				.catch((err) => {
					setDoNotAccess(false);
				});
		}
	};

	return (
		<>
			<Headers3 />
			<div className="login_wrap">
				<div className="login_email_box">
					<div>이메일</div>
					<input
						ref={email_ref}
						className="login_email_input"
						placeholder="이메일을 입력해주세요"
					/>
				</div>
				<div className="login_password">
					<div>비밀번호</div>
					<div className="login_password_box">
						{doNotAccess ? (
							<input
								ref={pw_ref}
								type={passwordView}
								className="login_password_input"
								placeholder="비밀번호를 입력해주세요"
							/>
						) : (
							<input
								ref={pw_ref}
								type={passwordView}
								className="login_password_input_alert"
								placeholder="비밀번호를 입력해주세요"
							/>
						)}

						<div className="login_password_eye">
							{passwordView === 'text' ? (
								<FaEyeSlash onClick={onDisVisablePassword} />
							) : (
								<FaEye onClick={onVisablePassword} />
							)}
						</div>
					</div>
					{doNotAccess ? (
						<div className="login_alert_text1">&nbsp;</div>
					) : (
						<div className="login_alert_text">
							아이디 혹은 비밀번호를 다시 확인하세요.
						</div>
					)}
				</div>
				<button className="login_button" onClick={Loginform}>
					로그인
				</button>
				<a className="login_kakao" href={KAKAO_AUTH_URL}>
					<div className="login_kakao_box">
						<img src={kakaoLoginimg} className="kakao_login_img" />
						<div className="login_kakao_title">카카오로 로그인하기</div>
					</div>
				</a>
				<div className="login_find_box">
					<div className="login_find">빌리가 처음 이신가요?</div>
					<div className="login_find_navi" onClick={() => navigate(`/signup`)}>
						회원가입 🎉
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
