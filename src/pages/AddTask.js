import { useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'


const AddTask = ({ onAdd }) => {
  const [name, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)
  
  const nav = useNavigate()

  const redirect = () => {
    nav('/tasks/list')
  }

  const onSubmit = (e) => {
    e.preventDefault()

    //validate input
    if(!name) return alert('Please enter a text')
    onAdd({ name, day, reminder  })
    setText('')
    setDay('')
    setReminder(false)
    nav('/tasks/list')
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label>Task</label>
          <input type="text" placeholder="Task title" value={name} onChange={(e) => setText(e.target.value)}/>
        </div>

        <div className="form-control">
          <label>Task</label>
          <input type="text" placeholder="Day & Time" value={day} onChange={(e) => setDay(e.target.value)}/>
        </div>

        <div className="form-control form-control-check">
          <label>Set Reminder</label>
          <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div>

        <input className="btn btn-block btn-save" type="submit" value="Save Task"/>
      </form>

      <Button
        text='Back to Tasks'
        className='btn backToTasks'
        redirect={redirect}
      />
    </>
  )
}

export default AddTask