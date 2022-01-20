import React from 'react'
import ToDoList from './todolist'
import { ToDoProvider } from './todo_context'

const ToDo = () => {
    return (
        <ToDoProvider>
            <ToDoList/>
        </ToDoProvider>
    )
}

export default ToDo