import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';

export interface Task {
  id?: number;
  label: string;
  runs: Run[];
}

export interface Run {
  id?: number;
  taskId: number;
  startTime: Date;
  endTime?: Date;
}

class Database extends Dexie {
  tasks!: Dexie.Table<Task, number>;
  runs!: Dexie.Table<Run, number>;

  constructor() {
    super('tasks');

    this.version(1).stores({
      tasks: '++id',
      runs: '++id,taskId,startTime',
    });
  }
}

const db = new Database();

export function useTasks() {
  return {
    tasks: useLiveQuery(() => db.tasks.toArray()) ?? [],
    addTask: (label: string) => db.tasks.add({ label, runs: [] }),
    deleteTask: (id: number) =>
      Promise.allSettled([
        db.tasks.delete(id),
        db.runs.where({ taskId: id }).delete(),
      ]),
  };
}

export function useTask(id: number) {
  return {
    task: useLiveQuery(() => db.tasks.get(id)),
    setTaskLabel: (label: string) => db.tasks.update(id, { label }),
  };
}

export function useRuns(taskId: number) {
  return {
    runs: useLiveQuery(() => db.runs.where({ taskId }).toArray()),
    startRun: () => db.runs.add({ taskId, startTime: new Date() }),
    deleteRun: (id: number) => db.runs.delete(id),
  };
}

export function useRun(id: number) {
  return {
    run: useLiveQuery(() => db.runs.get(id)),
    endRun: db.runs.update(id, { endTime: new Date() }),
  };
}
