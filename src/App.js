import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import styled from "styled-components"
import LoginPage from './component/loginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './component/signupPage';
import UserSchedulePage from './component/schedule/userSchedulePage';
import SideNavigation from './component/sideNavigation';
import GroupPage from './group/groupPage';


const GlobalStyle = createGlobalStyle`
    body{
        background: #e9ecef;
    }
`;

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

function App() {

    const[isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("userData") !== null){
            setIsLogin(true)
          }
    })



    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <BrowserRouter>
            <SideNavigation isLogin={isLogin} setIsLogin={setIsLogin}/>
            <Routes>
                <Route path={"/login"} element={<LoginPage setIsLogin={setIsLogin} />}></Route>
                <Route path={"/signup"} element={<SignUpPage />}></Route>
                {/* <Route path={'/user/todolist'} element={<TodoTemplateBlock><Layout/></TodoTemplateBlock> }></Route> */}
                <Route path={'/user/schedule'} element={<UserSchedulePage />}></Route>
                <Route path={'/group/schedule'} element = {<GroupPage />}></Route>

            </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;