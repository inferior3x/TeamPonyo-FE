import React, { useState } from 'react';
import InfoDatePicker from '../components/InfoDatePicker';
import UploadPoster from '../components/exhibition/UploadPoster';
import './Create.css';
import axiosInstance from '../api/axiosInstance';

const Create = () => {
  const [data, setData] = useState({
    title: '',
    author: '',
    location: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    fee: '',
    contact: '',
    description: '',
    poster: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handlePosterChange = (file) => {
    setData({
      ...data,
      poster: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('location', data.location);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('startTime', data.startTime);
    formData.append('endTime', data.endTime);
    formData.append('fee', data.fee);
    formData.append('contact', data.contact);
    formData.append('description', data.description);
    formData.append('poster', data.poster);


    //Key 확인하기
    for (let key of formData.keys()) {
      console.log("key : " + key);
    }

    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log("value : " + value);
    }
    
    console.log('Form Data:', formData);

    try {
      const response = await axiosInstance.post('', formData);
      console.log('전시 작성 FormData submitted:', response.data);
    } catch (error) {
      console.error('전시 작성 FormData submit 오류', error);
    }
  };

  return (
    <div className='Create'>
      <div className='topContainer'>
        <div className='uploadPoster'>
          <UploadPoster uploadedPoster={data.poster} setUploadedPoster={handlePosterChange} />
        </div>
        <div className='infoContainer'>
          <div className='informationContainer'>
            <div className='infoTitle'>
              <input
                type='text'
                name='title'
                value={data.title}
                onChange={handleChange}
                placeholder='전시 제목'
                className='infoTitleText'
              />
            </div>
            <div className='infoAuthor'>
              <input
                type='text'
                name='author'
                value={data.author}
                onChange={handleChange}
                placeholder='주최'
                className='infoAuthorText'
              />
            </div>
            <div className='infoPlace'>
              장소
              <input
                type='text'
                name='location'
                value={data.location}
                onChange={handleChange}
              />
            </div>
            <div className='infoPeriod'>
              기간
              <input
                type='date'
                name='startDate'
                value={data.startDate}
                onChange={handleChange}
              />
              ~
              <input
                type='date'
                name='endDate'
                value={data.endDate}
                onChange={handleChange}
              />
            </div>
            <div className='infoTime'>
              시간
              <input
                type='time'
                name='startTime'
                value={data.startTime}
                onChange={handleChange}
              />
              ~
              <input
                type='time'
                name='endTime'
                value={data.endTime}
                onChange={handleChange}
              />
            </div>
            <div className='infoPrice'>
              입장료
              <button>무료</button>
              <button>유료</button>
              <input
                type='text'
                name='fee'
                value={data.fee}
                onChange={handleChange}
              />
            </div>
            <div className='infoAsk'>
              전시 문의
              <input
                type='text'
                name='contact'
                value={data.contact}
                onChange={handleChange}
              />
            </div>
            <div className='infoCategory'>
              <div>카테고리 설정</div>
              <button>전시회</button>
              <button>공연</button>
              <button>공모전 및 대회</button>
              <button>기타</button>
            </div>
          </div>
        </div>
      </div>
      <div className='infoDescriptionContainer'>
        <div className='descriptionTitle'>소개</div>
        <div className='descriptionBody'>
          <textarea
            name='description'
            value={data.description}
            onChange={handleChange}
            className='textarea'
          />
        </div>
      </div>
      <div className='infoPhotoContainer'>
        {/* 필요 시 이미지를 추가할 수 있습니다 */}
      </div>
      <div className='infoPlaceContainer'>
        <div className='infoPlaceTitle'>공간 정보</div>
        <div className='infoPlaceBody'></div>
        <div className='infoPlaceMap'>
          {/* 여기 지도 컴포넌트를 추가할 수 있습니다 */}
        </div>
      </div>
      <InfoDatePicker />
      <div className='submitBtn' onClick={handleSubmit}>작성 완료</div>
    </div>
  );
};

export default Create;
