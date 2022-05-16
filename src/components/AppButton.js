const AppButton = ({ text, type, onClick }) => {
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button
      type="button"
      className={['common-button', btnType].join(' ')}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

AppButton.defaultProps = {
  type: 'default',
};

export default AppButton;
