import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { ForgotPassword } from "./pages/ForgotPassword"
import { ResetPassword } from "./pages/ResetPassword"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
