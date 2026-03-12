import { Box, Button, Typography } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import type { GridRenderCellParams } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



interface product {
    id: number
    name: string
    stock: number
    status: string
    price: number
    category:string
    sales:number
    avatar: string
    
}

interface props {
    searchQuery:string
}

const paginationModel = { page: 0, pageSize: 8 };

export default function ProductList({searchQuery}:props) {
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name', headerName: 'Name', width: 200, renderCell: (params: GridRenderCellParams<product>) => (
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <Avatar sx={{ width: 25, height: 25 }} src={params.row.avatar} />
                    {params.row.name}
                </Box>
            )
        },
        { field: 'stock', headerName: 'Stock', width: 200 },
     
        {
            field: 'price',
            headerName: 'Price volume',
            sortable: true,
            width: 160,

        },
        
        {
            field: 'category',
            headerName: 'Category',
            sortable: false,
            width: 160,

        },
        {
            field: 'action', headerName: 'Action', width: 130, renderCell: (params: GridRenderCellParams<product>) => (
                <Box sx={{ display: "flex", gap: 3, padding: 2 }}>
                    <Link to={`/products/${params.row.id}`}>
                        <EditIcon sx={{ color: "#add8e6", cursor: "pointer" }} />
                    </Link>



                    <DeleteOutlineIcon sx={{ color: "red", cursor: "pointer" }} onClick={() => {
                        setSelectedId(params.row.id)
                        handleClickOpen()
                    }} />
                </Box>
            )
        },

    ];
    const [productDetails, setProductDetails] = useState<product[]>([])
    const [loading, setLoading] = useState(true)
    const filteredProduct=useMemo(()=>
        searchQuery?
        productDetails.filter((product)=>product.name.toLowerCase().includes(searchQuery.toLowerCase())||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ):
        productDetails
    ,[productDetails,searchQuery])
    const handleDelete = (id: number) => {
        axios.delete(`https://dashboard-api-production-7f98.up.railway.app/products/${id}`)
            .then(() => {
                const updatedData = productDetails.filter((u) => u.id !== id)
                setProductDetails(updatedData)
                handleClose()
            })

            .catch((err) => {
                console.log(err)
            })
    }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        axios.get('https://dashboard-api-production-7f98.up.railway.app/products')
            .then(function (response) {
                // handle success
                const data = response.data
                setProductDetails(data)
                setLoading(false)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)

            })
    }, [])
    return (
        <Box sx={{ padding: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", margin: 3 }}>
                <Typography fontWeight={600} fontSize={25} sx={{ marginBottom: 3 }}>Products List</Typography>
                <Link to={"/products/createProduct"}>
                    <Button sx={{ fontSize: 12 }} variant="contained">create <AddCircleOutlineIcon /></Button>
                </Link>


            </Box>

            <Paper sx={{ height: 400, width: '100%' }}>

                <DataGrid
                    rows={filteredProduct}
                    disableRowSelectionOnClick
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                    loading={loading}

                />

            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Product Delete Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this product
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={
                        () => {
                            if (selectedId)
                                handleDelete(selectedId)
                        }
                    } autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>

    )
}