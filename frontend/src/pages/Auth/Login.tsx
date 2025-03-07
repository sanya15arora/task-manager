import { useState, FC, FormEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { isAxiosError } from 'axios';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';

const Login: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const { updateUser } = useContext(UserContext)

    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (password.length < 8 || !password) {
            setError('Password must be at least 8 characters');
            return;
        }

        setError('')
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
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

    };

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome back!</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to log in
                </p>
                <form onSubmit={handleLogin}>
                    <Input
                        label="Email Address"
                        placeholder="john@example.com"
                        type="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <Input
                        label="Password"
                        placeholder="Min 8 characters"
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
                    <button type='submit' className='btn-primary'> LOGIN</button>
                    <p className='text-[13px] text-slate-800 mt-3'> Don't have any account ? {" "}
                        <Link className='font-medium text-primary underline' to='/signUp'>SignUp</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
