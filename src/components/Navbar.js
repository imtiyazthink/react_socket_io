import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export const Navbar = () => {
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          Chat App
        </Typography>
        <ChatIcon sx={{ display: { xs: "block", sm: "none" } }} />
      </StyledToolbar>
    </AppBar>
  );
};
