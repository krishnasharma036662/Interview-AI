import { useState } from 'react'
import '../auth.form.scss'
import { useNavigate,Link } from 'react-router';
import {useAuth} from '../hook/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const {login,handleLogin} = useAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
           await handleLogin({email,password});
           navigate('/home');
        } catch (error) {
           console.error(error);
       }
    }
    if(loading){
      return <main><h1>Loading...</h1></main>;
    }
  return (
    <main>
      <div>
        <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name='email'/>
        </div>
        <div className="input-group">
            <label htmlFor="password">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name='password'/>
        </div>
        <button className="button primary-btn" type="submit">Login</button>
      </form>
      </div>
    </main>
  )
}

export default Login;
