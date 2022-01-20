import React, { createContext, useState } from "react";

export const ToDoContext = createContext()

export const ToDoProvider = props => {
    const [todo, setTodo] = useState([])
    const [input, setInput] = useState ({time:'', activity:'', description:'', id:0, isDeleted: false})
    const [index, setIndex] = useState(null)
    const [modal, setModal] = useState(undefined) 

    return(
        <ToDoContext.Provider value={{
            todo, setTodo,
            input, setInput,
            index, setIndex,
            modal, setModal
        }}>
            {props.children}
        </ToDoContext.Provider>
    )
}