import { useState, useEffect } from "react"
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import axios from "axios"
import Tasks from '../pages/Tasks'
import Pagination from "../components/Pagination"
import Button from "../components/Button"
import AddTask from "../components/AddTask"

const TaskRoute = () => {
  const path = 'http://task-api.test/api/tasks'
  const [apiUrl, setApiUrl] = useState(path)
  const [tasks, setTasks] = useState([])
  const [nextApiUrl, setNextApiUrl] = useState()
  const [prevApiUrl, setPrevApiUrl] = useState()
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const redirect = () => {
    nav('/tasks/create')
  }
  const pStyle = {
    display: 'flex',
    justifyContent: 'center'
  }

  //fetch tasks
  useEffect(() => {
    setLoading(true)
    let mounted = true

    const getTasks = async () => {
      try {
        const res = await axios.get(apiUrl)
        if(mounted) {
          console.log(res.data)
          setTasks(res.data.data)
          setNextApiUrl(res.data.next_page_url)
          setPrevApiUrl(res.data.prev_page_url)
          setLoading(false)
        }
      } catch (err) {
        if(!axios.isCancel(err)) throw err
      }
    }

    getTasks()

    return () => {
      mounted = false
    }
    
  }, [apiUrl])

  //fetch one task
  const fetchOneTask = async (id) => {
    const res = await fetch(`${path}/${id}`)
    const data = await res.json()
    return data
  }

  //add task
  const addTask = async (task) => {
    const res = await fetch(`${path}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  }

  // delete task
  const deleteTask = async (objTask) => {
    await fetch(`${path}/delete/${objTask.id}`, { method: 'DELETE' })
    const filtered = tasks.filter(task => task.id !== objTask.id)
    setTasks(filtered)
    console.log(`Deleted task: ${objTask.name}`);
  }

  //toggle reminder
  const toggleReminder = async (id) => {
    const task = await fetchOneTask(id)
    await fetch(`${path}/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({reminder: !task.reminder})
    })
    setTasks(tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder} : task))
  }

  //set api url
  const gotoNextApiUrl = () => setApiUrl(nextApiUrl)
  const gotoPrevApiUrl = () => setApiUrl(prevApiUrl)

  //conditional rendering
  if(!tasks) {
    return <p style={pStyle}>Loading...</p>
  }

  return (
    <Routes>
      <Route path='/' element={<Navigate to='list'/>}/>
      <Route path='/create' element={<AddTask onAdd={addTask}/>}/>
      <Route path='/list' element={
        <>
          <Tasks
            tasks={tasks}
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
      }/>
    </Routes>
  )
}

export default TaskRoute