import React from 'react';
import Layout from './layout/layout';
import { createGlobalStyle } from 'styled-components';
import { TodoProvider } from './TodoContext';
import styled from "styled-components"
import LoginPage from './component/loginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './component/signupPage';
import PrivateSchedule from './component/privateSchedule';

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




    return (
        <TodoProvider>
            <GlobalStyle />
            <BrowserRouter>
            <Routes>
                <Route path={"/login"} element={<LoginPage />}></Route>
                <Route path={"/signup"} element={<SignUpPage />}></Route>
                <Route path={'/user/todolist'} element={<TodoTemplateBlock><Layout/></TodoTemplateBlock> }></Route>
                <Route path={'/user/schedule'} element={<PrivateSchedule />}></Route>

            </Routes>
            </BrowserRouter>
            
          
        </TodoProvider>
    );
}

export default App;