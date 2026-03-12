import FeaturedInfo from "../components/featuredInfo.js";
import Chart from "../components/charts.js";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import SmallWidget from "../components/smallWidget.js";
import LargWidget from "../components/largWidget.js";



export default function Home() {
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {

    axios.get('https://dashboard-api-production-7f98.up.railway.app/userStates')
      .then(function (response) {
        // handle success
        const data = response.data
        setChartData(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setLoading(false)
      })
  }, [])
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, width: "100%", maxWidth: 1200,
    mx: "auto" }}>

      <FeaturedInfo />
      {loading ? (<Box sx={{ padding: 3, marginTop: 5 }}>
        <Skeleton variant="text" width={150} height={30} />
        <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2, marginTop: 1 }} />
      </Box>) : (
        <Box sx={{ width: "100%" }}>
          <Chart data={chartData} dataKey="ActiveUsers" title='User Analytics' height={250} />
        </Box>)
      }
      <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" }, mt: 3 }}>
        <Box sx={{ flex: 1,width:"100%" }}>
          <SmallWidget />
        </Box>

        <Box sx={{ flex: 2,width:"100%"  }}>
          <LargWidget />
        </Box>
      </Box>


    </Box>
  )
}