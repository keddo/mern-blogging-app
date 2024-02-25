import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./components/UserAuthForm";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
      </Route>
    </Routes>
  );
};

export default App;
