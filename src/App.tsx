import React from 'react';
import './App.css';
import { CreateUser } from './components/CreateUser';
import { UserList } from './components/UserList/UserList';

function App() {
  const [showCreateUser, setShowCreateUser] = React.useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button disabled={showCreateUser} onClick={()=> {setShowCreateUser(!showCreateUser)}}>skapa användare</button>
          <button disabled={!showCreateUser} onClick={()=> {setShowCreateUser(!showCreateUser)}}>Visa användare</button>
          {showCreateUser ? <CreateUser /> : <UserList />}
        </div>
      </header>
    </div>
  );
}

export default App;
