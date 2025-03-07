import { FC } from 'react'

interface DeleteAlertProps {
    content: string;
    onDelete: () => void;
}
const DeleteAlert: FC<DeleteAlertProps> = ({ content, onDelete }) => {
    return (
        <div>
            <p className='text-sm text-gray-500'>
                {content}
            </p>
            <div className='flex justify-end mt-6'>
                <button type='button' className='form-btn' onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert