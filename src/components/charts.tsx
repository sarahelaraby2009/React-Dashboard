import { Box, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataProp{
    name:string
    [key:string]:string|number
}
interface ChartProps {
    title:string,
    dataKey:string,
    data:DataProp[]
}
export default function Chart({title,dataKey,data}:ChartProps) {
    return (
        <Box sx={{ backgroundColor: "#ffff", marginTop: 2, width: "100%",padding:3 }}>
            <Typography sx={{fontWeight:600,padding:3}}>{title}</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                   
                    data={data}
                    margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />


                </LineChart>
            </ResponsiveContainer>

        </Box>
    )
}