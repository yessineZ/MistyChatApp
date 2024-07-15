import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignUp from "../../hooks/useSignUp";

const SignUp = () => {
	const [input,setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    email: "",
	
  }); 
  const { signup , loading } = useSignUp() ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup(input) ; 
  };

  const handleCheckedboxChange = (gender) => {
    setInputs({...input, gender });
  }
  return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input value={input.fullName} onChange={(e) => setInputs({
              ...input , 
              fullName: e.target.value
            })} type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input value={input.username} onChange={(e) => setInputs({
              ...input , 
              username: e.target.value
            })} type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
					</div>

          <div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Email</span>
						</label>
						<input value={input.email} onChange={(e) => setInputs({
              ...input , 
              email: e.target.value
            })} type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input value={input.password} onChange={(e) => setInputs({
              ...input , 
              password: e.target.value
            })}
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input value={input.confirmPassword} onChange={(e) => setInputs({
              ...input , 
              confirmPassword: e.target.value
            })}
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
						/>
					</div>

					<GenderCheckbox handleChecked={handleCheckedboxChange} genderInput={input.gender} />

					<Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
						Already have an account?
					</Link>

					<div>
						<button disabled={loading} className='btn btn-block btn-sm mt-2 border border-slate-700'>{loading ? <span className="loading loading-spinner"></span> : "Sign Up"}</button>
					
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;