import auth from "@/Firebase/firebase.config";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider  = new GoogleAuthProvider()
    const axiosPublic =  useAxiosPublic()


    const handleSignUp = (email, password)=>{
        setLoading(false)
        return createUserWithEmailAndPassword(auth,email, password);
    }


    const handleLogin = (email, password)=>{
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleUpdateProfile =(name, photo)=>{
        return updateProfile(auth.currentUser, {
           displayName: name,
           photoURL: photo
         })
       }


    const handleLogout = ()=>{
        return signOut(auth)
       }

       const handleSocialLogin =()=>{
        return signInWithPopup(auth, provider)
       }


       useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email:currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
                setLoading(false)
            }else{
                localStorage.removeItem('access-token');
            }
        })
        return ()=>{
            return unsubscribe()
        }
       },[axiosPublic])



    const authInfo ={
        loading,
        user,
        handleSignUp,
        handleLogin,
        handleUpdateProfile,
        handleLogout,
        handleSocialLogin
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;