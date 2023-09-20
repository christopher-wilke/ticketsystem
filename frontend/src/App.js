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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DetailView from './components/details'
import LoginView from './components/login'
const defaultTheme = createTheme();

function App() {

  const [currentView, setCurrentView] = React.useState('main')
  const [users, setUsers] = React.useState([])
  const [tickets, setTickets] = React.useState([])
  const [activeUser, setActiveUser] = React.useState('')

  const changeView = () => {
    setCurrentView(currentView === 'main' ? 'detail' : 'main')
  }

  React.useEffect(() => {
    fetch('http://localhost:8000/persons')
      .then(response => response.json())
      .then(users => setUsers(users))

    fetch('http://localhost:8000/tickets')
      .then(response => response.json())
      .then(tickets => setTickets(tickets))
      
  }, []) 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {
          currentView == 'main' ?
          <LoginView 
            changeView={changeView}
            users={users}
            setActiveUser={setActiveUser}
          /> : 
          <DetailView 
            changeView={changeView} 
            tickets={tickets}
            users={users}
            activeUser={activeUser}
            setActiveUser={setActiveUser}
          />
        }
      </Container>
    </ThemeProvider>  );
}

export default App;
