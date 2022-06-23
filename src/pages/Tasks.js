import Task from './Task';

const Tasks = ({ tasks, deleteFn, toggleFn, loading }) => {
  const pStyle = {
    display: 'flex',
    justifyContent: 'center'
  }

  if(loading) return <p style={pStyle}>Loading...</p>

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
      
        : <p style={pStyle}>No tasks found.</p>
      }

      
    </>
  )
}

export default Tasks