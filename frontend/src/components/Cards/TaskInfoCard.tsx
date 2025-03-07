import { FC } from 'react';
import { LuTrash2 } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { TaskStatus } from '../../types/InterfaceTypes';

interface TaskInfoCardProps {
    title: string;
    description: string;
    status: TaskStatus
    date: string;
    hideBtn?: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
}

const TaskInfoCard: FC<TaskInfoCardProps> = ({
    title,
    description,
    status,
    date,
    hideBtn = false,
    onDelete,
    onEdit
}) => {
    const getStatusColor = (status: TaskStatus) => {
        switch (status) {
            case "Completed":
                return "bg-green-50 text-green-500";
            case "Inprogress":
                return "bg-yellow-50 text-yellow-500";
            default:
                return "bg-red-50 text-red-500";
        }
    };


    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg bg-gray-100/60">
            <div className="flex-1 flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-400 font-light mb-2">{date}</p>
                    <p className="text-md text-gray-700 font-medium">{title}</p>
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
            </div>
            <div
                className={`flex items-center gap-2 px-3 py-1 rounded-md ${getStatusColor(
                    status
                )}`}
            >
                <h6 className="text-sm font-medium">{status}</h6>
            </div>

            {!hideBtn && (
                <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-green-500  group-hover:opacity-100 transition-opacity cursor-pointer">
                        <FaEdit size={22} onClick={onEdit} />
                    </button>
                    <button className="text-gray-400 hover:text-red-500  group-hover:opacity-100 transition-opacity cursor-pointer">
                        <LuTrash2 size={22} onClick={onDelete} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskInfoCard;
