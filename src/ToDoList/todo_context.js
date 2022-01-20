import React, { createContext, useState } from "react";
import axios from "axios";

export const ToDoContext = createContext()

export const ToDoProvider = props => {
    const [todo, setTodo] = useState([])
    const [input, setInput] = useState ({time:'', activity:'', description:'', id:0, isDeleted: false})
    const [index, setIndex] = useState(null)
    const [modal, setModal] = useState(undefined)

    const getData = async () => {
        let getFrom = await axios.get('http://localhost:3004/posts')
        let result = getFrom.data.filter(e => !e.isDeleted)
    // console.log('result', result)
        setTodo(result)
    }

    const runSubmit = async e => {
        await axios.post('http://localhost:3004/posts', input)
        getData()
        setInput({time:'', activity:'', description:''})
    }

    const runUpdate = async e => {
        let id = input.id

        await axios.put(`http://localhost:3004/posts/${id}`, input)
        getData()
        setInput({time:'', activity:'', description:''})
        setIndex(null)
    }

    const runEdit = idCatched => {
        let inputEdit = todo.filter(e => e.id === idCatched)
    // console.log(inputEdit)
        setInput(inputEdit[0])
        setIndex(true)
    }

    const runDone = async idCatched => {
        let inputDeleted = todo.filter(e => e.id === idCatched)
        let putDeletedItem = Object.assign(inputDeleted[0], {isDeleted: true})
        await axios.put(`http://localhost:3004/posts/${idCatched}`, putDeletedItem)

        getData()
        // console.log('inputDeleted from runDone', inputDeleted)
    }
    const runDetail = (id) => {
        let detail = todo.filter(e => e.id === id)
        console.log('detail',detail)
        setModal(detail)
    }


    const runner = {
        getData,
        runSubmit,
        runUpdate,
        runEdit,
        runDone,
        runDetail
    }

    return(
        <ToDoContext.Provider value={{
            todo, setTodo,
            input, setInput,
            index, setIndex,
            modal, setModal,
            runner
        }}>
            {props.children}
        </ToDoContext.Provider>
    )
}