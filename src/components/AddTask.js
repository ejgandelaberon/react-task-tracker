import { useState } from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'


const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)
  
  const nav = useNavigate()

  const redirect = (e) => {
    nav('/tasks/list')
  }

  const onSubmit = (e) => {
    e.preventDefault()

    //validate input
    if(!text) return alert('Please enter a text')
    onAdd({ text, day, reminder  })
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
          <input type="text" placeholder="Task title" value={text} onChange={(e) => setText(e.target.value)}/>
        </div>

        <div className="form-control">
          <label>Task</label>
          <input type="text" placeholder="Day & Time" value={day} onChange={(e) => setDay(e.target.value)}/>
        </div>

        <div className="form-control form-control-check">
          <label>Set Reminder</label>
          <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div>

        <input className="btn btn-block" type="submit" value="Save Task"/>
      </form>

      <Button
        color='gray'
        text='Back to Tasks'
        className='btn backToTasks'
        redirect={redirect}
      />
    </>
  )
}

export default AddTask