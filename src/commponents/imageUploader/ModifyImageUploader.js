// React import
import React, { useEffect, useState } from 'react';
// Image import
import upload_image from '../../static/image/upload_image.svg';
// Icon import
import { FaMinusCircle } from 'react-icons/fa';
// Style import
import './ImageUploader.scss';
import imageCompression from 'browser-image-compression'; 

const ModifyImageUploader = ({ img, setImg, setImgUrl, imgUrl }) => {
  const inputRef = React.useRef();
  const [modiftyImgUrl, setModifyImgUrl] = useState([]);

  useEffect(() => {
    setImgUrl(img);
  }, []);

  const handleFileOnChange = async (file) => {
    const options = { maxSizeMB: 1, maxWidthOrHeight: 420 };
    try {
      const compressedFile = await imageCompression(file, options);
      const resultFile = new File([compressedFile], compressedFile.name, {
        type: compressedFile.type,
      });
      return resultFile;
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUrlOnChange = async (compressedFile) => {
    try {
      const url = await imageCompression.getDataUrlFromFile(compressedFile);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const change = async (event) => {
    let fileArr = event.target.files; //  사용자가 선택한 파일들
    let postImagesLength = img.length;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length; // 최대 10개
    if (postImagesLength + filesLength > 10) {
      alert('이미지는 10장을 초과할 수 없습니다.');
      return;
    }
    // resize해서 파일 처리하기
    for (let i = 0; i < filesLength; i++) {
      let newFile = await handleFileOnChange(fileArr[i]);
      let newFileURL = await handleUrlOnChange(newFile);
      setImg((file) => [...file, newFile]);
      setModifyImgUrl((url) => [...url, newFileURL]);
    }
  };

  //img 삭제
  const removeImage = (payload) => {
    let removeList = modiftyImgUrl.splice(payload, 1);
    let newList = modiftyImgUrl.filter((item) => {
      return item !== removeList;
    });
    setModifyImgUrl(newList);

    let removeFile = img.splice(payload, 1);
    let newFile = img.filter((item) => {
      return item !== removeFile;
    });
    setImg(newFile);
  };
  const removeImageUrl = (payload) => {
    let removeList = imgUrl.splice(payload, 1);
    let newList = imgUrl.filter((item) => {
      return item !== removeList;
    });
    setImgUrl(newList);
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
              onClick={() => removeImageUrl(index)}
            />
          </div>
        ))}

        {modiftyImgUrl.map((item, index) => (
          <div className="preview_container" key={index}>
            <img className="preview_img" src={item} alt="" />
            <FaMinusCircle
              className="preview_del"
              onClick={() => removeImage(index)}
            />
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default ModifyImageUploader;
