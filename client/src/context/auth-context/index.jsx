/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import { initialSignInFormData, initialSignUpFormData } from '@/config';
import {registerService, loginService, checkAuth } from '@/services';
import { Skeleton } from '@/components/ui/skeleton';
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {  
    const [signInFormData,  setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData,  setSignUpFormData] = useState(initialSignUpFormData);

    const [auth, setAuth] = useState({
        authenticate: false,
        user: null
    })

    const [loading, setLoading] = useState(true);

    async function handleRegisterUser(event) {
        event.preventDefault();
        const data = await registerService(signUpFormData);
        console.log(data);
    }
    async function handleLoginUser(event) {
        event.preventDefault();
        const data = await loginService(signInFormData);
        console.log(data);
        if(data.data.success)
        {
            console.log("set Session thành công")
            sessionStorage.setItem('accessToken', JSON.stringify(data.data.data.accessToken));
            setAuth({
                authenticate: true,
                user: data.data.data.user
            })
            console.log("checkAuth", data.data.data.user)
        }else{
            setAuth({
                authenticate: false,
                user: null
            })
            console.log("data_success: ",data.data.success)
        }
    }
    async function checkAuthUser(){
        try{
            const data = await checkAuth();
            console.log("data in checkAuth", data);
            if(data.data.success)
            {
                console.log("check Auth thành công")
                setAuth({
                    authenticate: true,
                    user: data.data.data.user
                });
                setLoading(false);
            }
            else{
                console.log("check Auth ko thành công")
                setAuth({
                    authenticate: false,
                    user: null
                })
                setLoading(false);
        }
        }catch(error){
            console.log(error)
            console.log("check Auth ko thành công")
            setAuth({
                authenticate: false,
                user: null
            })
            setLoading(false);
        }
        
    }
    function resetCredentials(){
        setAuth({
            authenticate: false,
            user: null
        })
    }
    useEffect(()=>{
        checkAuthUser();
    },[])
    console.log(auth)
    return <AuthContext.Provider value={
        {signInFormData,  setSignInFormData, signUpFormData,  setSignUpFormData, 
            handleLoginUser,handleRegisterUser, auth, resetCredentials
        }
    }>{loading ? <Skeleton/> : children}
    </AuthContext.Provider>;
}