import { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
export default function SignUp() {
  const[formdata,setformdata]=useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange=(e)=>{
    setformdata({...formdata,[e.target.id]:e.target.value,      
    });
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();  //prevent to refresh the page on click button
    try{
      setLoading(true);
      const resp=await fetch('/api/auth/signup',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formdata),
      });

      const data=await resp.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signIn');
    }
    catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  
    return (
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
          <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
          <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign Up'}</button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className='text-blue-700'>Sign in</span>
          </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    );
  }