import { Box, Typography, Button } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';

interface user {
    id: number
    username: string
    email: string
    status: string
    transaction: number
    avatar: string
    address: string
    phone: string
    birtDate: string
    job: string
}

export default function UserEditDetailsCard() {
    const { id } = useParams()
    const [userDetails, setUserDetails] = useState<user | null>(null)
    const [input, setinput] = useState({
        nameInput: "",
        emailInput: "",
        phoneInput: "",
        addressInput: ""
    })
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [updating, setUpdating] = useState(false)





    const handleClose = () => {
        setSuccess(false)
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setUpdating(true)
        await axios.patch(`https://dashboard-api-production-7f98.up.railway.app/userDetails/${id}`,
            {
                username: input.nameInput,
                email: input.emailInput,
                phone: input.phoneInput,
                address: input.addressInput,
            }
        )
        setSuccess(true)
        setUpdating(false)

    }

    useEffect(() => {

        axios.get(`https://dashboard-api-production-7f98.up.railway.app/userDetails/${id}`)
            .then(function (response) {
                // handle success
                const data = response.data
                setUserDetails(data)
                setinput({
                    nameInput: data.username,
                    emailInput: data.email,
                    phoneInput: data.phone,
                    addressInput: data.address
                })
                setLoading(false)


            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)

            })
    }, [id])

    return (
        <Box sx={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.2)", padding: 3 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Edit</Typography>
            {loading ? <Skeleton variant="rectangular" width={400} height={500} /> : <Box sx={{ display: "flex", justifyContent: "space-between", padding: 5, gap: 5 }}>
                <form onSubmit={handleSubmit} style={{ padding: "2px", marginTop: "5px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                        <label>Username</label>
                        <input value={input.nameInput} onChange={(e) => { setinput({ ...input, nameInput: e.target.value }) }} style={{ border: "none", borderBottom: "1px #888 solid" }} type="text" />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                        <label>Email</label>
                        <input value={input.emailInput} onChange={(e) => { setinput({ ...input, emailInput: e.target.value }) }} style={{ border: "none", borderBottom: "1px #888 solid" }} type="text" />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                        <label>Phone</label>
                        <input value={input.phoneInput} onChange={(e) => { setinput({ ...input, phoneInput: e.target.value }) }} style={{ border: "none", borderBottom: "1px #888 solid" }} type="text" />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                        <label>Adderss</label>
                        <input value={input.addressInput} onChange={(e) => { setinput({ ...input, addressInput: e.target.value }) }} style={{ border: "none", borderBottom: "1px #888 solid" }} type="text" />
                    </Box>
                    <Button disabled={updating} type="submit" variant="contained">{updating ? "updating" : "Update"}</Button>
                </form>
                <Box>
                    <img style={{ width: "200px", borderRadius: "20px" }} src={userDetails?.avatar} alt="user profile photo" />
                </Box>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={5000}
                    open={success}
                    onClose={handleClose}
                    message="Data has been successfully updated"

                />
            </Box>}



        </Box>
    )
}