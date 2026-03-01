import { Box } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import Avatar from "@mui/material/Avatar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import Paper from '@mui/material/Paper';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 200,renderCell:(params) => (
        <Box sx={{display:"flex",alignItems:"center",gap:3}}>
            <Avatar sx={{width:25,height:25}} src={params.row.avatar} />
            {params.row.username}
        </Box>
    ) },
    { field: 'email', headerName: 'Email', width:200 },
    {
        field: 'status',
        headerName: 'Status',
        type: 'number',
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
        { field: 'action', headerName: 'Action', width: 130,renderCell:(params) =>(
            <Box sx={{display:"flex",gap:3,padding:2}}>
                <EditIcon sx={{color:"#add8e6",cursor:"pointer"}}/>
                <DeleteOutlineIcon sx={{color:"red",cursor:"pointer"}}/>
            </Box>
        ) },

];

const rows = [
    { id: 1, username: 'Snow', email: 'Jon@gmail.com', status: 'Active',transaction:120,avatar: "https://i.pravatar.cc/150?img=1", },
    { id: 2, username: 'Lannister', email: 'Cersei', status: 'Active',transaction:647,avatar: "https://i.pravatar.cc/150?img=2", },
    { id: 3, username: 'Lannister', email: 'Jaime', status: "Inactive",transaction:1223,avatar: "https://i.pravatar.cc/150?img=3", },
    { id: 4, username: 'Stark', email: 'Arya', status: 'Active',transaction:122440,avatar: "https://i.pravatar.cc/150?img=4", },
    { id: 5, username: 'Targaryen', email: 'Daenerys', status: 'Active',transaction:554 ,avatar: "https://i.pravatar.cc/150?img=5",},
    { id: 6, username: 'Melisandre', email: null, status: "Inactive",transaction:432,avatar: "https://i.pravatar.cc/150?img=6", },
    { id: 7, username: 'Clifford', email: 'Ferrara', status: 'Active',transaction:230,avatar: "https://i.pravatar.cc/150?img=7", },
    { id: 8, username: 'Frances', email: 'Rossini', status: "Inactive",transaction:400 ,avatar: "https://i.pravatar.cc/150?img=8",},
    { id: 9, username: 'Roxie', email: 'Harvey', status: 'Active',transaction:200 ,avatar: "https://i.pravatar.cc/150?img=9",},
];

const paginationModel = { page: 0, pageSize: 5 };
export default function UserList() {
    return (
        <Box sx={{padding:5}}>
            <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                disableRowSelectionOnClick
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
        </Box>
        
    )
}