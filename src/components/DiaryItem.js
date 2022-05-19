import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from './AppButton';

const DiaryItem = ({ id, emotion, content, date }) => {
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="diary-item">
      <div
        className={['emotion-box', `emotion${emotion}`].join(' ')}
        onClick={goDetail}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt=""
        ></img>
      </div>
      <div className="content-box" onClick={goDetail}>
        <p className="diary-date">{strDate}</p>
        <p className="diary-content">{content.slice(0, 100)}</p>
      </div>
      <div className="btn-box">
        <AppButton text={'수정하기'} onClick={goEdit} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
