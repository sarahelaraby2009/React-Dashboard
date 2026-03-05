import { Box,Button } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import type { GridRenderCellParams } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



interface user {
    id:number
    username:string
    email:string
    status:string
    transaction:number
    avatar:string
}



const paginationModel = { page: 0, pageSize: 8 };
 
export default function UserList() {
    const[selectedId,setSelectedId]=useState<number |null>(null)
    const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 200,renderCell:(params:GridRenderCellParams<user>) => (
        <Box sx={{display:"flex",alignItems:"center",gap:3}}>
            <Avatar sx={{width:25,height:25}} src={params.row.avatar} />
            {params.row.username}
        </Box>
    ) },
    { field: 'email', headerName: 'Email', width:200 },
    {
        field: 'status',
        headerName: 'Status',
        width: 130,
        textAlign:"left"
    },
    {
        field: 'transaction',
        headerName: 'Transaction volume',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        
    },
        { field: 'action', headerName: 'Action', width: 130,renderCell:(params:GridRenderCellParams<user>) =>(
            <Box sx={{display:"flex",gap:3,padding:2}}>
                <Link to={`/users/${params.row.id}`}>
                <EditIcon sx={{color:"#add8e6",cursor:"pointer"}}/>
                </Link>
                
                
                
                <DeleteOutlineIcon  sx={{color:"red",cursor:"pointer"}}  onClick={() => {setSelectedId(params.row.id)
                     handleClickOpen()}} />
            </Box>
        ) },

];
    const [userDetails,setUserDetails]=useState<user[]>([])
    const [loading,setLoading]=useState(true)
   
    const handleDelete= (id:number) => {
        axios.delete(`https://dashboard-api-production-7f98.up.railway.app/userDetails/${id}`)
        .then(() => {const updatedData=userDetails.filter((u) =>u.id!==id)
        setUserDetails(updatedData)
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
         axios.get('https://dashboard-api-production-7f98.up.railway.app/userDetails')
            .then(function (response) {
                // handle success
                const data = response.data
                setUserDetails(data)
                setLoading(false)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)

            }) 
    } ,[])
    return (
        <Box sx={{padding:5}}>
            <Paper sx={{ height: 400, width: '100%' }}>
             
                <DataGrid
                rows={userDetails}
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
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this member
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={
            () => {
                if(selectedId)
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