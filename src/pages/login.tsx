import {auth,provider} from '../config/firebase'
import { signInWithPopup } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
export const Login=()=>{
    const navigate = useNavigate();
    const signInWithGoogle=async () =>{
        const result = await signInWithPopup(auth,provider);
        navigate("/");
        
    }
    return (<div>
        <p>Sign in with Google to continue</p>
        <button className='text-2xl border-2 bg-blue-300 text-amber-50' onClick={signInWithGoogle}>Sign In with google</button>
    </div>)
}