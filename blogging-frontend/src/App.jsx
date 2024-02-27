import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./components/UserAuthForm";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/Session";
export const UserContext = createContext({});
const App = () => {
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession
      ? setAuthUser(JSON.parse(userInSession))
      : setAuthUser({ access_token: null });
    // console.log(userInSession);
  }, []);
  return (
    <UserContext.Provider value={{ authUser, setAuthUser }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
