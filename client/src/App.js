import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Homepage from './components/Homepage';
import { useState } from 'react';
import UpdateApplicant from './components/Updates/UpdateApplicant';
import AddApplicant from './components/ApplicantComponents/AddApplicant';
import Header from './components/Header';
import UpdateOneApp from './components/Updates/UpdateOneApp';
import Forgot from './components/Forgot';
import SingleApplicantView from './components/ApplicantComponents/SingleApplicantView';
import OfferLetter from './components/OfferLetter/OfferLetter';
import ApplicantRegister from './components/ApplicantComponents/ApplicantRegister';
import RegisterMsg from './components/ApplicantComponents/RegisterMsg';
function App() {
  console.log("Hello world")
  const [isLogin, setIsLogin] = useState(localStorage.getItem("AdminInfo"))
  return (
    <div >
      {isLogin ? <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} ></Route>
          <Route path="/addApplicant" element={<AddApplicant />}></Route>
          <Route path="/ChangeApplicantStatus" element={<UpdateApplicant />}></Route>
          <Route path="/update/one" element={<UpdateOneApp />} ></Route>
          <Route path="/view/:id" element={<SingleApplicantView />}></Route>
          <Route path="/offerletter/:id" element={<OfferLetter />}></Route>
        </Routes>
      </BrowserRouter> : <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setIsLogin={setIsLogin} />}></Route>
          <Route path='/forgot' element={<Forgot />}></Route>
          <Route path="/applicant/register" element={<ApplicantRegister />}></Route>
          <Route path="/applicant/register/success" element={<RegisterMsg/>}></Route>
        </Routes>
      </BrowserRouter>}

    </div>
  );
}

export default App;
