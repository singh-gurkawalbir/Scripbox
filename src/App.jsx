import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {
  const { state } = useAuthContext();
  return (
    <div className='App'>
      {state.authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              {state.user && <Home />}
              {!state.user && <Redirect to='/login' />}
            </Route>
            <Route path='/signup'>
              {!state.user && <Signup />}
              {state.user && <Redirect to='/' />}
            </Route>
            <Route path='/login'>
              {!state.user && <Login />}
              {state.user && <Redirect to='/' />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
