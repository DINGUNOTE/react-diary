const AppHeader = ({ headText, leftElement, rightElement }) => {
  return (
    <header>
      <div className="head-left">{leftElement}</div>
      <div className="head-text">{headText}</div>
      <div className="head-right">{rightElement}</div>
    </header>
  );
};

export default AppHeader;
