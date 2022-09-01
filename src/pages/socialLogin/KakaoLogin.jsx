import { useEffect } from 'react';
import { api } from '../../shared/api';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Kakao = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!code) {
      api.get(`/oauth/kakao/callback?code=${code}`).then((res) => {
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }, [code]);
  return <></>;
};

export default Kakao;
