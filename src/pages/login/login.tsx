import { useDispatch} from "react-redux";
import { setUser } from "../../redux/authSlice";
import { useState } from "react";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import './login.css';

export default function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () =>{
        const { data, error} =await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if(error){ alert(error.message);}
        else {
            dispatch(setUser(data.user));
            navigate('/home', {replace: true});
        }
    };

    const register = async () =>{
        navigate('/registration');
    };

    return(
        <div className="login">
            <h2>Login</h2>
            <div className="email">
                <label>Email Address</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email Address"/>
            </div>
            <div className="password">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"/>
            </div>
            <div>
                <button onClick={handleLogin}>Log in</button>
            </div>
            <hr style={{border: '1px solid black'}}></hr>
            <div>
                <button style={{cursor: 'pointer'}} onClick={register}>Register an account</button>
            </div>
        </div>
    );
}