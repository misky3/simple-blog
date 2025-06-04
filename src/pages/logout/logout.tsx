import { useDispatch } from 'react-redux';
import { supabase } from "../../supabase/client";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(logout());
        navigate('/login', {replace: true});
    };

    const handleBack = async () =>{
        navigate('/home');
    };

    return(
        <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height: '50vh' }}>
            <div style={{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height: '50vh', gap: '10px' }}>
                <h2>You will be leaving. Are you sure?</h2>
                <button style={{cursor: 'pointer'}} onClick={handleLogout}>Yes</button>
                <button style={{cursor: 'pointer'}} onClick={handleBack}>No, take me back home</button>
            </div>
        </div>
    ); 
}