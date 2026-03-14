import { useState } from 'react'
import '../auth.form.scss'
import {useAuth} from '../hook/useAuth';
import e from 'express'
import { useNavigate } from 'react-router'; 


const Register = () => {
  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const handleSubmit=async (e)=>{
    e.preventDefault();
    await handleRegister({username,email,password});
    navigate('/home');
  }
  if (loading){
    return <main><h1>Loading...</h1></main>;
  }
  return (
    <div>

      <main>
      <div>
        <h1>REGISTER</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name='email'/>
        </div>
        <div className="input-group">
            <label htmlFor="username">Username</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" name='username'/>
        </div>
        <div className="input-group">
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name='password'/>
        </div>
        <button className="button primary-btn" type="submit">register</button>
      </form>
      <p>already have an account? <a href="/login">Login</a></p>
      </div>
    </main>
    </div>
  )
}

export default Register;
