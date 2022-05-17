import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

// pages
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'EDIT': {
      newState = state.map(it =>
        it.id === action.data.id ? { ...action.data } : it,
      );
      break;
    }
    case 'REMOVE': {
      newState = state.filter(it => it.id !== action.targetId);
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContet = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime,
        content,
        emotion,
      },
    });
  };

  // REMOVE
  const onRemove = targetId => {
    dispatch({ type: 'REMOVE', targetId });
  };

  return (
    <DiaryStateContet.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContet.Provider>
  );
}

export default App;
