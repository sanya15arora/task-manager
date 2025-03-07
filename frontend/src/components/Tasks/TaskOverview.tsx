import { FC } from 'react'
import { Task } from '../../types/InterfaceTypes'
import TaskInfoCard from '../Cards/TaskInfoCard';
import moment from 'moment';
import { LuPlus } from 'react-icons/lu';

interface TaskListCardProps {
    taskList: Task[];
    onAddTask: () => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

const TaskOverview: FC<TaskListCardProps> = ({ taskList, onAddTask, onDelete, onEdit }) => {


    return (
        <div className="card">
            <div className="grid grid-cols-1 gap-8">
                <button onClick={onAddTask} className=" flex flex-col items-center justify-center w-32 h-32 bg-purple-100 text-purple-500 rounded-2xl border border-dashed">
                    <LuPlus className="text-xl" />
                    Add Task
                </button>
                {taskList.length !== 0 && (
                    <div className="grid grid-cols-1">
                        <h5 className="text-xl font-semibold">Task List</h5>
                        <div className='grid grid-cols-1 gap-4'>
                            {taskList.map((task) => {
                                return (
                                    <TaskInfoCard
                                        key={task._id}
                                        title={task.title}
                                        description={task.description}
                                        status={task.status}
                                        date={moment(task.createdAt).format("Do MMM YYYY")}
                                        onDelete={() => onDelete(task?._id || "")}
                                        onEdit={() => onEdit(task)}
                                    />
                                );
                            })}
                        </div>
                    </div>)}
            </div>
        </div>
    )
}

export default TaskOverview