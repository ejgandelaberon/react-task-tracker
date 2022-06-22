import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

function App() {
  const apiUrl = 'http://task-api.test/api/tasks'
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks()
      setTasks(tasks)
    }

    getTasks()
  }, [])

  //fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(apiUrl)
    const data = await res.json()
    return data
  }

  //fetch one task
  const fetchOneTask = async (id) => {
    const res = await fetch(`${apiUrl}/${id}`)
    const data = await res.json()
    return data
  }

  //add task
  const addTask = async (task) => {
    const res = await fetch(`${apiUrl}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  // delete task
  const deleteTask = async (objTask) => {
    await fetch(`${apiUrl}/delete/${objTask.id}`, { method: 'DELETE' })
    const filtered = tasks.filter(task => task.id !== objTask.id)
    setTasks(filtered)
    console.log(`Deleted task: ${objTask.name}`);
  }

  //toggle reminder
  const toggleReminder = async (id) => {
    const task = await fetchOneTask(id)
    await fetch(`${apiUrl}/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({reminder: !task.reminder})
    })
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
