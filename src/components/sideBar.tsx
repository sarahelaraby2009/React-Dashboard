import { Box, Typography, Button } from "@mui/material";
import {
    Home, TrendingUp, Timeline, PermIdentity, Storefront, AttachMoney,
    StackedBarChart, MailOutline, DynamicFeed, ChatBubbleOutline, WorkOutline, ReportGmailerrorred, Menu
} from '@mui/icons-material';
import { Link, NavLink } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";


interface SideBarItem {
    icon: React.ReactNode,
    label: string
}
interface SideBarSection {
    title: string,
    items: SideBarItem[]
}

const sidebarData: SideBarSection[] = [
    {
        title: "Dashboard",
        items: [
            { icon: <Home />, label: "Home" },
            { icon: <TrendingUp />, label: "Analytics" },
            { icon: <Timeline />, label: "Sales" },
        ],
    },
    {
        title: "Quick Menu",
        items: [
            { icon: <PermIdentity />, label: "Users" },
            { icon: <Storefront />, label: "Products" },
            { icon: <AttachMoney />, label: "Transactions" },
            { icon: <StackedBarChart />, label: "Reports" },
        ],
    },
    {
        title: "Notifications",
        items: [
            { icon: <MailOutline />, label: "Mail" },
            { icon: <DynamicFeed />, label: "Feedback" },
            { icon: <ChatBubbleOutline />, label: "Messages" },
        ],
    },
    {
        title: "Staff",
        items: [
            { icon: <WorkOutline />, label: "Manage" },
            { icon: <TrendingUp />, label: "Analytics" },
            { icon: <ReportGmailerrorred />, label: "Reports" },
        ],
    },
];

const itemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer"
}


export default function SideBar() {
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
const [open, setOpen] = useState(false);
const toggleDrawer = (newOpen:any) => () => {
    setOpen(newOpen);
  };
  const sidBarContent = (
    <Box sx={{ width: 250, height: "100vh", scrollBehavior: "smooth", overflowY: "auto", scrollbarWidth: "thin", textAlign: "center", padding: "10px", color: "#858585", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
        <div style={{ marginBottom: "10px" }}>
            {sidebarData.map((d, index) => {
                return (
                    <Box key={index}>
                        <Typography variant="h2" sx={{ fontSize: "15px", textAlign: "left", padding: "10px" }}>{d.title}</Typography>
                        <ul style={{ listStyle: "none", textAlign: "left", fontSize: "12px", cursor: "pointer" }}>
                            {d.items.map((item, i) =>
                            (<li style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "5px" }} key={i}>
                                <NavLink onClick={()=>setOpen(false)} style={{ display: "flex", alignItems: "center", gap: "5px", textDecoration: "none", color: "inherit" }}
                                    to={item.label === "Users" ? "/users" : item.label === "Products" ? "/products" : "/"}>
                                    {item.icon}
                                    {item.label}
                                </NavLink>

                            </li>))}

                        </ul>
                    </Box>)
            })}

        </div>
    </Box>
)
    return (
        <>
        {
            isMobile?(
                <>
                 <IconButton  sx={{
    position: "absolute",
    top: 12,
    left: 10,
    zIndex: 1100
  }} onClick={toggleDrawer(true)}>
                <Menu/>
               </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {sidBarContent}
      </Drawer>
                </>
              
            ) : sidBarContent
        }
        </>
    )
}