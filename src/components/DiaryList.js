import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppButton from './AppButton';
import DiaryItem from './DiaryItem';

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된 순' },
];

const filterOptionList = [
  { value: 'all', name: '전체' },
  { value: 'good', name: '좋은 감정' },
  { value: 'bad', name: '안좋은 감정' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="control-menu"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest'); // 최신순, 오래된 순 state
  const [filter, setFilter] = useState('all'); // 감정 필터 state

  const getProcessedDiaryList = () => {
    const filterCallBack = item => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList)); // 원본 배열을 변경하지 않기 위해서 문자화 했다가 다시 배열화

    const filteredList =
      filter === 'all' ? copyList : copyList.filter(it => filterCallBack(it));

    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="diary-list">
      <div className="menu-wrapper">
        <div className="select-container">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="btn-container">
          <AppButton
            type={'positive'}
            text={'새 일기쓰기'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>
      {getProcessedDiaryList().map(it => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
