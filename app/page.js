"use client"
import React, { useState, useEffect } from 'react'

const page = () => {

  /** ALL STATE */
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const [allTodos, setAllTodos] = useState(() => {
    if (typeof window !== 'undefined') {
      const localStorageTodos = localStorage.getItem("allTodos")

      if(localStorageTodos) {
        return[...JSON.parse(localStorageTodos)];
      }
    }
    return [];
  });

  useEffect(() => {
    if(allTodos.length) {
      localStorage.setItem('allTodos', JSON.stringify(allTodos));
    }
  }, [allTodos]);

  /** ALL FUNCTIONS */

  /**
   * Funtion to save todo in the array
   * 
   * @param {Event} e - the event of form submission
   */
  function saveTodo(e) {
    e.preventDefault();

    if(!todoTitle || !todoDescription) {
      alert("Please fill both fields");
      return;
    }
    setAllTodos([...allTodos, {todoTitle, todoDescription}]);
    setTodoTitle("");
    setTodoDescription("");

  };

  /**
   * Function to edit the todo
   * 
   * @param {Number} index - the index of todo to be edited
   */
  function editTodo(index) {
    const todo = allTodos[index];
    setTodoTitle(todo.todoTitle);
    setTodoDescription(todo.todoDescription);
    deleteTodo(index);
  }
  
  /**
   * Function to delete the todo
   * 
   * @param {Number} index - the index of todo to be edited
   */
  function deleteTodo(index) {
    const todos = [...allTodos];
    todos.splice(index, 1);
    setAllTodos(todos);
  }

  
  return (
    <>
      <h1 className='bg-zinc-800 text-xl text-white p-5 text-center'>
        React - Tailwind Todo List
      </h1>
      <form onSubmit={saveTodo} className='flex flex-col max-w-xl mx-auto justify-center mb-3'>
        <input 
          className='border-2 border-gray-400 m-3 p-2 rounded-md' 
          placeholder='Enter the todo title' 
          value={todoTitle}
          onChange={(e) => {setTodoTitle(e.target.value)}}
        />

        <input 
          className='border-2 border-gray-400 m-3 p-2 rounded-md' 
          placeholder='Enter the todo description' 
          value={todoDescription}
          onChange={(e) => {setTodoDescription(e.target.value)}}
        />

        <button
          className='bg-zinc-500 hover:bg-zinc-700  text-white px-4 py-2 rounded-md w-60 mx-auto'  
        >
          Add Todo
        </button>
      </form>

      <hr />

      {allTodos.length 
          ? 
      <div className='grid grid-cols-4 gap-3 border p-2 border-gray-50 bg-slate-50'>
        
          {allTodos.map((todo, index) => (
            <div key={index} 
              className='flex flex-col m-3 p-2 border border-zinc-200 bg-slate-100 rounded-md h-40 overflow-hidden hover:bg-slate-200'> 
              <p className='text-2xl font-bold'>{todo.todoTitle}</p>
              <p className='text-sm font-medium'>{todo.todoDescription}</p>
              <div className='self-center mt-auto'>
              <button 
                className='px-2 border border-zinc-500 rounded-md hover:bg-zinc-500 hover:text-white mx-2'
                onClick={() => editTodo(index)}
              >
                Edit
              </button>
              <button 
                className='px-2 border border-red-500 rounded-md hover:bg-red-500 hover:text-white mx-2'
                onClick={() => deleteTodo(index)}
              >
                Delete
              </button>
              </div>
            </div>
          ))}
          
      </div>
      : 
      <h2 className='text-center text-xl my-4'>No Todo's Available</h2>}

    </>
  )
}

export default page
