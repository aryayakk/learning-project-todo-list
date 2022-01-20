import React from 'react'
import ToDoList from './todolist'
import { ToDoProvider } from './todo_context'
import ToDoForm from './todo_form'

const ToDo = () => {
    return (
        <ToDoProvider>
            <ToDoForm/>
            <ToDoList/>
        </ToDoProvider>
    )
}

export default ToDo