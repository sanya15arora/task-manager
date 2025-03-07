import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TaskOverview from "../../components/Tasks/TaskOverview";
import { Task } from "../../types/InterfaceTypes";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import TaskForm from "../../components/Tasks/TaskForm";
import toast from "react-hot-toast";
import DeleteAlert from "../../components/layouts/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Tasks = () => {
    useUserAuth();
  
  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState<{ show: boolean; taskId: string | null }>({
    show: false,
    taskId: null,
  });
  const [editTaskModal, setEditTaskModal] = useState<{ show: boolean; data: Task | null }>({
    show: false,
    data: null,
  });

  const fetchTaskList = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL);
      if (response.data) setTaskList(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (task: Task) => {
    const { title, description, status } = task;
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.TASKS.ADD, { title, description, status });
      if (response.data) {
        toast.success("Task added successfully");
        setAddTaskModal(false);
        fetchTaskList();
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task.");
    }
  };

  const handleEditTask = async (task: Task) => {
    if (!task._id) return;

    try {
      await axiosInstance.put(`${API_PATHS.TASKS.UPDATE(task._id)}`, {
        title: task.title,
        description: task.description,
        status: task.status,
      });
      toast.success("Task updated successfully");
      setEditTaskModal({ show: false, data: null });
      fetchTaskList();
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task.");
    }
  };

  const deleteTask = async (id: string) => {
    if (!id) return;

    try {
      await axiosInstance.delete(`${API_PATHS.TASKS.DELETE(id)}`);
      setOpenDeleteAlert({ show: false, taskId: null });
      toast.success("Task deleted successfully");
      fetchTaskList();
    } catch (error) {
      toast.error("Failed to delete task.");
    } finally {
      setOpenDeleteAlert({ show: false, taskId: null });
    }
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <DashboardLayout activeMenu="Tasks">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <TaskOverview
            taskList={taskList}
            onAddTask={() => setAddTaskModal(true)}
            onDelete={(id: string) => setOpenDeleteAlert({ show: true, taskId: id })}
            onEdit={(task: Task) => setEditTaskModal({ show: true, data: task })}
          />
        </div>
      </div>

      <Modal isOpen={addTaskModal} onClose={() => setAddTaskModal(false)} title="Add Task">
        <TaskForm onAddTask={handleAddTask} />
      </Modal>

      <Modal isOpen={editTaskModal.show} onClose={() => setEditTaskModal({ show: false, data: null })} title="Edit Task">
        {editTaskModal.data && (
          <TaskForm
            onAddTask={handleEditTask}
            initialData={editTaskModal.data}
          />
        )}
      </Modal>

      <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, taskId: null })} title="Delete Task">
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask(openDeleteAlert.taskId || "")}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Tasks;
