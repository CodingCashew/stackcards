import { Container, Text, Box } from '@chakra-ui/react';
import './styles.css';
import DeckMenu from './Components/DeckMenu'
import TopBar from './Components/TopBar'

function App({theme}) {

  return (
    <Box w="100%" h='100%' direction="column" >
      <TopBar />
      <Container className="App" mt="3rem" maxW='3xl' align="center" bgColor="white" >
        <DeckMenu />
      </Container>
    </Box>
  );
}

export default App;
