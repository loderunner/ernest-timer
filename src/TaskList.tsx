import { useCallback, useMemo } from 'react';

import { TaskItem } from './TaskItem';
import { useTasks } from './tasks';

export function TaskList() {
  const { tasks, addTask } = useTasks();

  const taskItems = useMemo(() => {
    const items: JSX.Element[] = [];
    for (const t of tasks) {
      if (t.id) {
        items.push(<TaskItem key={t.id} taskId={t.id} />);
      }
    }
    return items;
  }, [tasks]);

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
