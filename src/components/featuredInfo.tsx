import { Typography } from "@mui/material";
import {ArrowDownward} from '@mui/icons-material';

export default function FeaturedInfo () {
    return (
        <div style={{boxShadow:"0px 4px 12px rgba(0,0,0,0.1)",padding:"5px",margin:"5px",height:"150px",}}>
            <div>
                <Typography>Revenue</Typography>
                <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                    <Typography>$2,454</Typography>
                    <span>-11.4
                        <ArrowDownward style={{color:"red",fontSize:"15px"}}/>
                    </span>
                </div>
                <p>Compared to last month</p>
                
            </div>
            
        </div>
    )
}