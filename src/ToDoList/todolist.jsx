import React, { useContext, useEffect } from 'react';
import { ToDoContext } from './todo_context';

function ToDoList() {
  const { todo, modal, runner } = useContext(ToDoContext);
  const {
    getData,
    runDone,
    runDetail,
    runEdit,
  } = runner;

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (idCatched) => {
    runEdit(idCatched);
  };

  const handleDone = (idCatched) => {
    runDone(idCatched);
  };

  const handleDetail = (id) => {
    runDetail(id);
  };

  return (
    <>
      <div className="todo-container">
        <table className="table table-borderless table-hover">
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
              todo
                ? todo.map((res, index) => (
                  <tr key={res.id}>
                    <td>{index + 1}</td>
                    <td>{res.time}</td>
                    <td>{res.activity}</td>

                    <td className="button">
                      <span>
                        <button type="button" onClick={() => handleDetail(res.id)} id="detail" data-bs-toggle="modal" data-bs-target="#exampleModal">detail</button>
                        <button type="button" onClick={() => handleEdit(res.id)} id="edit">edit</button>
                        <button type="button" onClick={() => handleDone(res.id)} id="done">done</button>
                      </span>
                    </td>
                  </tr>
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
              <h3 className="modal-title" id="exampleModalLabel"><b>{modal ? modal[0].activity : false}</b></h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-body">
              {
                modal
                  ? (
                    <>
                      <h5>{modal[0].time}</h5>
                      <p>{modal[0].description}</p>
                    </>
                  )
                  : false
              }
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoList;
