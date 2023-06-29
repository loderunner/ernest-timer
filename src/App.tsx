import { TaskList } from './TaskList';
import './index.css';

function App() {
  return (
    <div className="container mx-auto flex flex-col items-stretch border">
      <h1 className="text-center text-5xl font-bold md:text-7xl">
        TaskTimer ⏰
      </h1>
      <TaskList />
    </div>
  );
}

export default App;
