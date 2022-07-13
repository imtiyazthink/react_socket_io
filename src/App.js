import { Box } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { ChatRoom } from "./components/ChatRoom";

function App() {
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar />
      <ChatRoom />
    </Box>
  );
}

export default App;
