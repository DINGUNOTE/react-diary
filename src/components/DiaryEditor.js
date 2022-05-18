import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppButton from './AppButton';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from '../App';

const getStringDate = date => {
  return date.toISOString().slice(0, 10);
};

const emotionList = [
  {
    emotionId: 1,
    emotionImg: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotionDescript: '매우 좋음',
  },
  {
    emotionId: 2,
    emotionImg: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotionDescript: '좋음',
  },
  {
    emotionId: 3,
    emotionImg: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotionDescript: '보통',
  },
  {
    emotionId: 4,
    emotionImg: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotionDescript: '나쁨',
  },
  {
    emotionId: 5,
    emotionImg: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotionDescript: '매우 나쁨',
  },
];

const DiaryEditor = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const { onCreate } = useContext(DiaryDispatchContext);

  const handleEmote = emotion => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    onCreate(date, content, emotion);
    navigate('/', { replace: true });
  };

  return (
    <div className="diary-editor">
      <AppHeader
        headText={'새 일기 쓰기'}
        leftElement={
          <AppButton
            text={'뒤로가기'}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <section>
        <h3>오늘은 언제인가요?</h3>
        <div className="input-box">
          <input
            type="date"
            className="input-date"
            onChange={e => {
              setDate(e.target.value);
            }}
            value={date}
          />
        </div>
      </section>
      <section>
        <h3>오늘의 감정</h3>
        <ul className="emotion-list">
          {emotionList.map(it => (
            <EmotionItem
              key={it.emotionId}
              {...it}
              onClick={handleEmote}
              isSelected={it.emotionId === emotion} // 해당 ID만 true, 나머지는 false 반환
            />
          ))}
        </ul>
      </section>
      <section>
        <h3>오늘의 일기</h3>
        <div className="content-box">
          <textarea
            ref={contentRef}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="오늘 하루는 어땠나요?"
          />
        </div>
      </section>
      <section>
        <div className="control-box">
          <AppButton text={'취소하기'} onClick={() => navigate(-1)} />
          <AppButton
            text={'작성 완료'}
            type={'positive'}
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
