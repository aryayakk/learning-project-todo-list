/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ToDoContext = createContext();

export function ToDoProvider(props) {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState(
    {
      time: '',
      activity: '',
      description: '',
      id: 0,
      isDeleted: false,
    },
  );
  const [index, setIndex] = useState(null);
  const [modal, setModal] = useState(undefined);

  const getData = async () => {
    const getFrom = await axios.get('http://localhost:3004/posts');
    const result = getFrom.data.filter((e) => !e.isDeleted);
    // console.log('result', result)
    setTodo(result);
  };

  const runSubmit = async () => {
    await axios.post('http://localhost:3004/posts', input);
    getData();
    setInput({ time: '', activity: '', description: '' });
  };

  const runUpdate = async () => {
    const { id } = input;

    await axios.put(`http://localhost:3004/posts/${id}`, input);
    getData();
    setInput({ time: '', activity: '', description: '' });
    setIndex(null);
  };

  const runEdit = (idCatched) => {
    const inputEdit = todo.filter((e) => e.id === idCatched);
    // console.log(inputEdit)
    setInput(inputEdit[0]);
    setIndex(true);
  };

  const runDone = async (idCatched) => {
    const inputDeleted = todo.filter((e) => e.id === idCatched);
    const putDeletedItem = Object.assign(inputDeleted[0], { isDeleted: true });
    await axios.put(`http://localhost:3004/posts/${idCatched}`, putDeletedItem);

    getData();
    // console.log('inputDeleted from runDone', inputDeleted)
  };
  const runDetail = (id) => {
    const detail = todo.filter((e) => e.id === id);
    // console.log('detail',detail)
    setModal(detail);
  };

  const runner = {
    getData,
    runSubmit,
    runUpdate,
    runEdit,
    runDone,
    runDetail,
  };

  return (
    <ToDoContext.Provider value={{
      todo,
      setTodo,
      input,
      setInput,
      index,
      setIndex,
      modal,
      setModal,
      runner,
    }}
    >
      {props.children}
    </ToDoContext.Provider>
  );
}
