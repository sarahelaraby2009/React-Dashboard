import { NotificationsNone, Language, Settings, Search } from '@mui/icons-material';
import { Badge, IconButton, Box, TextField, InputAdornment } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState } from 'react';
interface TopBarProps {
    onSearch: (value: string) => void
    mode: "light" | "dark"
    toggleTheme: () => void
    
}
export default function TopBar({ onSearch, mode, toggleTheme }: TopBarProps) {
    const [search, setSearch] = useState("")
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                p: { xs: 1, sm: 1.5 },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: { xs: 0.5, sm: 1 },
                minHeight: "64px",
                backgroundColor: (theme) => theme.palette.background.default,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                position: "sticky",
                top: 0,
                zIndex: 1000,
            }}
        >

            <div>
                <img src="/logo.png" style={{ height: "40px" }} alt="logo of admin panel" />
            </div>

            <TextField
                placeholder="Search users, products..."
                size="small"
                variant="outlined"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    onSearch(e.target.value)
                }}
                sx={{
                    flex: { xs: "1 1 calc(100% - 60px)", sm: "0 0 auto", md: "0 0 auto" },
                    width: { sm: "250px", md: "350px" },
                    mt: { xs: 1, md: 0 },
                    ml: { xs: 1, md: 0 },
                    backgroundColor: (theme) => theme.palette.background.paper,
                    borderRadius: "10px",
                    minWidth: "200px",
                    order: { xs: 3, md: 2 },
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                    }
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LightModeIcon />

                    <Switch checked={mode === "dark"} onChange={toggleTheme} />

                    <DarkModeIcon />
                </Box>

                <IconButton sx={{ p: { xs: 0.5, sm: 1 } }}>
                    <Badge badgeContent={2} color="error">
                        <NotificationsNone />
                    </Badge>
                </IconButton>


                <IconButton sx={{ display: { xs: "none", sm: "flex" }, p: { xs: 0.5, sm: 1 } }}>
                    <Badge badgeContent={2} color="error">
                        <Language />
                    </Badge>
                </IconButton>
                <IconButton sx={{ p: { xs: 0.5, sm: 1 }, display: { xs: "none", md: "flex" } }}>
                    <Settings />
                </IconButton>
                <div>
                    <Avatar alt="Remy Sharp" src="/user.webp" />

                </div>

            </Box>


        </Box>
    )
}