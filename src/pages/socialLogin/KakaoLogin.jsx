import { useEffect } from 'react';
import { api } from '../../shared/api';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { setCookie } from '../../redux/modules/customCookies';

const Kakao = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!code) {
      api
        .get(`/oauth/kakao/callback?code=${code}`)
        .then((res) => {
          if (res.data.success === true) {
            return (
              localStorage.setItem('userId', res.data.result.userId),
              localStorage.setItem('memberId', res.data.result.id),
              localStorage.setItem('accessToken', res.headers.authorization),
              setCookie('refreshToken', res.headers[`refresh-token`]),
              navigate(`/`)
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [code]);
  return <></>;
};

export default Kakao;
