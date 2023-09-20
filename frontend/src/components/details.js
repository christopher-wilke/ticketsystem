import * as React from 'react';
 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const DetailView = (props) => {

  const [activeUserId, setActiveUserId] = React.useState(0)
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    for(let i=0; i<props.users.length;i++) {
      if (props.users[i].username === props.activeUser) {
        setActiveUserId(props.users[i])
        updateTableView(props.users[i])
        break;
      }
    }
  }, [])

  const updateTableView = (activeUser) => {
    if (activeUser.role_description === "2") {
      setItems(props.tickets)
    } else if(activeUser.role_description === "1") {
      let my_items = []
      for(let i=0; i<props.tickets.length; i++) {
        if(props.tickets[i].createdBy === activeUser.id) {
          my_items.push(props.tickets[i])
        }
      }
      setItems(my_items)
    }
  }

  return (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logged in as {props.activeUser}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>created</TableCell>
                    <TableCell>created by</TableCell>
                    <TableCell>reason</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {
                  items.map((item) => (
                    <TableRow
                      key={item.id}
                    >
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.created}</TableCell>
                      <TableCell>{item.createdBy}</TableCell>
                      <TableCell>{item.reason}</TableCell>
                    </TableRow>
                  ))
                } 
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              onClick={() => {
                props.setActiveUser('')
                props.changeView()
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign out
            </Button>
          </Box>
        </Box>
  )
}

export default DetailView
