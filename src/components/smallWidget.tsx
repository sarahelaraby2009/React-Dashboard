import { Box, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useEffect, useState } from "react";
import axios from "axios";

interface members{
    id:number
    name:string
    title:string
    img:string
}
export default function SmallWidget() {
    const[memberData,setMemberData]=useState([])
    useEffect(() => {
axios.get('https://dashboard-api-production-7f98.up.railway.app/members')
  .then(function (response) {
    // handle success
    const data=response.data
    setMemberData(response.data)
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
   
  })
    },[])
    return (
        
        <Box sx={{ padding: 3, marginTop: 5,boxShadow: "0px 5px 15px rgba(0,0,0,0.2)", height: 400,
  overflow: "auto",scrollbarWidth:"thin" }}>
            <Typography sx={{ fontSize: 20 ,fontWeight:600 }}>New Join Members</Typography>
            {memberData.map((m:members) => (
              <Box key={m.id} sx={{ padding: 1, display: "flex", alignItems: "center",gap:1 }}>
                <Avatar alt="Remy Sharp" src={m.img} />
                <Box sx={{ padding: 1 }}>
                    <Typography sx={{ fontSize: 16 }}>{m.name}</Typography>
                    <Typography sx={{ fontSize: 14, color: "#888" }}>{m.title}</Typography>
                </Box>
                <Button sx={{backgroundColor:"#acacac",height:22,fontSize:12}} variant="contained" endIcon={<RemoveRedEyeIcon />}>
                    Display
                </Button>

            </Box>  
            ))}
            
        </Box>
    )
}