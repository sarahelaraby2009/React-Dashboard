import { Box, Typography } from "@mui/material";
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
    return (
        <Box sx={{ padding: 3, marginTop: 5, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",height: "100%",
    display: "flex",
    flexDirection: "column" }}>
            <Typography sx={{ fontSize: 20 ,fontWeight:600 }}>Latest transactins</Typography>
            <TableContainer sx={{ flex: 1 }} component={Paper}>
                <Table sx={{ minWidth: 650,height:"100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight:600}}>customer</TableCell>
                            <TableCell sx={{fontWeight:600}} align="left">Date</TableCell>
                            <TableCell sx={{fontWeight:600}} align="left">Amount</TableCell>
                            <TableCell sx={{fontWeight:600}} align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionData.map((t: transactions) => (
                            <TableRow
                                key={t.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{fontWeight:600}} component="th" scope="row">
                                    {t.customer}
                                </TableCell>
                                <TableCell align="left">{t.date}</TableCell>
                                <TableCell align="left">{t.amount}</TableCell>
                                <TableCell > <Typography sx={{padding:1,width:80, fontSize:12,textAlign:"c",color:t.status=="Approved" ? "green" : t.status==="Declined" ? "red" : "blue",backgroundColor:t.status=="Approved" ? "#e5faf2" : t.status==="Declined" ? "#fff0f1" : "#ebf1fe",borderRadius:3}} align="left">
                                    {t.status}
                                    </Typography></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}