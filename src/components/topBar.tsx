import { NotificationsNone, Language, Settings } from '@mui/icons-material';
import { Badge, IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
export default function TopBar() {
    return (
        <div style={{ display: "flex", padding: "10px", justifyContent: "space-between", alignItems: "center",
        width:"100%",backgroundColor:"white",boxShadow:"0px 4px 12px rgba(0,0,0,0.1)",
        position:"sticky",
        top:"0",zIndex:"1000"
        
        }}>

            <div>
                <img src="./logo.png" style={{ height: "40px" }} alt="logo of admin panel" />
            </div>

            <div style={{display:"flex"}}>
                <IconButton>
                    <Badge badgeContent={2} color="error">
                        <NotificationsNone />
                    </Badge>
                </IconButton>


                <IconButton>
                    <Badge badgeContent={2} color="error">
                        <Language />
                    </Badge>
                </IconButton>
                <IconButton>
                    <Settings />
                </IconButton>
                <div>
                    <Avatar alt="Remy Sharp" src="./user.webp" />

                </div>
                
            </div>
        

        </div>
    )
}