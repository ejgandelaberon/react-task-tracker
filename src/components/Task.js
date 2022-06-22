import { FaTimes } from 'react-icons/fa'

const Task = ({ task, deleteTask, toggleReminder }) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => toggleReminder(task.id)}>
      <h3>
        {task.name} <FaTimes onClick={() => deleteTask(task)} style={{ color: 'red' }}/>
      </h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task