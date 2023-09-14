import { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import { AccountCircle, Add } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useLocalStorageAuthentication from '@/context/useLocalStorageAuthentication';
import { UserContext, UserContextType } from '@/context/user-context';


function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [accountOptions, setAccountOptions] = useState<string[]>(['Login']); 
  const router = useRouter();

  const fetchedUser = useLocalStorageAuthentication(false);
  const {user, setLoggedInUser, logoutUser} = useContext(UserContext) as UserContextType;

  useEffect(() => {
    if(!user && fetchedUser) {
      setLoggedInUser(fetchedUser);
      setAccountOptions(['Profile', 'Logout'])
    } else if (!user && !fetchedUser) {
      setAccountOptions(['Login'])
    } else if(user) {
      setAccountOptions(['Profile', 'Logout'])
    }
  },[fetchedUser, user, setLoggedInUser])

  const accountOptionsHTML = accountOptions.map((option) => (
    <MenuItem key={option} onClick={() => handleCloseUserMenu(option)}>
      <Typography sx={{textDecoration:'none'}} textAlign="center">{option}</Typography>
    </MenuItem>
  ));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (option:string) => {
    setAnchorElUser(null);
    switch(option) {
        case "Logout":
            logoutUser(); break;
        case "Login":
            router.push('/login'); break;
        case "Profile":
            router.push(`/user/${user?._id}`)
    }
  };

  return (
    <AppBar sx={{backgroundColor:"#7091F5"}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            passHref
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Button  style={{color:"white", backgroundColor:"#793FDF"}} variant="contained" startIcon={<HomeIcon/>}>
                HOME
            </Button>
          </Typography>

          <Box sx={{ flexGrow: 1, display:'flex', justifyContent:'flex-end' }}>
            
            {user?.isCompany ? <Button onClick={() => router.push('/job/create')} style={{color:"white", backgroundColor:"#793FDF", marginRight:15}} variant="contained" startIcon={<Add/>}>
                Create Job
            </Button> : null}
            
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Profile" src="././public/next.svg" /> */}
                <AccountCircle style={{color:"white"}} fontSize='large'/>
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
              {accountOptionsHTML}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;