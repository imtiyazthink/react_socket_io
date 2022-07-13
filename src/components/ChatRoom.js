import { Box, Button, TextField, Typography } from "@mui/material";
import { Card, Divider } from "@mui/material";
import { useState } from "react";
import { Chat } from "./Chat";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

export const ChatRoom = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <>
      {!showChat ? (
        <Box
          sx={{
            width: "100vw",
            height: "80vh",
            color: "#212121",
            fontFamily: "Open Sans" | "sans-serif",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                color: "#0000FF",
              }}
            >
              Join A Chat
            </Typography>
            <Divider />
            <TextField
              sx={{
                width: "210px",
                height: "40px",
                margin: "15px",
                padding: "5px",
                fontSize: "16px",
              }}
              id="outlined-basic"
              label="John..."
              variant="outlined"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <TextField
              sx={{
                width: "210px",
                height: "40px",
                margin: "15px",
                padding: "5px",
                fontSize: "16px",
              }}
              id="outlined-basic"
              label="Room ID..."
              variant="outlined"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <Button
              sx={{
                width: "225px",
                height: "50px",
                margin: "15px",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "16px",
              }}
              variant="contained"
              onClick={joinRoom}
            >
              Join A Room
            </Button>
          </Card>
        </Box>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </>
  );
};
