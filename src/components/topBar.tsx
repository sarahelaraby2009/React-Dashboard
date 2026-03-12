import { NotificationsNone, Language, Settings, Search } from '@mui/icons-material';
import { Badge, IconButton, Box, TextField, InputAdornment } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
interface TopBarProps {
    onSearch: (value: string) => void
}
export default function TopBar({ onSearch }: any) {
    const [search, setSearch] = useState("")
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                p: { xs: 1, sm: 1.5 },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                backgroundColor: "white",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                position: "sticky",
                top: 0,
                zIndex: 1000,
                overflow:"hidden"
            }}
        >

            <div>
                <img src="./logo.png" style={{ height: "40px" }} alt="logo of admin panel" />
            </div>

            <TextField
                placeholder="Search users, products..."
                size="small"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    onSearch(e.target.value)
                }}
                sx={{
                    order: { xs: 3, md: 2 },
                    width: { xs: "100%", sm: "250px", md: "350px" },
                    mt: { xs: 1, md: 0 },
                    backgroundColor: "#f5f6fa",
                    borderRadius: 10
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    )
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 0.5, sm: 1, md: 2 },
                    order: { xs: 2, md: 3 }
                }}
            >
                <IconButton sx={{ p: { xs: 0.5, sm: 1 } }}>
                    <Badge badgeContent={2} color="error">
                        <NotificationsNone />
                    </Badge>
                </IconButton>


                <IconButton sx={{ display: { xs: "none", sm: "flex" }, p: { xs: 0.5, sm: 1} }}>
                    <Badge badgeContent={2} color="error">
                        <Language />
                    </Badge>
                </IconButton>
                <IconButton sx={{ p: { xs: 0.5, sm: 1}, display: { xs: "none", md: "flex" } }}>
                    <Settings />
                </IconButton>
                <div>
                    <Avatar alt="Remy Sharp" src="./user.webp" />

                </div>

            </Box>


        </Box>
    )
}