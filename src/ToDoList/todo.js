/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ToDoList from './todolist';
import { ToDoProvider } from './todo_context';
import ToDoForm from './todo_form';

function ToDo() {
  return (
    <ToDoProvider>
      <ToDoForm />
      <ToDoList />
    </ToDoProvider>
  );
}

export default ToDo;
