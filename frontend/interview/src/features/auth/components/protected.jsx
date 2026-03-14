import {useAuth} from '../hook/useAuth';
import { Navigate } from 'react-router';

const Protected = ({children}) => {
    const {user,loading} = useAuth();
    if(loading){
        return <main><h1>Loading...</h1></main>;
    }
    if(!user){
        return <Navigate to="/login" />;
    }
 return(
    <main>
        {children}
    </main>
 )
}

export default Protected;