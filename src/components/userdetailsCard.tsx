import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import type { IconButtonProps } from "@mui/material/IconButton";
import { red } from '@mui/material/colors';
import { Box,Typography } from '@mui/material';
import {Person,CalendarMonth,PhoneAndroid,Mail,LocationOn} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

interface user {
    id:number
    username:string
    email:string
    status:string
    transaction:number
    avatar:string
    address:string
    phone:string
    birtDate:string
    job:string
}

export default function UserDetailsCard() {
    const {id}=useParams()
     const [userDetails,setUserDetails]=useState <user |null>(null)
 

  useEffect(() => {

     axios.get(`https://dashboard-api-production-7f98.up.railway.app/userDetails/${id}`)
            .then(function (response) {
                // handle success
                const data = response.data
                setUserDetails(data)
               

            })
            .catch(function (error) {
                // handle error
                console.log(error);
               

            }) 
  },[id])
if(!userDetails){
  return(
    <div>Loading...</div>
  )
}
  return (
    <Card sx={{ width:"300px" }}>
      <CardHeader
      sx={{fontSize:20}}
        avatar={
          <Avatar sx={{ width: 60, height: 60 }} alt="Travis Howard" src={userDetails?.avatar}/>
        }
      
        title={userDetails?.username}
        subheader={userDetails?.job}
         titleTypographyProps={{
    fontSize: 18,
    fontWeight: 600
  }}
  subheaderTypographyProps={{
    fontSize: 14,
    color: "gray"
  }}
      />
      <Box sx={{padding:3}}>
        <Typography sx={{fontWeight:600,color:"#888",fontSize:20,marginBottom:2}}>Account Details</Typography>
        <Box sx={{display:"flex",gap:1,alignItems:"center"}}>
          <Person sx={{color:"#888",fontSize:13,fontWeight:300}}/>
          <Typography sx={{color:"#888",fontSize:15,fontWeight:300,marginBottom:2}}>{userDetails?.username}</Typography>
        </Box>
        <Box sx={{display:"flex",gap:1,alignItems:"center"}}>
          <CalendarMonth sx={{color:"#888",fontSize:13,fontWeight:300}}/>
          <Typography sx={{color:"#888",fontSize:15,fontWeight:300,marginBottom:2}}>{userDetails.birtDate}</Typography>
        </Box>
       
      </Box>
      <Box sx={{padding:3}}>
        <Typography sx={{fontWeight:600,color:"#888",fontSize:20,marginBottom:2}}>Contact</Typography>
        <Box sx={{display:"flex",gap:1,alignItems:"center"}}>
          <PhoneAndroid sx={{color:"#888",fontSize:13,fontWeight:300}}/>
          <Typography sx={{color:"#888",fontSize:15,fontWeight:300,marginBottom:2}}>{userDetails?.phone}</Typography>
        </Box>
        <Box sx={{display:"flex",gap:1,alignItems:"center"}}>
          <Mail sx={{color:"#888",fontSize:13,fontWeight:300}}/>
          <Typography sx={{color:"#888",fontSize:15,fontWeight:300,marginBottom:2}}>{userDetails?.email}</Typography>
        </Box>
        <Box sx={{display:"flex",gap:1,alignItems:"center"}}>
          <LocationOn sx={{color:"#888",fontSize:13,fontWeight:300}}/>
          <Typography sx={{color:"#888",fontSize:15,fontWeight:300,marginBottom:2}}>{userDetails?.address}</Typography>
        </Box>
       
      </Box>
   
    </Card>
  );
}