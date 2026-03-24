import { Box, Typography, useTheme } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataProp{
    name:string
    [key:string]:string|number
}
interface ChartProps {
    title:string,
    dataKey:string,
    data:DataProp[]
    height?:number
}
export default function Chart({title,dataKey,data,height=300}:ChartProps) {
    const theme = useTheme();
    const strokeColor = theme.palette.mode === "light" ? "#8884d8" : "#90caf9";
    const textColor = theme.palette.text.secondary;
    
    return (
        <Box sx={{ 
            backgroundColor: theme.palette.background.paper, 
            marginTop: 2, 
            width: "100%",
            maxWidth: "900px",
            mx: "auto",
            p:{xs:2, md:3},
            boxSizing:"border-box",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            borderRadius:10 
        }}>
            <Typography sx={{fontWeight:600,pb:2, color: theme.palette.text.primary}}>{title}</Typography>
            <ResponsiveContainer width="100%" height={height}>
                <LineChart
                   
                    data={data}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: textColor }}
  interval="preserveStartEnd" />
                    <YAxis tick={{ fontSize: 12, fill: textColor }} />
                    <Tooltip />
                    <Legend  wrapperStyle={{
    fontSize: 12,
    color: textColor
  }} />
                    <Line type="monotone" dataKey={dataKey} stroke={strokeColor} activeDot={{ r: 8 }} />


                </LineChart>
            </ResponsiveContainer>

        </Box>
    )
}