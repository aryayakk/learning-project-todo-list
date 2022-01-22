/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import { ToDoContext } from './todo_context';

function ToDoForm() {
  const {
    input,
    setInput,
    index,
    runner,
  } = useContext(ToDoContext);

  const { runSubmit, runUpdate } = runner;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (index === null) {
      runSubmit();
    } else {
      runUpdate();
    }
  };

  const handleChange = (e) => {
    const eachValue = e.target.value;
    const eachKey = e.target.name;

    setInput({ ...input, [eachKey]: eachValue });
  };

  return (
    <>
      <h1 className="todo-title">DAILY TO DO</h1>
      <form className="form-todo" onSubmit={handleSubmit}>
        <div>
          <input type="submit" id="submit" value="LET'S DO IT!" />
        </div>

        <label htmlFor="time" />
        <input onChange={handleChange} value={input.time} type="text" id="time-input" name="time" placeholder="Set Time (07.00)" />
        <label htmlFor="act" />
        <input onChange={handleChange} value={input.activity} type="text" id="act-input" name="activity" placeholder="What To Do?" />

        <br />

        <label htmlFor="desc" />
        <textarea onChange={handleChange} value={input.description} type="text" id="desc-input" name="description" placeholder="Description" />
      </form>
    </>
  );
}

export default ToDoForm;
