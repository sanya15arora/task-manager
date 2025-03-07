import { useState, FC, useEffect } from "react";
import Input from "../Inputs/Input";
import { Task, TaskStatus } from "../../types/InterfaceTypes";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  initialData?: Task;
}

const TaskForm: FC<TaskFormProps> = ({ onAddTask, initialData }) => {
  const [task, setTask] = useState<Task>(
    initialData || {
      title: "",
      description: "",
      status: "Pending" as TaskStatus,
    }
  );

  useEffect(() => {
    if (initialData) {
      setTask(initialData);
    }
  }, [initialData]);

  const handleChange = (key: keyof Task, value: string) => {
    setTask((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Input
        label="Title"
        value={task.title}
        onChange={({ target }) => handleChange("title", target.value)}
        placeholder="Enter title here..."
        type="text"
      />
      <Input
        label="Description"
        value={task.description}
        onChange={({ target }) => handleChange("description", target.value)}
        placeholder="Enter description here..."
        type="text"
      />

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          value={task.status}
          onChange={({ target }) => handleChange("status", target.value as TaskStatus)}
          className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-purple-300"
        >
          <option value="Pending">Pending</option>
          <option value="Inprogress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => onAddTask(task)}
          className="form-btn"
          disabled={!task.title.trim()}
        >
          {initialData ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
