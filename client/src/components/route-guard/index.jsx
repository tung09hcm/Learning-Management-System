import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RouteGuard({authenticated, user, element}){
    const location = useLocation();
    console.log(authenticated, user)
    if(!authenticated && !location.pathname.includes('/auth'))
    {
        return <Navigate to='/auth'></Navigate>
    }
    if(authenticated && user?.role !== 'instructor' 
        && (location.pathname.includes('instructor') || location.pathname.includes('/auth')))
    {
        return <Navigate to='/home'></Navigate>
    }
    if(authenticated && user.role === 'instructor' && !location.pathname.includes('/instructor'))
    {
        return <Navigate to='/instructor'></Navigate>
    }
    return <Fragment>{element}</Fragment>
}   
export default RouteGuard;