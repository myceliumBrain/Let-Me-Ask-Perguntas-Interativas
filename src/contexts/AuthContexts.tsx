import { createContext, useState, useEffect, ReactNode } from "react";

import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";


    
    type User = {
        id: string;
        name: string;
        avatar: string;
      }
      
      type authContextType = {
        user: User | undefined;
        signInWithGoogle: ()=>Promise<void>;
      }
      

    type authContextProviderProps = {
        children: ReactNode;
    }

    export const authContext = createContext({} as authContextType); 

    export function AuthContextProvider(props: authContextProviderProps){

        const [user, setUser] = useState<User>();

  useEffect(()=>{
    const auth = getAuth();
    const unsubscribe =onAuthStateChanged(auth, (user) =>{
        if(user){
          const { displayName, photoURL, uid } = user
  
          if(!displayName || !photoURL){
            throw new Error("Missing information from Google account");
          }
  
            setUser({
              id:uid,
              name:displayName,
              avatar:photoURL
            })
  
        }  
    })
  
  
  return ()=>{
    unsubscribe();
  }
  
}, [])

  async function signInWithGoogle(){

    

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);



          if(result.user){
            const { displayName, photoURL, uid } = result.user

            if(!displayName || !photoURL){
              throw new Error("Missing information from Google account");
            }

              setUser({
                id:uid,
                name:displayName,
                avatar:photoURL
              })
          }  
  }

        return(
            <authContext.Provider value={{user, signInWithGoogle}}>
                {props.children}
            </authContext.Provider>
        )
}