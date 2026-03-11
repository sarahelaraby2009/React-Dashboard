import { Box } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
export default function SnackBar({open,onClose,message,duration=3000}:any) {
    
   
    return (
        <Box>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={duration}
                open={open}
                onClose={onClose}
                message={message}

            />
        </Box>
    )
}