import Task from './Task';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Tasks = ({ tasks, deleteFn, toggleFn }) => {
  const nav = useNavigate()
  const redirect = () => {
    nav('/tasks/create')
  }

  return (
    <>
      {tasks.length > 0
        ? tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            deleteTask={deleteFn}
            toggleReminder={toggleFn}
          />
        ))
      
        : <p style={{display: 'flex', justifyContent: 'center'}}>No tasks found.</p>
      }

      <Button
        color='green'
        text='Add Task'
        className='btn addTask'
        redirect={redirect}
      />
    </>
  )
}

export default Tasks