import { useTasks } from './tasks';

import './index.css';

function App() {
  const { tasks, addTask, deleteTask } = useTasks();
  return (
    <>
      <div className="text-xl font-bold">TaskTimer ⏰</div>
    </>
  );
}

export default App;
