import { Box, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';

interface widgetData{
    id:number
    avatar:string
    name:string
    sales:number
    active:string
    inStock:string
}
export default function ProductDetailsWidget({id,avatar,name,sales,active,inStock}:widgetData) {
    return (
        <Box sx={{ backgroundColor: "#ffff", marginTop: 2, width: {xs:"100%",md:500}, padding: 5, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)", borderRadius: 10 }}>
            <Box sx={{ display: "flex", gap: 3,marginBottom:3 }}>
                <Avatar alt="product avatar" src={avatar} />
                <Typography>{name}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Id:</Typography>
                <Typography sx={{ color: "#888" }}>{id}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Sales:</Typography>
                <Typography sx={{ color: "#888" }}>{sales}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Active:</Typography>
                <Typography sx={{ color: "#888" }}>{active}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>In Stock:</Typography>
                <Typography sx={{ color: "#888" }}>{inStock}</Typography>
            </Box>
        </Box>
    )
}