import { useState } from 'react';
import './App.css';
import { UserContext } from "../src/components/User/UserContext";
import { User } from './models';
import RoutesMap from './RoutesMap';

function App() {
  const [user, setUser] = useState<User>();

  document.title = "your medicines";

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RoutesMap/>
    </UserContext.Provider>

  );
}

export default App;