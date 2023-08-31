import axios from "axios";
import { createContext, useEffect, useReducer } from "react";


export const AuthContext=createContext();

const initialState={user:null};

const reducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":
            return {...state,user:action.payload}
        case "LOGOUT":
            return {...state,user:null}
        default:
            return state;
    }
}

const HandleAuthContext=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState);

    const login=(userdata)=>{
        if(userdata.token){
            localStorage.setItem("tmdbToken",JSON.stringify(userdata.token));
        }
        dispatch({
            type:"LOGIN",
            payload:userdata.payload
        })
    }

    const logout=()=>{
        localStorage.removeItem("tmdbToken");
        dispatch({
            type:"LOGOUT"
        })
    }

    useEffect(()=>{
        const token=JSON.parse(localStorage.getItem("tmdbToken"));
        async function CheckUser(){
            if(token){
                const response=await axios.post("http://localhost:4000/movie/getCurrentUser",{token});
                if(response.data.success){
                    dispatch({
                        type:"LOGIN",
                        payload:response?.data?.user
                    })
                }
            }
        }CheckUser();
    },[])
    return(
        <AuthContext.Provider value={{state,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default HandleAuthContext;