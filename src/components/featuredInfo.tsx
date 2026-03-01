import { Typography, Box } from "@mui/material";
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

export default function FeaturedInfo() {
    interface Info {
        amount: number,
        ratio: number
    }
    interface FeatureSection {
        title: string,
        amount: number,
        ratio: number
    }
    const featureData: FeatureSection[] = [
        {
            title: "Revenue",

            amount: 2454,
            ratio: -11.4




        },
        {
            title: "sales",
            amount: 4454,
            ratio: -1.4

        },



        {
            title: "Cost",
            amount: 2023,
            ratio: 2.1

        }
    ]





    return (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "space-around", alignItems: "center",padding:3 }}>
            {featureData.map((d, index) => {
                const isPositive = d.ratio > 0

                return (
                    <Box
                        key={index}
                        sx={{
                            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                            p: 3,
                            width: 250,
                            borderRadius: 3,
                            margin: "10px"
                        }}
                    >
                        <Typography sx={{ fontSize: 20, color: "#888" }}>
                            {d.title}
                        </Typography>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 1
                        }}>
                            <Typography sx={{ fontSize: 22, fontWeight: "bold" }}>
                                ${d.amount}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{
                                    fontSize: 14,
                                    color: isPositive ? "green" : "red"
                                }}>
                                    {d.ratio}
                                </Typography>

                                {isPositive ? (
                                    <ArrowUpward sx={{ color: "green", fontSize: 16 }} />
                                ) : (
                                    <ArrowDownward sx={{ color: "red", fontSize: 16 }} />
                                )}
                            </Box>
                        </Box>

                        <Typography sx={{ fontSize: 12, color: "#aaa", mt: 1 }}>
                            Compared to last month
                        </Typography>
                    </Box>
                )
            })}
        </Box>
    )
}