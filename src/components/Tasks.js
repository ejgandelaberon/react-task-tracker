import Task from './Task';

const Tasks = ({ tasks, deleteFn, toggleFn, loading }) => {

  if(loading) return <p style={{display: 'flex', justifyContent: 'center'}}>Loading...</p>

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

      
    </>
  )
}

export default Tasks