
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
 const API_URL=`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`
const AppContext=React.createContext();

const AppProvider=({children})=>{
   
    const[isLoading,setLoading]=useState(false)
    const[movie,setMovie]=useState([])
    const[isError,setError]=useState({show:false,msg:""})
const[query,setQuery]=useState("titanic")
    const getMovies=async(url)=>{
        setLoading(true)
try {
    const res=await fetch(url)
    const data=await res.json();
    console.log(data.Search);
    console.log(data);
    if(data.Response==='True'){
        setLoading(false);
        setMovie(data.Search)
        setError({
            show:false,
            msg:''
        })
    }else{
setError({
    show:true,
    msg:data.Error,
})
    }

} catch (error) {
    console.log(error);

}
    }
    useEffect(()=>{
     let timerOut= setTimeout(()=>{
            getMovies(`${API_URL}&s=${query}`);
        },500)
       return ()=>{
        clearTimeout(timerOut)
       }
    },[query])

    return <AppContext.Provider value={{isLoading,isError,movie,query,setQuery}}>
      {children}
    </AppContext.Provider>

}
const useGlobalContext=()=>{
    return useContext(AppContext)
}
export {useGlobalContext ,AppProvider,API_URL}