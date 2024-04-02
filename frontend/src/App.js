import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Loglayout from "./layouts/loglayout";
import Homelayout from "./layouts/homelayout";
import Forget from "./pages/forget/forget";
import FindJob from "./pages/FindJob/FindJob";
import ChangePass from "./pages/ChangePass/ChangePass";
import ListCO from "./pages/ListCO/ListCO";
import Myprofile from "./pages/Myprofile/Myprofile";
import DetailCO from "./pages/DetailCO/DetailCO";
import CVreview from "./pages/CVreview/CVreview";
import CurdPost from "./pages/CurdPost/CurdPost";
import DetailJob from "./pages/DetailJob/DetailJob";
import CVapplied from "./pages/CVapplied/CVapplied";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home/" element={<Homelayout />}>
          <Route index element={<FindJob />} />
          <Route path="/home/FindJob" element={<FindJob />} />
          <Route path="/home/ChangePass" element={<ChangePass />} />
          <Route path="/home/ListCO" element={<ListCO />}/>
          <Route path="/home/Myprofile" element={<Myprofile />}/>
          <Route path="/home/DetailCO/" element={<DetailCO />}/>
          <Route path="/home/DetailJob/" element={<DetailJob />}/>
          <Route path="/home/CVapplied/" element={<CVapplied />}/>
          <Route path="/home/DetailCO/CVreview" element={<CVreview />}/>
          <Route path="/home/DetailCO/CurdPost" element={<CurdPost />}/>
        </Route>
        <Route path="/log/" element={<Loglayout />}>
          <Route index element={<Login />} />
          <Route path="/log/Login" element={<Login />} />
          <Route path="/log/Register" element={<Register />} />
          <Route path="/log/Forget" element={<Forget />} />
        </Route>
      </Routes>
      {/* <Routes>
          <Route path='/home/' element={<Homelayout />}>
          <Route index element={<Login />} />
          <Route path="/home/Login" element={<Login />} />
          </Route>
      </Routes> */}
    </Router>
  );
}

export default App;
