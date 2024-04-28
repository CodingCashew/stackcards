import { Box, Container } from "@chakra-ui/react";
import DeckMenu from "./Components/DeckMenu";
import TopBar from "./Components/TopBar";
import "./styles.css";

function App({ theme }) {
  return (
    <Box w="100%" h="100%" direction="column">
      <TopBar />
      <Container
        className="App"
        mt={5}
        maxW="3xl"
        align="center"
        bgColor="white"
      >
        <DeckMenu />
      </Container>
    </Box>
  );
}

export default App;
