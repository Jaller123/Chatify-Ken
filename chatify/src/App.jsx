import Register from "./components/Register"
import Login from "./components/Login"
import Chat from "./components/Chat"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<Chat />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
