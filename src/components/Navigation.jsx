import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';


const pages = ['Sign In','Team'];

export const NavigationBar = ()  => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const [userimage, setUserImage] = useState('../src/assets/signout.png');
  const [settings, setSettings] = useState(['Log Out'])


    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserImage('../src/assets/avatar.jpg')
          setSettings(['Log Out'])
        } else {
          setUserImage('../src/assets/signout.png')
          setSettings(['Log In'])
        }
      });
    }, [setUserImage, navigate]);



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleEventPage = (e) => {
    const selectedPage = e.currentTarget.textContent;
    if(selectedPage === 'Sign In'){
      navigate('/login')
    }
    if(selectedPage === 'Team'){
      navigate('/team')
    }
  };

  
  const handleSettingEvent = (e) => {
    const selectedSetting = e.currentTarget.textContent;
    if(selectedSetting === 'Log In'){
      navigate('/login')
    }
    if(selectedSetting === 'Log Out'){
      try{
        signOut(auth)
      }catch(error){
        console.log(error.message);
      }
      navigate('/')
    }
  };

  const handleReturnPokedex = () => {
    navigate('/')
  }

  return (
    <AppBar position="fixed" sx={{ minHeight: '4rem', backgroundColor: '#A6CF98'}}>
      <Container sx={{backgroundColor:'#A6CF98', width:'100%', height:'100%'}}>
        <Toolbar disableGutters >
          <IconButton sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={handleReturnPokedex}>
            <img src='src\assets\mapa.png' width={50}/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={handleReturnPokedex}
          >
            PokeDex
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleEventPage} value={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <IconButton sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} onClick={handleReturnPokedex}>
            <img src='src\assets\mapa.png' width={50}/>
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={handleReturnPokedex}
          >
            PokeDex
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleEventPage}
                sx={{ my: 2, color: 'white', display: 'block' }}
                value= {page}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userimage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleSettingEvent} value={setting}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
