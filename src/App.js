import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Dental Appointment',
      day: 'Jun 30th at 3:00 PM',
      reminder: true,

    },
    {
      id: 2,
      text: 'NBI Appointment',
      day: 'Jul 1st at 12:00 NN',
      reminder: true,

    },
    {
      id: 3,
      text: 'Job Interview',
      day: 'Jun 27th at 10:00 AM',
      reminder: false,

    },
    {
      id: 4,
      text: 'Grocery',
      day: 'Jul 2nd at 8:00 AM',
      reminder: false,

    }
  ])

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
            tasks.length > 0
            ? <Tasks
                tasks={tasks}
                addTaskFn={addTask}
                deleteFn={deleteTask}
                toggleFn={toggleReminder}
              />
            : <p style={{display: 'flex', justifyContent: 'center'}}>No tasks found.</p>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
