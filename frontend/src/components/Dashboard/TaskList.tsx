import { FC } from 'react';
import { LuArrowRight } from "react-icons/lu";
import { Task } from '../../types/InterfaceTypes';
import moment from 'moment';
import TaskInfoCard from '../Cards/TaskInfoCard';

interface TaskListProps {
    tasks: Task[];
    onSeeMore: () => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-semibold">Task List</h5>
                <button onClick={onSeeMore} className="card-btn">
                    See All
                    <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className='mt-6'>
                {tasks.slice(0, 5).map((task) => {
                    return (
                        <TaskInfoCard 
                        key={task._id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        date={moment(task.createdAt).format("Do MMM YYYY")}
                        hideBtn
                         />
                    );
                })}

            </div>
        </div>
    );
};

export default TaskList;
