import { PlayIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useTask } from './tasks';

interface Props {
  taskId: number;
  selected?: boolean;
  onDelete?: () => void;
}

export function TaskItem({ taskId: id, onDelete }: Props) {
  const { task, setTaskLabel } = useTask(id);

  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(task?.label ?? '');
  useEffect(() => {
    if (task) {
      setInputValue(task.label);
    }
  }, [task]);

  const ref = useRef<HTMLInputElement>(null);

  const onDoubleClick = useCallback(() => setEditing(true), []);
  const onBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      if (editing) {
        setEditing(false);
        setTaskLabel(value);
      }
    },
    [setTaskLabel, editing]
  );
  const onKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setEditing(false);
    }
  }, []);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  return task ? (
    <div className="flex h-10 flex-row items-center border text-2xl">
      <div className="h-full grow" onDoubleClick={onDoubleClick}>
        <input
          className={`absolute left-1 right-1 box-border ${
            editing ? 'visible' : 'hidden'
          }`}
          type="text"
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          ref={ref}
          defaultValue={inputValue}
        ></input>
        <span>{task.label}</span>
      </div>
      <button className="text-slate-700 hover:text-slate-950 active:text-slate-700">
        <PlayIcon className="h-6 w-6" />
      </button>
      <button
        className="text-slate-700 hover:text-slate-950 active:text-slate-700"
        onClick={onDelete}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </div>
  ) : (
    <></>
  );
}
