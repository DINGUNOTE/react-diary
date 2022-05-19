import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppButton from './AppButton';
import EmotionItem from './EmotionItem';
import { DiaryDispatchContext } from '../App';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleEmote = emotion => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새 일기를 작성하시겠습니까?',
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate('/', { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm('일기를 삭제하시겠습니까?')) {
      onRemove(originData.id);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="diary-editor">
      <AppHeader
        headText={isEdit ? '일기 수정하기' : '새 일기 쓰기'}
        leftElement={
          <AppButton
            text={'뒤로가기'}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightElement={
          isEdit && (
            <AppButton
              text={'삭제하기'}
              type={'negative'}
              onClick={handleRemove}
            />
          )
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
          {/* <AppButton text={'취소하기'} onClick={() => navigate(-1)} /> */}
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
