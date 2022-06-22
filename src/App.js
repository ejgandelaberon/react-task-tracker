import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

function App() {
  const [tasks, setTasks] = useState([])

  //add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = (objTask) => {
    const filtered = tasks.filter(task => task.id !== objTask.id)
    setTasks(filtered)
    console.log(`Deleted task: ${objTask.text}`);
  }

  //toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder} : task))
  }

  return (
    <div className="container">
      <Header/>
      <Routes>
        <Route path='/' element={<Navigate to='/tasks/list'/>}/>
        <Route path='tasks/create' element={<AddTask onAdd={addTask}/>}/>
        <Route path='tasks/list'
          element={
            <Tasks
              tasks={tasks}
              addTaskFn={addTask}
              deleteFn={deleteTask}
              toggleFn={toggleReminder}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
