import React, { useState } from 'react';
import InfoDatePicker from '../components/InfoDatePicker';
import UploadPoster from '../components/exhibition/UploadPoster';
import './Create.css';
import axiosInstance from '../api/axiosInstance';
import UploadFile from '../components/exhibition/UploadFile';
import  '../components/exhibition/exhibitionCommon.css';

const Create = () => {
  const [data, setData] = useState({
    title: '',
    category: '',
    author: '',
    address: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    fee: '',
    contact: '',
    description: '',
    poster: null,
    photos: []
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

  const handleFilesSelect = (files) => {
    setData({
      ...data,
      photos: [...data.photos, ...files],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('poster_url', data.poster);
    formData.append('exhibit_category', data.category);
    formData.append('title', data.title);
    formData.append('address', data.address);
    formData.append('open_times', data.startTime + ' ~ ' + data.endTime)
    formData.append('fee', data.fee);
    formData.append('contact', data.contact);
    formData.append('description', data.description);
    // 여러 개의 사진 파일을 FormData에 추가
    data.photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo);
    });
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    

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
                className='inputSmall'
              />
            </div>
            <div className='infoPeriod'>
              기간
              <input
                type='date'
                name='startDate'
                value={data.startDate}
                onChange={handleChange}
                className='inputSmall'
              />
              ~
              <input
                type='date'
                name='endDate'
                value={data.endDate}
                onChange={handleChange}
                className='inputSmall'
              />
            </div>
            <div className='infoTime'>
              시간
              <input
                type='time'
                name='startTime'
                value={data.startTime}
                onChange={handleChange}
                className='inputSmall'
              />
              ~
              <input
                type='time'
                name='endTime'
                value={data.endTime}
                onChange={handleChange}
                className='inputSmall'
              />
            </div>
            <div className='infoPrice'>
              입장료
              <div className='smallBtn'>무료</div>
              <div className='smallBtn'>유료</div>
              <input
                type='text'
                name='fee'
                value={data.fee}
                onChange={handleChange}
                className='inputSmall inputFee'
              />
            </div>
            <div className='infoAsk'>
              전시 문의
              <input
                type='text'
                name='contact'
                value={data.contact}
                onChange={handleChange}
                className='inputSmall'
              />
            </div>
            <div className='infoCategory'>
              <div>카테고리 설정</div>
              <div className='smallBtn'>전시회</div>
              <div className='smallBtn'>공연</div>
              <div className='smallBtn'>공모전 및 대회</div>
              <div className='smallBtn'>기타</div>
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
          {!data.description && (
            <div className='descriptionPlaceholder'>
              소개를 작성해주세요. 온전은 모두의 온전한 경험을 위해 이용규칙을 제정하여 운영하고 있습니다.{'\n'}
              위반 시 게시물이 삭제되며 계정 이용이 일정 기간 제한될 수 있습니다.{'\n'}
              {'\n'}
              = 저작권 위반 금지{'\n'}
              ∙타인의 전시 및 작품 등을 허락 없이 게시하는 행위{'\n'}
              {'\n'}
              = 불법촬영물 유통 금지{'\n'}
              - 불법촬영물 등을 게재할 경우 전기통신사업법에 따라 삭제 조치 및 서비스 이용이 영구적으로 제한될 수 있으며 관련 법률에 따라 처벌 받을 수 있습니다.{'\n'}
              {'\n'}
              = 그 밖의 규칙 위반{'\n'}
              - 타인의 권리를 침해하거나 불쾌감을 주는 행위{'\n'}
              - 범죄, 불법 행위 등 법령을 위반하는 행위{'\n'}
              - 음란물, 성적 수치심을 유발하는 행위{'\n'}
            </div>
          )}
        </div>
        <UploadFile selectedFiles={data.photos} onFilesSelect={handleFilesSelect} />
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
