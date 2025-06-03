
const { useState, useEffect } = React;

function AlltagsAppPro() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
  const [newTodo, setNewTodo] = useState('');
  const [mealPrep, setMealPrep] = useState(() => JSON.parse(localStorage.getItem('meals')) || []);
  const [newMeal, setNewMeal] = useState('');
  const today = new Date().toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('meals', JSON.stringify(mealPrep));
  }, [todos, mealPrep]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, done: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = index => {
    const updated = [...todos];
    updated[index].done = !updated[index].done;
    setTodos(updated);
  };

  const deleteTodo = index => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const addMeal = () => {
    if (newMeal.trim()) {
      setMealPrep([...mealPrep, newMeal]);
      setNewMeal('');
    }
  };

  const deleteMeal = index => {
    const updated = mealPrep.filter((_, i) => i !== index);
    setMealPrep(updated);
  };

  return (
    <div className="p-4 max-w-md mx-auto text-[#1e1e1e]">
      <h1 className="text-3xl font-bold mb-4">📝 AlltagsApp Pro</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">To-Do</h2>
        <div className="flex gap-2 mb-2">
          <input
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="Neue Aufgabe"
            className="border p-2 rounded w-full"
          />
          <button onClick={addTodo} className="bg-black text-white px-3 rounded">+</button>
        </div>
        <ul>
          {todos.map((todo, i) => (
            <li key={i} className="flex items-center justify-between mb-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(i)} />
                <span className={todo.done ? 'line-through' : ''}>{todo.text}</span>
              </label>
              <button onClick={() => deleteTodo(i)} className="text-red-500">✕</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📅 Kalender</h2>
        <p className="bg-white rounded p-3 shadow-sm">{today}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🥗 Meal Prep</h2>
        <div className="flex gap-2 mb-2">
          <input
            value={newMeal}
            onChange={e => setNewMeal(e.target.value)}
            placeholder="Neues Gericht"
            className="border p-2 rounded w-full"
          />
          <button onClick={addMeal} className="bg-black text-white px-3 rounded">+</button>
        </div>
        <ul>
          {mealPrep.map((meal, i) => (
            <li key={i} className="flex justify-between mb-1">
              <span>{meal}</span>
              <button onClick={() => deleteMeal(i)} className="text-red-500">✕</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AlltagsAppPro />);
