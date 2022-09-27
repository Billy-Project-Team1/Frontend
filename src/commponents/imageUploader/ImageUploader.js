// React import
import React, { useEffect, useState } from 'react';

// Package import
import { useDispatch } from 'react-redux';
import { uploadToDB } from '../../redux/modules/image';
import upload_image from '../../static/image/upload_image.svg';
import { FaMinusCircle } from 'react-icons/fa';

import './ImageUploader.scss';

const ImageUploader = ({ img, setImg }) => {
  const dispatch = useDispatch();
  const inputRef = React.useRef();

  const [imgUrl, setImgUrl] = useState([]); // url

  useEffect(() => {
    setImgUrl(img);
  }, []);

  const change = (event) => {
    // 이미지 최대갯수
    const maxFileNum = 10;

    // 선택한 이미지들
    const images = event.target.files;

    // 최대갯수로 받은 이미지
    const imagesMax10 = [...images].slice(0, maxFileNum);
    console.log(imagesMax10);
    setImg([...img, ...imagesMax10]);

    // 이미지 미리보기로 보여줄려면 url이 필요함
    for (let i = 0; i < imagesMax10.length; i++) {
      imgUrl.push(URL.createObjectURL(imagesMax10[i]));
    }
    if (imagesMax10 > 10) {
      alert('10장 초과 노노');
      return;
    }
  };

  //img 삭제
  const removeImage = (payload) => {
    let removeList = imgUrl.splice(payload, 1);
    let newList = imgUrl.filter((item) => {
      return item !== removeList;
    });
    setImgUrl(newList);

    let removeFile = img.splice(payload, 1);
    let newFile = img.filter((item) => {
      return item !== removeFile;
    });
    setImg(newFile);
  };

  return (
    <div className="imgUploader_container">
      <div className="imgUploader_box">
        <img
          src={upload_image}
          style={{ width: '85px' }}
          onClick={() => inputRef.current.click()}
        />

        <input
          id="imgup"
          ref={inputRef}
          onChange={(event) => change(event)}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
        />
      </div>

      <div className="preview_img_container">
        {imgUrl.map((item, index) => (
          <div className="preview_container" key={index}>
            <img className="preview_img" src={item} alt="" />
            <FaMinusCircle
              className="preview_del"
              onClick={() => removeImage(index)}
            />
          </div>
        ))}
        <div></div>
      </div>
    </div>
  );
};

export default ImageUploader;
