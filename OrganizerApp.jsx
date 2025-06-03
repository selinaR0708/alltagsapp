import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function OrganizerApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [newEntry, setNewEntry] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const addMeal = () => {
    if (newMeal.trim()) {
      setMeals([...meals, newMeal]);
      setNewMeal('');
    }
  };

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      const key = selectedDate.toDateString();
      const updated = { ...entries };
      if (!updated[key]) updated[key] = [];
      updated[key].push(newEntry);
      setEntries(updated);
      setNewEntry('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-center font-sans">
      <h1 className="text-2xl font-bold mb-6">
        📝 <span className="text-black">AlltagsApp Pro</span>
      </h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-left">To-Do</h2>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Neue Aufgabe"
            className="flex-1 p-2 border rounded bg-white"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className="bg-black text-white px-4 rounded" onClick={addTodo}>
            +
          </button>
        </div>
        <ul className="mt-2 text-left">
          {todos.map((todo, index) => (
            <li key={index} className="mt-1">• {todo}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-left">📅 Kalender</h2>
        <div className="flex flex-col items-center mt-2">
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <p className="mt-2 text-sm">Ausgewählt: {selectedDate.toDateString()}</p>
          <input
            type="text"
            placeholder="Neuer Eintrag für diesen Tag"
            className="p-2 border rounded bg-white w-full mt-2"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
          />
          <button className="mt-2 bg-black text-white px-4 py-1 rounded" onClick={handleAddEntry}>
            Hinzufügen
          </button>
          <ul className="mt-2 text-left w-full">
            {(entries[selectedDate.toDateString()] || []).map((entry, index) => (
              <li key={index}>• {entry}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-left">🥗 Meal Prep</h2>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Neues Gericht"
            className="flex-1 p-2 border rounded bg-white"
            value={newMeal}
            onChange={(e) => setNewMeal(e.target.value)}
          />
          <button className="bg-black text-white px-4 rounded" onClick={addMeal}>
            +
          </button>
        </div>
        <ul className="mt-2 text-left">
          {meals.map((meal, index) => (
            <li key={index} className="mt-1">• {meal}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
