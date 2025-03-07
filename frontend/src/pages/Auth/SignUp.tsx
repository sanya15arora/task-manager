import { useState, FC, FormEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
// import ProfilePicSelector from '../../components/Inputs/ProfilePicSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { isAxiosError } from 'axios';
import { UserContext } from '../../context/UserContext';
// import uploadImage from '../../utils/uploadImage';

const SignUp: FC = () => {

    // const [profilePic, setProfilePic] = useState<File | null>(null);
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const { updateUser } = useContext(UserContext)

    const navigate = useNavigate();


    const handleSignUp = async (e: FormEvent) => {

        e.preventDefault();
        let profileImageUrl = '';
        if (!fullName) {
            setError('Please enter your full name');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!password || password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        setError('');



        try {

            // if (profilePic) {
            //     const imgUploadRes = await uploadImage(profilePic)
            //     profileImageUrl = imgUploadRes.imageUrl || '';
            // }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });

            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token)
                updateUser(user)
                navigate("/");
            }
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.data.message) {
                setError(error.response.data.message)
            }
            else {
                setError("Something went wrong. Please try again.")
            }
        }
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp}>
                    {/* <ProfilePicSelector image={profilePic} setImage={setProfilePic} /> */}

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            type="text"
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                        />
                        <Input
                            label="Email Address"
                            placeholder="john@example.com"
                            type="email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        />
                        <div className='col-span-2'>
                            <Input
                                label="Password"
                                placeholder="Min 8 characters"
                                type="password"
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                    <button type='submit' className='btn-primary'> SIGN UP</button>
                    <p className='text-[13px] text-slate-800 mt-3'> Already have an account ? {" "}
                        <Link className='font-medium text-primary underline' to='/login'>Login</Link>
                    </p>
                </form>

            </div>
        </AuthLayout >
    )
}

export default SignUp