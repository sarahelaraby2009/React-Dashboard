
import { Box, Typography, Button } from "@mui/material"
import Alert from '@mui/material/Alert';
import { useState,useEffect } from "react"
import axios from "axios"
export default function CreateUser() {
    const [input, setinput] = useState({
        nameInput: "",
        fullNameInput: "",
        emailInput: "",
        phoneInput: "",
        addressInput: "",
        genderInput: "male",
        status: "active",
        birthDateInput: ""
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
            await axios.post("https://dashboard-api-production-7f98.up.railway.app/userDetails", {
                username: input.nameInput,
                fullName: input.fullNameInput,
                address: input.addressInput,
                status: input.status,
                gender: input.genderInput,
                email: input.emailInput,
                phone: input.phoneInput,
                birtDate: input.birthDateInput
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
                fullNameInput: "",
                emailInput: "",
                phoneInput: "",
                addressInput: "",
                genderInput: "male",
                status: "active",
                birthDateInput: ""
            })

        }
    }

    useEffect(()=>{
        if(success||failed){
            const timer=setTimeout(()=>{
                setSuccess(false)
                setFaild(false)
            },2000)
            return ()=>clearTimeout(timer)
        }

    },[success,failed])

    return (
        <Box sx={{ padding: 5 }}>
            <Typography fontWeight={600} fontSize={25} sx={{ marginBottom: 3 }}>New User</Typography>
            <Box>
                <form onSubmit={handleCreateUser} style={{ padding: "5px" }}>
                    <Box sx={{ display: "flex", gap: "30px",flexDirection:{xs:"column",md:"row"} }}>
                        <Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Username</label>
                                <input value={input.nameInput} onChange={(e) => { setinput({ ...input, nameInput: e.target.value }) }}
                                    style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px", width: "300px" }} type="text" />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Email</label>
                                <input value={input.emailInput} onChange={(e) => { setinput({ ...input, emailInput: e.target.value }) }}
                                    style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px" }} type="text" />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Phone</label>
                                <input value={input.phoneInput} onChange={(e) => { setinput({ ...input, phoneInput: e.target.value }) }}
                                    style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px" }} type="text" />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Status</label>

                                <select value={input.status} onChange={(e) => { setinput({ ...input, status: e.target.value }) }} style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px" }}>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>

                            </Box>

                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Full name</label>
                                <input value={input.fullNameInput} onChange={(e) => { setinput({ ...input, fullNameInput: e.target.value }) }}
                                    style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px", width: "300px" }} type="text" />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Birth Date</label>
                                <input value={input.birthDateInput} onChange={(e) => { setinput({ ...input, birthDateInput: e.target.value }) }}
                                    style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px" }} type="text" />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 4 }}>
                                <label style={{ color: "#888" }}>Address</label>
                                <input value={input.addressInput} onChange={(e) => { setinput({ ...input, addressInput: e.target.value }) }}
                                    style={{ padding: "5px", border: "1px #888 solid", borderRadius: "5px", width: "300px" }} type="text" />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography sx={{ color: "#888" }}>Gender</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <input style={{ cursor: "pointer" }} name="gender" value="male" checked={input.genderInput === "male"} onChange={(e) => { setinput({ ...input, genderInput: e.target.value }) }}
                                        type="radio" />
                                    <label style={{ color: "#888" }}>Male</label>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <input style={{ cursor: "pointer" }} name="gender" value="female" checked={input.genderInput === "female"} onChange={(e) => { setinput({ ...input, genderInput: e.target.value }) }}
                                        type="radio" />
                                    <label style={{ color: "#888" }}>Female</label>

                                </Box>

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
                        User has been successfully created
                    </Alert>
                </Box>
            )}



        </Box>
    )
}