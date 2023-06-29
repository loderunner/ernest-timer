import { useCallback, useMemo } from 'react';

import { TaskItem } from './TaskItem';
import { useTasks } from './tasks';

export function TaskList() {
  const { tasks, addTask, deleteTask } = useTasks();

  const taskItems = useMemo(() => {
    const items: JSX.Element[] = [];
    for (const t of tasks) {
      if (t.id) {
        const id = t.id;
        items.push(
          <TaskItem key={id} taskId={id} onDelete={() => deleteTask(id)} />
        );
      }
    }
    return items;
  }, [deleteTask, tasks]);

  const onClick = useCallback(() => addTask('New task'), [addTask]);

  return (
    <div className="flex flex-col border">
      {taskItems}
      <button className="border text-2xl" onClick={onClick}>
        ✚
      </button>
    </div>
  );
}
