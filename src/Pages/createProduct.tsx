import { Box, Typography, Button } from "@mui/material"
import Alert from '@mui/material/Alert';
import { useState, useEffect } from "react"
import axios from "axios"
export default function CreateProduct() {
    const [input, setinput] = useState({
        nameInput: "",
        priceInput: "",
        stockInput: "",
        categoryInput: "",
        statusInput: "",
    })

    const [create, setcreate] = useState(false)
    const [success, setSuccess] = useState(false)
    const [failed, setFaild] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleClose = () => {
        setSuccess(false)
        setFaild(false)
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault()
        setcreate(true)
        try {
            await axios.post("https://dashboard-api-production-7f98.up.railway.app/products", {
                name: input.nameInput,
                price: Number(input.priceInput),
                stock: Number(input.stockInput),
                category: input.categoryInput,
                status: input.statusInput,
            })
            setSuccess(true)
        }


        catch (err: any) {
            setErrorMessage(err.message)
            setFaild(true)
        }
        finally {
            setcreate(false)
            setinput({
                nameInput: "",
                priceInput: "",
                stockInput: "",
                categoryInput: "",
                statusInput: "",

            })

        }
    }

    useEffect(() => {
        if (success || failed) {
            const timer = setTimeout(() => {
                setSuccess(false)
                setFaild(false)
            }, 2000)
            return () => clearTimeout(timer)
        }

    }, [success, failed])

    return (
        <Box sx={{ padding: 5 }}>
            <Typography fontWeight={600} fontSize={25} sx={{ marginBottom: 3 }}>New Product</Typography>
            <Box>
                <form onSubmit={handleCreateUser} style={{ padding: "5px" }}>
                    <Box sx={{ display: "flex", gap: "30px" }}>
                        <Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Product name</label>
                                <input value={input.nameInput} onChange={(e) => { setinput({ ...input, nameInput: e.target.value }) }}
                                    style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px", width: "300px" }} type="text" />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Price</label>
                                <input value={input.priceInput} onChange={(e) => { setinput({ ...input, priceInput: e.target.value }) }}
                                    style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px" }} type="number" pattern="[0-9]+" />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Stock</label>
                                <input value={input.stockInput} onChange={(e) => { setinput({ ...input, stockInput: e.target.value }) }}
                                    style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px" }} type="number" pattern="[0-9]+" />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Status</label>

                                <select value={input.statusInput} onChange={(e) => { setinput({ ...input, statusInput: e.target.value }) }} style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px" }}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Category</label>

                                <select value={input.categoryInput} onChange={(e) => { setinput({ ...input, categoryInput: e.target.value }) }} style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px" }}>
                                    <option value="electronics">Electronics</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="accessories">Accessories</option>
                                </select>

                            </Box>


                        </Box>

                    </Box>



                    <Button disabled={create} type="submit" variant="contained">{create ? "Creating" : "Create"}</Button>
                </form>
            </Box>
            {success && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 9999
                    }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                    >
                        Product has been successfully created
                    </Alert>
                </Box>
            )}



        </Box>
    )
}