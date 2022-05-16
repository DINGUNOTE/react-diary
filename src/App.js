import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';

// components
import AppHeader from './components/AppHeader';
import AppButton from './components/AppButton';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppHeader
          headText={'App'}
          leftElement={
            <AppButton text={'왼쪽 버튼'} onClick={() => alert('왼쪽 클릭')} />
          }
          rightElement={
            <AppButton
              text={'오른쪽 버튼'}
              onClick={() => alert('오른쪽 클릭')}
            />
          }
        />
        <h2>App.js</h2>
        <AppButton
          text={'버튼'}
          onClick={() => alert('버튼 클릭')}
          type={'positive'}
        />
        <AppButton
          text={'버튼'}
          onClick={() => alert('버튼 클릭')}
          type={'negative'}
        />
        <AppButton text={'버튼'} onClick={() => alert('버튼 클릭')} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
