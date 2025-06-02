
const e=React,h=React.useState,k=React.useEffect;

function App(){
  const [todos,setTodos]=h([]),[newTodo,setNewTodo]=h(""),
        [meals,setMeals]=h([]),[newMeal,setNewMeal]=h("");

  k(()=>{setTodos(JSON.parse(localStorage.getItem("todos")||"[]"));
         setMeals(JSON.parse(localStorage.getItem("meals")||"[]"))},[]);

  k(()=>{localStorage.setItem("todos",JSON.stringify(todos));
         localStorage.setItem("meals",JSON.stringify(meals))},[todos,meals]);

  const addTodo=()=>{if(newTodo.trim())setTodos([...todos,{text:newTodo,done:!1}]),setNewTodo("")},
        toggleTodo=i=>{const t=[...todos];t[i].done=!t[i].done,setTodos(t)},
        addMeal=()=>{if(newMeal.trim())setMeals([...meals,newMeal]),setNewMeal("")};

  return e.createElement("div",{className:"min-h-screen p-4 max-w-md mx-auto"},[
    e.createElement("h1",{className:"text-2xl font-bold mb-4"},"📝 AlltagsApp Pro"),

    e.createElement("div",{className:"bg-white rounded-2xl p-4 mb-6 shadow"},[
      e.createElement("h2",{className:"text-xl font-semibold mb-2"},"To-Do"),
      e.createElement("div",{className:"flex gap-2 mb-2"},[
        e.createElement("input",{
          className:"flex-1 border rounded-xl px-3 py-1",
          value:newTodo,onChange:e=>setNewTodo(e.target.value),
          placeholder:"Neue Aufgabe"}),
        e.createElement("button",{
          className:"bg-black text-white px-3 rounded-xl",
          onClick:addTodo},"+")]),
      e.createElement("ul",null,
        todos.map((t,i)=>e.createElement("li",{
          key:i,
          className:`py-1 ${t.done?"line-through text-gray-400":""}`,
          onClick:()=>toggleTodo(i)},t.text)))
    ]),

    e.createElement("div",{className:"bg-white rounded-2xl p-4 mb-6 shadow"},[
      e.createElement("h2",{className:"text-xl font-semibold mb-2"},"📅 Kalender"),
      e.createElement("p",null,(new Date).toLocaleDateString("de-DE",{weekday:"long",day:"numeric",month:"long",year:"numeric"}))
    ]),

    e.createElement("div",{className:"bg-white rounded-2xl p-4 shadow"},[
      e.createElement("h2",{className:"text-xl font-semibold mb-2"},"🥗 Meal Prep"),
      e.createElement("div",{className:"flex gap-2 mb-2"},[
        e.createElement("input",{
          className:"flex-1 border rounded-xl px-3 py-1",
          value:newMeal,onChange:e=>setNewMeal(e.target.value),
          placeholder:"Neues Gericht"}),
        e.createElement("button",{
          className:"bg-black text-white px-3 rounded-xl",
          onClick:addMeal},"+")]),
      e.createElement("ul",null,
        meals.map((m,i)=>e.createElement("li",{key:i,className:"py-1"},m)))
    ])
  ])
}

const root=ReactDOM.createRoot(document.getElementById("root"));root.render(e.createElement(App));
