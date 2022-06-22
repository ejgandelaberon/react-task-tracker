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
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteFn}
          toggleReminder={toggleFn}
        />
      ))}

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