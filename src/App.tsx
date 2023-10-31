import React, { useState }from 'react';
import './App.css';
import { CreateUser } from './components/CreateUser';
import { UserList } from './components/UserList';

function App() {
  const [showCreateUser, setShowCreateUser] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button
            disabled={showCreateUser}
            className={showCreateUser ? 'button-paragraph' : 'button'}
            onClick={()=> {setShowCreateUser(!showCreateUser)}}
            >Skapa användare
          </button>

          <button
            disabled={!showCreateUser}
            className={showCreateUser ? 'button' : 'button-paragraph'}
            onClick={()=> {setShowCreateUser(!showCreateUser)}}
            >Visa användare
          </button>
          {showCreateUser ? <CreateUser /> : <UserList />}
        </div>
      </header>
    </div>
  );
}

export default App;
