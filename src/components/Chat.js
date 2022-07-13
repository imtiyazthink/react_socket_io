import {
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";

export const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const scrollBottomRef = useRef(null);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [socket]);

  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box p={3} m={2}>
            <Typography variant="h4" gutterBottom>
              Happy chatting!
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center" height={"76vh"}>
              <Grid sx={{ height: "30rem" }} xs={12} item>
                <List
                  sx={{
                    height: "30rem",
                    overflow: "auto",
                  }}
                >
                  {messageList.map((chat, index) => (
                    <ListItem key={index}>
                      <Card
                        sx={{
                          width: "fullWidth",
                          p: 2,
                          backgroundColor: "#0000FF",
                          color: "white",
                        }}
                      >
                        <Typography>{chat.time}</Typography>

                        <ListItemText
                          primary={`${chat.author}: ${chat.message}`}
                        />
                      </Card>
                    </ListItem>
                  ))}
                  <ListItem ref={scrollBottomRef}></ListItem>
                </List>
              </Grid>
              <Grid xs={11} item>
                <FormControl fullWidth>
                  <TextField
                    onChange={(event) => {
                      setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                      event.key === "Enter" && sendMessage();
                    }}
                    value={currentMessage}
                    label="Type your message..."
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid xs={1} item>
                <IconButton
                  onClick={sendMessage}
                  aria-label="send"
                  color="primary"
                >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};
