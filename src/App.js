import { useState } from 'react';
import AddTodo from './AddTodo/add_todo';
import './App.css';
import Modal from './Modal/modal';
import ToDoList from './ToDoList/todolist';

function App() {
  const [modal, setModal] = useState(false)

  return (
    <>
    <div className='button'>
      <button onClick={() =>{setModal(true)}}>detail</button>
      {modal && <Modal closeButton={setModal}/>}
    </div>
      <ToDoList/>
    </>
  );
}

export default App;
