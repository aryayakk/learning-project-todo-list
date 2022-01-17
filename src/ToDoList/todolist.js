import React, { useState } from 'react'

const ToDoList = () => {
    const [todo, setTodo] = useState([
        {time:'07.00', activity:'Sarapan'}
    ])
    const [input, setInput] = useState ({time:'', activity:''})
    const [index, setIndex] = useState(null)

    const handleChange = e => {
        let eachValue = e.target.value
        let eachKey = e.target.name

        setInput({...input, [eachKey]:eachValue})

    }

    const handleSubmit = e => {
        e.preventDefault()
        
        let newData = todo
        if(index === null) {
            newData = [...todo, input]
        }
        else {
            newData[index] = input
        }

        setTodo(newData)
        setInput({time:'', activity:''})
    }

    const handleEdit = e => {
        let indexEdited = parseInt(e.target.value)
        setInput(todo[indexEdited])
        setIndex(e.target.value)
    }

// console.log('index', index)
// console.log('todo', todo)
// console.log('input', input)

    return (
        <>
            <h1 className='todo-title'>THINGS TO DO</h1>
            <div>
                <form className='form-todo' onSubmit={handleSubmit}>
                    <div>
                        <input type="submit" id='submit' value="Let's do it!"/>
                    </div>
                    <label htmlFor="act"></label>
                    <input onChange={handleChange} value={input.activity} type="text" id="act-input" name="activity" placeholder='What To Do?' />
                    <br/>
                    <label htmlFor="time"></label>
                    <input onChange={handleChange} value={input.time} type="text" id="time-input" name="time" placeholder='07.00' />
                </form>
            </div>

            <div className='todo-container'>
                <table className='table table-dark table-hover'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Time</th>
                            <th>To Do</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            todo!==null&&(
                                <>
                                {
                                    todo.map(
                                        (res, index) => {
                                            return(
                                                
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{res.time}</td>
                                                    <td>{res.activity}</td>
                                                    
                                                    <td className='button'>
                                                        <button id='edit' onClick={handleEdit} value={index}>edit</button>
                                                        <button id='done'>done</button>
                                                    </td>
                                                </tr>
                                                
                                            )
                                        }
                                    )
                                }
                                </>
                            )
                        }
                    </tbody>
                    
                </table>
            </div>
        </>
    )
}

export default ToDoList