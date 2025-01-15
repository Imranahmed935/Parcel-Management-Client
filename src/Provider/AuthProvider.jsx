import auth from "@/Firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useState } from "react";

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const handleSignUp = (email, password)=>{
        setLoading(false)
        return createUserWithEmailAndPassword(auth,email, password);
    }


    const handleLogin = (email, password)=>{
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }



    const authInfo ={
        loading,
        user,
        handleSignUp,
        handleLogin
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;