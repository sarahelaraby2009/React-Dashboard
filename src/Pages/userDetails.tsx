import { Box } from "@mui/material";
import UserDetailsCard from "../components/userdetailsCard.js";
import UserEditDetailsCard from "../components/userEditDetailsCard.js";

export default function UserDetails() {
 
  return (
   <Box sx={{display:"flex" ,gap:2,padding:5,marginTop:2,justifyContent:"space-around"}}>
    <UserDetailsCard/>
    <UserEditDetailsCard/>
   </Box>
  );
}