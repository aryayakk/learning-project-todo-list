import React, { useContext } from 'react'
import { ToDoContext } from './todo_context'

const ToDoForm = () => {
    
    const {input, setInput, index, runner } = useContext(ToDoContext)
    const { runSubmit, runUpdate } = runner

    const handleSubmit = async e => {
        e.preventDefault()

        if(index === null) {
            runSubmit()
        }
        else {
            runUpdate()
        }
    }

    const handleChange = e => {
        let eachValue = e.target.value
        let eachKey = e.target.name

        setInput({...input, [eachKey]:eachValue})
    }

    return (
        <>
            <h1 className='todo-title'>THINGS TO DO</h1>
            <form className='form-todo' onSubmit={handleSubmit}>
                <div>
                    <input type="submit" id='submit' value="LET'S DO IT!"/>
                </div>
                <label htmlFor="act"></label>
                <input onChange={handleChange} value={input.activity} type="text" id="act-input" name="activity" placeholder='What To Do?' />
                <br/>
                <label htmlFor="desc"></label>
                <textarea onChange={handleChange} value={input.description} type="text" id="desc-input" name="description" placeholder='Description' />
                <label htmlFor="time"></label>
                <input onChange={handleChange} value={input.time} type="text" id="time-input" name="time" placeholder='Set Time (07.00)' />
            </form>
        </>
    )
}

export default ToDoForm
