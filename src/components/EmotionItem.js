const EmotionItem = ({
  emotionId,
  emotionImg,
  emotionDescript,
  onClick,
  isSelected,
}) => {
  return (
    <li
      className={['emotion-item', isSelected ? `on${emotionId}` : null].join(
        ' ',
      )}
      onClick={() => onClick(emotionId)}
    >
      <img src={emotionImg} alt="" />
      <span>{emotionDescript}</span>
    </li>
  );
};

export default EmotionItem;
