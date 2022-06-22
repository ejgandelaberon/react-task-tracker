import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Button from './components/Button';
import Pagination from './components/Pagination'
import { useState, useEffect } from "react"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import axios from 'axios'

function App() {
  const staticUrl = 'http://task-api.test/api/tasks'
  const [apiUrl, setApiUrl] = useState('http://task-api.test/api/tasks')
  const [tasks, setTasks] = useState([])
  const [nextApiUrl, setNextApiUrl] = useState()
  const [prevApiUrl, setPrevApiUrl] = useState()
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const redirect = () => {
    nav('/tasks/create')
  }

  useEffect(() => {
    setLoading(true)
    const controller = new AbortController();

    const getTasks = async () => {
      try {
        const res = await axios.get(apiUrl, {
          signal: controller.signal
        })
        console.log(res.data);
        setTasks(res.data.data)
        setNextApiUrl(res.data.next_page_url)
        setPrevApiUrl(res.data.prev_page_url)
        setLoading(false)
      } catch (err) {
        if(!axios.isCancel(err)) {
          throw err
        }
      }
    }

    getTasks()

    return () => {
      controller.abort();
    }
    
  }, [apiUrl])

  //fetch one task
  const fetchOneTask = async (id) => {
    const res = await fetch(`${staticUrl}/${id}`)
    const data = await res.json()
    return data
  }

  //add task
  const addTask = async (task) => {
    const res = await fetch(`${staticUrl}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  // delete task
  const deleteTask = async (objTask) => {
    await fetch(`${staticUrl}/delete/${objTask.id}`, { method: 'DELETE' })
    const filtered = tasks.filter(task => task.id !== objTask.id)
    setTasks(filtered)
    console.log(`Deleted task: ${objTask.name}`);
  }

  //toggle reminder
  const toggleReminder = async (id) => {
    const task = await fetchOneTask(id)
    await fetch(`${staticUrl}/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({reminder: !task.reminder})
    })
    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder} : task))
  }

  //set api url
  const gotoNextApiUrl = () => setApiUrl(nextApiUrl)
  const gotoPrevApiUrl = () => setApiUrl(prevApiUrl)

  return (
    <div className="container">
      <Header/>
      <Routes>
        <Route path='/' element={<Navigate to='/tasks/list'/>}/>
        <Route path='tasks/create' element={<AddTask onAdd={addTask}/>}/>
        <Route path='tasks/list'
          element={
            <>
              <Tasks
                tasks={tasks}
                addTaskFn={addTask}
                deleteFn={deleteTask}
                toggleFn={toggleReminder}
                loading={loading}
              />

              <Pagination
                gotoPrevApiUrl={prevApiUrl ? gotoPrevApiUrl: null}
                gotoNextApiUrl={nextApiUrl ? gotoNextApiUrl : null}
              />

              <Button
                text='Add Task'
                className='btn addTask'
                redirect={redirect}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
