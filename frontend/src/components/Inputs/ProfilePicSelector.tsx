import { useRef, useState, FC, ChangeEvent } from 'react';
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

interface ProfilePicSelectorProps {
    image: File | null;
    setImage: (image: File | null) => void;
}

const ProfilePicSelector: FC<ProfilePicSelectorProps> = ({ image, setImage }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setPreviewUrl(previewUrl);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            <input type="file" accept='image/*' ref={inputRef} onChange={handleImageChange} className='hidden' />
            {!image ? (<div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
                <LuUser className='text-4xl text-primary' />
                <button type='button'
                    onClick={onChooseFile}
                    className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute bottom-1 -right-1'>
                    <LuUpload />
                </button>
            </div>) :
                (<div className='relative'>
                    <img src={previewUrl || undefined}
                        alt="profile photo"
                        className='w-20 h-20 object-cover rounded-full'
                    />
                    <button type='button'
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute bottom-1 -right-1'
                        onClick={handleRemoveImage}>
                        <LuTrash />
                    </button>

                </div>)
            }

        </div >
    );
};

export default ProfilePicSelector;
