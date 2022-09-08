import { slice } from 'lodash';
import React from 'react';
import { useState } from 'react';

// import { imgActions } from '../../redux/modules/image';
import { useDispatch, useSelector } from 'react-redux';
import { uploadToDB } from '../../redux/modules/image';
import upload_image from '../../static/image/upload_image.svg';

// import './ImageUploader.scss';

const ImageUploader = (props) => {
	const dispatch = useDispatch();
	const inputRef = React.useRef();
	const is_edit = props.is_edit;

	const [img, setImg] = useState([]); // file
	const [imgUrl, setImgUrl] = useState([]); // url

	const change = (event) => {
		// 이미지 최대갯수
		const maxFileNum = 10;

		// 선택한 이미지들
		const images = event.target.files;
		console.log(images);

		// 최대갯수로 받은 이미지
		const imagesMax10 = [...images].slice(0, maxFileNum);
		console.log(imagesMax10);
		setImg(imagesMax10);

		// 이미지 미리보기로 보여줄려면 url이 필요함
		const imgUrlList = [];
		for (let i = 0; i < imagesMax10.length; i++) {
			imgUrlList.push(URL.createObjectURL(imagesMax10[i]));
		}
		setImgUrl(imgUrlList);
	};

	const sendData = () => {
		console.log('sendData');

		let formData = new FormData();

		const postData = {
			title: '맥북쓰고싶은분~',
			content: '새 맥북이 생겨서 올려봅니다 깨끗하게 써주시',
			price: 10000,
			deposit: 100000,
			location: '상봉동',
			latitude: '33.45050036271282',
			longitude: '126.57007065166688',
		};
		formData.append(
			'postUploadRequestDto',
			new Blob([JSON.stringify(postData)])
		);

		const date = ['2022-09-22', '2022-10-22'];

		for (let i = 0; i < date.length; i++) {
			formData.append('blockDateDtoList', date[i]);
		}

		for (let i = 0; i < img.length; i++) {
			formData.append('files', img[i]);
		}

		dispatch(uploadToDB(formData));
	};

	React.useEffect(() => {
		// console.log(imgUrl);
		return () => {
			// dispatch(imgActions.reset());
		};
	}, [imgUrl]);

	// const edit = () => {
	// 	const file = inputRef.current.files[0];
	// 	if (file) {
	// 		dispatch(imgActions.uploading());
	// 		const formdata = new FormData();
	// 		formdata.append('file', file);
	// 		formdata.append('video', null);
	// 		dispatch(imgActions.uploadToDB(formdata));
	// 		if (count !== 0) {
	// 			dispatch(imgActions.uploading());
	// 		}
	// 		return;
	// 	}
	// 	console.log('Not get');
	// };

	return (
		<div style={{ padding: '8px 0', display: 'flex' }}>
			<div className="ElLabel" htmlFor="imgup">
				<div styleName="UpImg" src={upload_image} />
				{/* <img src={picture}></img> */}
			</div>

			<img src={upload_image} style={{ width: '85px' }}></img>
			<input
				id="imgup"
				ref={inputRef}
				onChange={(event) => change(event)}
				type="file"
				accept="image/*"
				multiple={!is_edit}
				// style={{ display: 'none' }}
			/>
			{imgUrl.map((item) => (
				<img
					src={item}
					alt=""
					style={{
						width: '85px',
						height: '85px',
						marginRight: '10px',
						display: 'flex',
					}}
				/>
			))}

			<button onClick={sendData}>전송</button>
			{/* {preview && (
               <div className="WhiteSpace">
                  {preview.map((p, i) => {
                     return (
                        <div className="Frame" key={i}>
                           <div className="Elpreview" src={p} />
                           <div
                              className="Elex"
                              onClick={() => {
                                 dispatch(imgActions.delImage(i));
                              }}
                           >
                              <div className="SlashL" />
                              <div className="SlashR" />
                           </div>
                        </div>
                     );
                  })}
               </div>
            )} */}
		</div>
	);
};

export default ImageUploader;
