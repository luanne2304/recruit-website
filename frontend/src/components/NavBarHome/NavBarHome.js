import React, { useEffect, useState, useMemo } from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Avatar, Tooltip, Box, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../utils/authUtils';
import userService from "../../services/userService";
  import logohinh from"../../assets/images/logohinh.png"
  import logochu from"../../assets/images/logochu.png"

function NavBarHome() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await userService.getUserById();
      setUser(res.data);
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await userService.logout(accessToken);
      navigate("/log");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const pages = [
    { name: "Tìm việc", link: "/home/FindJob" },
    { name: "Nhà tuyển dụng", link: "/home/ListCO" },
    { name: "Đã ứng tuyển", link: "/home/CVapplied/" },
  ];

  const settings = useMemo(() => {
    const baseSettings = [
      { name: "Hồ sơ", link: "/home/Myprofile" },
      { name: "Đổi mật khẩu", link: "/home/ChangePass" },
      { name: "Đăng xuất", action: handleLogout, color: "error" }, // Màu đỏ cho Logout
    ];

    if (user?.isAdmin) {
      baseSettings.unshift({ name: "Quản lý Admin", link: "/Admin/" });
    }

    return baseSettings;
  }, [user]);

  return (
    <AppBar position="static" sx={{ background: "linear-gradient(to right, #231315, #54151C)", boxShadow: "0px 3px 10px rgba(0,0,0,0.2)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
                <img 
            src={logohinh} 
            alt="Logo" 
            style={{ height: 50, marginRight: 10 }} // Điều chỉnh kích thước theo ý muốn
          />
                <img 
            src={logochu} 
            alt="Logo" 
            style={{ height: 40, marginRight: 50  }} // Điều chỉnh kích thước theo ý muốn
          />
          {/* <Typography
            variant="h6"
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            LOGO
          </Typography> */}

          {/* Menu mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={(event) => setAnchorElNav(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ mt: "35px" }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={() => navigate(page.link)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Menu desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" },gap:2 }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => navigate(page.link)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Avatar + Menu User */}
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Cài đặt">
                <IconButton onClick={(event) => setAnchorElUser(event.currentTarget)} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.name || "User"}
                    src={user.avatar || "https://example.com/default-avatar.jpg"}
                    sx={{ width: 40, height: 40, border: "2px solid white" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "15px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={index}
                    onClick={setting.action || (() => navigate(setting.link))}
                    sx={{
                      color: setting.color === "error" ? "red" : "black",
                      "&:hover": { backgroundColor: setting.color === "error" ? "#ffebee" : "#f5f5f5" },
                    }}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBarHome;
