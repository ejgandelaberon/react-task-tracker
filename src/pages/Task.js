import { FaTimes, FaPen, FaPenAlt, FaPencilAlt } from 'react-icons/fa'

const Task = ({ task, deleteTask, toggleReminder }) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => toggleReminder(task.id)}>
      <div>
        <h3 className='taskName'>
          {task.name}
        </h3>
        <p>{task.day}</p>
      </div>
      <div className='actions-container'>
        <button><FaPen style={{ color: '#fff' }}/></button>
        <span className="spacer"></span>
        <button onClick={() => deleteTask(task)}><FaTimes style={{ color: '#fff' }}/></button>
      </div>
    </div>
  )
}

export default Task