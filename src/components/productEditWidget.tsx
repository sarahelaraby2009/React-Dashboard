import { Box, Typography, Button } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

import Skeleton from '@mui/material/Skeleton';


interface product {
    name: string
    stock: number
    active: string
    avatar: string
}

export default function ProductEditWidget({ handleSubmit, input, setInput, avatar }: any) {

    const [productDetails, setProductDetails] = useState<product | null>(null)

const [open, setOpen] = useState(false);
   
    const [updating, setUpdating] = useState(false)





   




    return (
        <Box sx={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.2)", padding: 3, marginTop: 5, borderRadius: 10 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Edit</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 5, gap: 20 ,flexDirection:{xs:"column",md:"row-reverse"}}}>
                <form onSubmit={handleSubmit} style={{ padding: "2px", marginTop: "5px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                        <label>Username</label>
                        <input value={input.nameInput} onChange={(e) => { setInput({ ...input, nameInput: e.target.value }) }} style={{ border: "none", borderBottom: "1px #888 solid" }} type="text" />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                        <label>Stock</label>
                        <input value={input.stockInput} onChange={(e) => { setInput({ ...input, stockInput: e.target.value }) }} style={{ border: "none", borderBottom: "1px #888 solid" }} type="text" />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                        <label style={{ color: "#888" }}>Active</label>

                        <select value={input.status} onChange={(e) => { setInput({ ...input, status: e.target.value }) }} style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px" }}>
                            <option value="active">yes</option>
                            <option value="inactive">no</option>
                        </select>

                    </Box>

                    <Button disabled={updating} type="submit" variant="contained">{updating ? "updating" : "Update"}</Button>
                </form>
                <Box>
                    <img style={{ width: "200px", borderRadius: "20px" }} src={avatar} alt="product photo" />
                </Box>
              
            </Box>



        </Box>
    )
}