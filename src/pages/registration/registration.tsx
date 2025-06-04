import { useState } from "react";
import {supabase} from '../../supabase/client';
import { useNavigate } from "react-router-dom";
import './registration.css';

export default function Register(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const {error} = await supabase.auth.signUp({
            email,
            password,
        });
        if(error) {alert(error.message);}
        else {
            alert('Check your email to confirm registration');
            navigate('/login');
        }
    };

    const goBack = async () =>{
        navigate('/login');
    };

    return(
        <div className="register">
            <h2>Register an Account</h2>
            <label>Email Address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email"/>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
            <button style={{cursor: 'pointer'}} onClick={handleRegister}>Sign up</button>
            <button style={{cursor: 'pointer'}} onClick={goBack}>I have an account</button>
        </div>
    );
}