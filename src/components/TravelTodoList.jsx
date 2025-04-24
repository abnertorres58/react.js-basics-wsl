import {
  CheckCircle,
  Circle,
  MapPin,
  Plane,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function TravelTodoList() {
  const [todos, setTodos] = useState(() => {
      const savedTodos = localStorage.getItem("travelTodos");
      return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("packing");

  useEffect(() => {
    localStorage.setItem("travelTodos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false,
            category,
        };
        console.log(newTodo);

        setTodos([...todos, newTodo]);
        setInputValue("");
    } else {
        alert("Please enter a task");
    }
  };

  const toggleTodo = (id) => {
    console.log(id);
    setTodos(
        todos.map((t) => {
            if(t.id === id) {
                return {...t, completed: !t.completed};
            }
            return t;
        })
    );
  };

  const deleteTodo = (id) => {
    console.log(id);
    setTodos(todos.filter(t => t.id !== id));
  };

  useEffect(() => {
      localStorage.setItem("travelTodos", JSON.stringify(todos));
  }, [todos])


  return (
      <div className="travel-todo-container">
        <header className="travel-header">
          <Plane className="plane-icon" />
          <h1>Travel Todo List</h1>
        </header>
        <form onSubmit={addTodo} className="todo-form">
          <div className="input-container">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new task..."
                className="todo-input"
            />
            <button type="submit" className="add-button">
              <PlusCircle size={24} />
            </button>
          </div>
          <div className="category-selector">
            <button
                type="button"
                className={`category-button ${
                    category === "packing" ? "active" : ""
                }`}
                onClick={() => {setCategory("packing")}}
            >
              Packing
            </button>
            <button
                type="button"
                className={`category-button ${
                    category === "planning" ? "active" : ""
                }`}
                onClick={() => {setCategory("planning")}}

            >
              Planning
            </button>
            <button
                type="button"
                className={`category-button ${
                    category === "activities" ? "active" : ""
                }`}
                onClick={() => {setCategory("activities")}}
            >
              Activities
            </button>
          </div>
        </form>
        <div className="todo-lists">
          {["packing", "planning", "activities"].map((cat) => (
              <div key={cat} className="todo-category">
                <h2>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>
                <ul className="todo-list">
                  {todos
                      .filter((todo) => todo.category === cat)
                      .map((todo) => (
                          <li
                              key={todo.id}
                              className={`todo-item ${todo.completed ? "completed" : ""}`}
                          >
                            <button
                                onClick={() => toggleTodo(todo.id)}
                                className="toggle-button"
                            >
                                {
                                    todo.completed ? <CheckCircle size={20}/> : <Circle size={20} />
                                }
                            </button>
                            <span className="todo-text">{todo.text}</span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="delete-button"
                            >
                              <Trash2 size={20} />
                            </button>
                          </li>
                      ))}
                </ul>
              </div>
          ))}
        </div>
        <footer className="travel-footer">
          <MapPin size={20} />
          <span>Your next adventure awaits!</span>
        </footer>
      </div>
  );
}