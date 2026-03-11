import { Box, Typography } from "@mui/material";
import Chart from "../components/charts.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import ProductDetailsWidget from "../components/productDetailsWidget.js";
import ProductEditWidget from "../components/productEditWidget.js";
import SnackBar from "../components/snackBar.js";



interface Product {
    id: number
    name: string
    price: number
    stock: string
    status: string
    sales: number
    avatar: string
}

export default function ProductDetails() {
    const [chartData, setChartData] = useState([])
    const [productData, setProductData] = useState<Product | null>(null)
    const [input, setInput] = useState({
        nameInput: "",
        status: "",
        stockInput: ""

    })
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [updating, setUpdating] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        axios.get(`https://dashboard-api-production-7f98.up.railway.app/productStats?productId=${id}`)
            .then(
                function (response) {
                    const apiData = response.data
                    setChartData(apiData)
                    setLoading(false)
                })
            .catch(function (error) {
                console.log(error)
                setLoading(false)
            })
    }, [id])

    useEffect(() => {
        axios.get(`https://dashboard-api-production-7f98.up.railway.app/products/${id}`)
            .then(
                function (response) {
                    const apiData = response.data
                    setProductData(apiData)
                    setInput({
                        nameInput: apiData.name,
                        stockInput: apiData.stock,
                        status: apiData.status,

                    })
                    // setLoading(false)
                })
            .catch(function (error) {
                console.log(error)
            })
    }, [id])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setUpdating(true)
        await axios.patch(`https://dashboard-api-production-7f98.up.railway.app/products/${id}`,
            {
                name: input.nameInput,
                active: input.status,
                stock: input.stockInput,

            }
        )
        setProductData(prev => ({
            ...prev!,
            name: input.nameInput,
            stock: input.stockInput,
            status: input.status
        }))

        setSuccess(true)
        setUpdating(false)

    }
    const handleClose = () => {
        setSuccess(false)
    };
    return (
        <Box sx={{
            p: { xs: 2, md: 3 },width:"100%"
        }}>
            <Typography sx={{ fontWeight: 600, fontSize: 20 }}>product details</Typography>
            <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start", flexDirection: { xs: "column", md: "row" } }}>
                {loading ? (<Box sx={{ padding: 3, marginTop: 5, width: { xs: "100%", md: 400 }, display: "flex" }}>
                    <Skeleton variant="text" width={150} height={30} />
                    <Skeleton variant="rectangular" width="300px" height={300} sx={{ borderRadius: 2, marginTop: 1 }} />
                </Box>) : (
                    <Box sx={{ width: { xs: "100%", md: 400 }, display: "flex" }}>
                        <Chart title="Sales Performance (last 3 months)" dataKey="sales" data={chartData} height={120} />
                    </Box>

                )}
                <Box>
                    {productData && (
                        <ProductDetailsWidget id={productData.id} avatar={productData.avatar} name={productData.name} sales={productData.sales} inStock={productData.stock} active={productData.status} />

                    )

                    }
                </Box>
            </Box>
            <Box>
                {loading ? <Skeleton variant="rectangular" width={200} height={300} /> :
                    <ProductEditWidget handleSubmit={handleSubmit} input={input} setInput={setInput} avatar={productData?.avatar} />}
            </Box>
            <SnackBar open={success} message={success ? "Data has been updated" : "faild to edit data"} onClose={handleClose} duration={3000} />

        </Box>
    )

}