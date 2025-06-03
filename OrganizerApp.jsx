// Organizer App UI (React + Tailwind)
import { useState } from 'react';

export default function OrganizerApp() {
  const [todos, setTodos] = useState([
    { text: 'Walk the dog', completed: false },
    { text: 'Grocery shopping', completed: false },
    { text: 'Call plumber', completed: false },
    { text: 'Vacuum the house', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [mealPlans, setMealPlans] = useState(['Vegetable Stir-Fry', 'Chickpea Salad']);
  const [newMeal, setNewMeal] = useState('');

  const toggleTodo = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const addMeal = () => {
    if (newMeal.trim()) {
      setMealPlans([...mealPlans, newMeal]);
      setNewMeal('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4 flex justify-around">
        <button onClick={() => setTab('todo')}>To-Do</button>
        <button onClick={() => setTab('calendar')}>Calendar</button>
        <button onClick={() => setTab('meal')}>Meal Prep</button>
      </div>
      {tab === 'todo' && (
        <div>
          <h2 className="text-xl font-semibold">To-Do</h2>
          {todos.map((todo, index) => (
            <div key={index} className="flex justify-between items-center">
              <label>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(index)} />
                <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
              </label>
              <button onClick={() => deleteTodo(index)}>🗑</button>
            </div>
          ))}
          <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Neue Aufgabe..." />
          <button onClick={addTodo}>Hinzufügen</button>
        </div>
      )}
      {tab === 'calendar' && (
        <div>
          <h2 className="text-xl font-semibold">Kalender</h2>
          <p>Hier könnte ein Kalender-Widget eingebunden werden.</p>
        </div>
      )}
      {tab === 'meal' && (
        <div>
          <h2 className="text-xl font-semibold">Meal Prep</h2>
          {mealPlans.map((meal, index) => (
            <div key={index}>{meal}</div>
          ))}
          <input value={newMeal} onChange={(e) => setNewMeal(e.target.value)} placeholder="Neues Gericht..." />
          <button onClick={addMeal}>Hinzufügen</button>
        </div>
      )}
    </div>
  );
}
