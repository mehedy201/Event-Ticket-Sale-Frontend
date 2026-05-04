import { useForm } from 'react-hook-form';
import { tailwindContainerClasses } from '../../utils/tailwindClasses';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {

    const [
    signInWithEmailAndPassword,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        console.log(email, password)
        const login = signInWithEmailAndPassword(email, password)
        .then((res) => {
        if(res.user){
                navigate('/dashboard/1/10')
            }
        })
    };   
    return (
        <div className={tailwindContainerClasses}>
            <div className='h-screen flex justify-center items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 border min-w-[300px] p-4 rounded-lg border-gray-300 shadow'>
                    <p className='text-center'>Admin</p>
                    <h2 className='text-xl font-bold text-center'>Log In</h2>
                    <input className='border border-gray-300 rounded-md w-full h-10 px-3' {...register('email', { required: true })} type="email" placeholder='eg: aa@gmail.com'/>
                    {errors.email && <p className='text-red-500'>Pleaes Fill Email</p>}
                    <input className='border border-gray-300 rounded-md w-full h-10 px-3' {...register('password', { required: true })} type="password" placeholder='Password'/>
                    {errors.password && <p className='text-red-500'>Pleaes Fill Password</p>}
                    {
                        loading && <p>Loading.......</p>
                    }
                    {
                        error && <p className='text-red-500'>{error}</p>
                    }
                    <button className='cursor-pointer font-semibold' type='submit'>submit</button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;