import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Nav from './components/navbar/Nav';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { userLoginContext, themeContext } from './components/contexts/context';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
function App() {
  const [currentTheme, setCurrentTheme] = useState(false);

  const colors = extendTheme(
    //light mode
    !currentTheme
      ? {
          colors: {
            brand: {
              main: '#1C9B75',
              bgText: 'white',
              text: 'black',
              subText: 'gray',
              bg: 'white',
            },
          },
        }
      : //dark mode
        {
          colors: {
            brand: {
              bg: '#3b4252',
              main: '#18b888',
              bgText: 'white',
              text: 'white',
              subText: '#a3a3a3',
            },
          },
        }
  );
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        setUserLogin(user);
      }
    }
  }, []);
  const [userLogin, setUserLogin] = useState(false);

  return (
    <div className='App'>
      <BrowserRouter>
        <ChakraProvider theme={colors}>
          <themeContext.Provider value={{ currentTheme, setCurrentTheme }}>
            <userLoginContext.Provider value={{ userLogin, setUserLogin }}>
              <Nav />
              <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </userLoginContext.Provider>
          </themeContext.Provider>
        </ChakraProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
