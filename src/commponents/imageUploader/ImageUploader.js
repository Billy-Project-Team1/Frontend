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

	useEffect(()=>{
		setImgUrl(img)
	},[])

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
		for (let i = 0; i < imagesMax10.length; i++) {
			imgUrl.push(URL.createObjectURL(imagesMax10[i]));
		}
		if (imagesMax10 > 10) {
			alert('10장 초과 노노');
			return;
		}
	};

	// console.log(img)

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

		dispatch(uploadToDB(formData));
	};

	React.useEffect(() => {
		// console.log(imgUrl);
		return () => {
			// dispatch(imgActions.reset());
		};
	}, [imgUrl]);

	//img 삭제
	const removeImage = (payload) => {
		let removeList = imgUrl.splice(payload, 1)
		let newList = imgUrl.filter((item)=>{
			return item !== removeList
		})
		setImgUrl(newList)

		let removeFile = img.splice(payload,1)
		let newFile = img.filter((item)=>{
			return item !== removeFile
		})
		setImg(newFile)
	};

	return (
		<div className="imgUploader_container">
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
