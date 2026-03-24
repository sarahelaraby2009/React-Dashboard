import { Box, Typography, useTheme } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import axios from "axios";


interface transactions {
    id: number
    customer: string
    date: string
    amount: string
    status: string
}
export default function LargWidget() {
    const theme = useTheme();
    const [transactionData, setTransactionData] = useState([])
    useEffect(() => {
        axios.get('https://dashboard-api-production-7f98.up.railway.app/transactions')
            .then(function (response) {
                // handle success
                const data = response.data
                setTransactionData(response.data)

            })
            .catch(function (error) {
                // handle error
                console.log(error);

            })
    }, [])

    const getStatusColor = (status: string) => {
        switch(status) {
            case "Approved":
                return { color: "green", backgroundColor: theme.palette.mode === "light" ? "#e5faf2" : "#1b4d3e" };
            case "Declined":
                return { color: "red", backgroundColor: theme.palette.mode === "light" ? "#fff0f1" : "#4d1b24" };
            default:
                return { color: "blue", backgroundColor: theme.palette.mode === "light" ? "#ebf1fe" : "#1b2d4d" };
        }
    }

    return (
        <Box sx={{
            padding: 3, marginTop: 5, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.paper
        }}>
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Latest transactins</Typography>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                {transactionData.map((t: transactions) => (
                    <Box key={t.id}
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                            mb: 2,
                            backgroundColor: theme.palette.background.paper
                        }}
                    >
                        <Typography sx={{ fontWeight: 600 }}>
                            {t.customer}
                        </Typography>

                        <Typography sx={{ fontSize: 13, color: theme.palette.text.secondary }}>
                            {t.date}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 1,
                                 alignItems: "center",
                            }}
                        >
                            <Typography sx={{ fontWeight: 600 }}>
                                ${t.amount}
                            </Typography>

                            <Typography
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 2,
                                    fontSize: 12,
                                    ...getStatusColor(t.status)
                                }}
                            >
                                {t.status}
                            </Typography>
                        </Box>
                    </Box>))}
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }}>

                <TableContainer sx={{ flex: 1 }} component={Paper}>
                    <Table sx={{ minWidth: 650, height: "100%" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>customer</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="left">Date</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="left">Amount</TableCell>
                                <TableCell sx={{ fontWeight: 600 }} align="left">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactionData.map((t: transactions) => (
                                <TableRow
                                    key={t.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ fontWeight: 600 }} component="th" scope="row">
                                        {t.customer}
                                    </TableCell>
                                    <TableCell align="left">{t.date}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="left">${t.amount}</TableCell>
                                    <TableCell> <Typography sx={{ padding: 1, width: 80, fontSize: 12, textAlign: "center", ...getStatusColor(t.status), borderRadius: 3 }} align="left">
                                        {t.status}
                                    </Typography></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Box>
    )
}