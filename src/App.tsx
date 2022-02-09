import { BrowserRouter, Route, Switch} from 'react-router-dom';


import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { AdminRoom } from './pages/adminRoom';


import { AuthContextProvider } from './contexts/AuthContexts'



function App() {

  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/room/newRoom" component={NewRoom} />
          <Route path="/room/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>  
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
