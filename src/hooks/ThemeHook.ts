import {  createTheme  } from '@mui/material';
import { useEffect, useMemo, useState } from 'react'

export default function useThemeMode (){
    const [mode,setMode]=useState<"light" |"dark">(()=>{
        const savedMode=localStorage.getItem("currentMode")
        return savedMode==="dark" ?"dark" :"light"
    })

    const theme=useMemo(()=>{
      return  createTheme({
            palette:{
                mode:mode
            }
        })
    },[mode])

    useEffect(()=>{
        localStorage.setItem("currentMode",mode)
    },[mode])

    const toggleTheme=()=>{
        setMode(mode==="light" ?"dark" : "light")
    }

    return {mode,theme,toggleTheme}
}