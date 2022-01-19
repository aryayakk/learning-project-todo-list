import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ToDoList = () => {
    const [todo, setTodo] = useState([])
    const [input, setInput] = useState ({time:'', activity:'', description:'', id:0})
    const [index, setIndex] = useState(null)
    const [modal, setModal] = useState(undefined)
    
    const getData = async () => {
        let getFrom = await axios.get('http://localhost:3004/posts')
        let result = getFrom.data
// console.log('result', result)
        setTodo(result)
    }
    
    useEffect(() => {
      getData()
    },[])

    const handleChange = e => {
        let eachValue = e.target.value
        let eachKey = e.target.name

        setInput({...input, [eachKey]:eachValue})
    }

    const handleSubmit = e => {
        e.preventDefault()
        let id = input.id

        if(index === null) {
            axios.post('http://localhost:3004/posts', input)
            getData()
            setInput({time:'', description:'', activity:''})
        }
        else {
            axios.put(`http://localhost:3004/posts/${id}`, input)
            getData()
            setInput({time:'', description:'', activity:''})
            setIndex(null)
        }
    }

    const handleEdit = idCacthed => {
        let inputEdit = todo.filter(e => e.id === idCacthed)
// console.log(inputEdit)
        setInput(inputEdit[0])
        setIndex(true)
    }

    const handleDone = idCacthed => {
        axios.delete(`http://localhost:3004/posts/${idCacthed}`)
        getData()
    }

    const handleDetail = (id) => {

        let detail = todo.filter(e => e.id === id)
        console.log('detail',detail)
        setModal(detail)
    }
// console.log('todo', todo)
// console.log('index', index)
// console.log('input', input)
// console.log('modal', modal)

       
    return (
        <>
            <h1 className='todo-title'>THINGS TO DO</h1>
            <div>
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
            </div>

            <div className='todo-container'>
                <table className='table table-borderless table-hover'>
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
                            todo? 
                            
                                todo.map((res, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{res.time}</td>
                                            <td>{res.activity}</td>
                                            
                                            <td className='button'>
                                                <button id='detail' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleDetail(res.id)} >detail</button>
                                                <button id='edit' onClick={() => handleEdit(res.id)}>edit</button>
                                                <button id='done' onClick={() => handleDone(res.id)}>done</button>
                                            </td>
                                        </tr>
                                    </>
                                ))
                         
                            : false
                        }
                    </tbody>
                </table>
            </div>


            {/* modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detail</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body" key={modal}>
                            {
                                modal? 
                                    <>
                                        <p>{modal[0].time}</p>
                                        <p>{modal[0].description}</p>
                                        <p>{modal[0].todo}</p>
                                    </>
                            
                                : false
                            }
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>    
                    </div>
                </div>
            </div>  
        </>
    )
}

export default ToDoList