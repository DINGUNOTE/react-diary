import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import AppButton from '../components/AppButton';
import AppHeader from '../components/AppHeader';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const Diary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find(
        it => parseInt(it.id) === parseInt(id),
      );
      if (targetDiary) {
        // 일기가 존재할 때
        setData(targetDiary);
      } else {
        // 일기가 없을 때
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, diaryList]);

  if (!data) {
    return <div className="diary-page">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      it => parseInt(it.emotionId) === parseInt(data.emotion),
    );

    console.log(curEmotionData);

    return (
      <div className="diary-page">
        <AppHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftElement={
            <AppButton text={'뒤로가기'} onClick={() => navigate(-1)} />
          }
          rightElement={
            <AppButton
              text={'수정하기'}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <section>
          <h3>오늘의 감정</h3>
          <div className={['emotion-box', `emotion${data.emotion}`].join(' ')}>
            <img src={curEmotionData.emotionImg} alt="" />
            <div className="emotion-descript">
              {curEmotionData.emotionDescript}
            </div>
          </div>
        </section>
        <section>
          <h3>오늘의 일기</h3>
          <div className="content-box">
            <p>{data.content}</p>
          </div>
        </section>
      </div>
    );
  }
};

export default Diary;
