import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function ProtectedRoute ({children}: {children: JSX.Element}){
    const user = useAppSelector((state) => state.auth.user);

    return user ? children : <Navigate to='/login' replace/>
}