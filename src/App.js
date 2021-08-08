import { Switch, Route, useHistory } from "react-router-dom";
import Main from './Pages/Main';
import Home from './Pages/Home';
import styled from 'styled-components';
import Info from './Components/Info';

const Logo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  cursor: pointer;
  width: 100%;
  background-color: black;
  color: white;
`;

function App() {
  const history = useHistory();

  return (
    <>
      <Logo onClick={() => history.push('/')}><h2>House recommendation</h2></Logo>
      <Switch>
        <Route path="/mat/:size">
          <Main />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Info />
    </>
  );
}

export default App;
