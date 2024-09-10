import React, { useState } from "react";
import "./App.css"; // CSS dosyanı import et

function App() {
  const [todos, setTodos] = useState([
    { text: "Taste JavaScript", completed: true },
    { text: "Code furiously", completed: true },
    { text: "Promote Mavo", completed: true },
    { text: "Give talks", completed: true },
    { text: "Write tutorials", completed: true },
    { text: "Have a life!", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState(""); // Yeni görev için state
  const [filter, setFilter] = useState("All");

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return; // Boş görev eklemeyi engelle
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo(""); // Görev eklendikten sonra input alanını temizle
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={addTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)} // Input değişiminde değeri güncelle
            autoFocus
          />
        </form>
      </header>
      <section className="main">
        <ul className="todo-list">
          {filteredTodos.map((todo, index) => (
            <li key={index} className={todo.completed ? "completed" : ""}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                />
                <label>{todo.text}</label>
                <button className="destroy"></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter((todo) => !todo.completed).length}</strong>{" "}
          items left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#/"
              className={filter === "All" ? "selected" : ""}
              onClick={() => setFilter("All")}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={filter === "Active" ? "selected" : ""}
              onClick={() => setFilter("Active")}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/"
              className={filter === "Completed" ? "selected" : ""}
              onClick={() => setFilter("Completed")}
            >
              Completed
            </a>
          </li>
        </ul>
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default App;
