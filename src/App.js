import Header from './layout/Header'
import { Route, Routes } from "react-router-dom"
import TaskRoute from './routes/TaskRoute';

function App() {

  return (
    <div className="container">
      <Header/>
      <Routes>
        <Route path='tasks/*' element={ <><TaskRoute/></> } />
      </Routes>
    </div>
  );
}

export default App;
