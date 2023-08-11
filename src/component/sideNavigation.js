import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { MenuRounded, GridViewRounded, ReceiptRounded, LogoutRounded } from "@mui/icons-material";
import "../App.css"
import { Link, useNavigate } from "react-router-dom";


export default function SideNavigation({isLogin, setIsLogin}) {

    const navigate = useNavigate();

    const logOut = () => {
        alert("로그아웃 됩니다.")
        setIsLogin(false);
        window.localStorage.clear();
        navigate("/login");
    }
    
    return (

        isLogin ?
        <Sidebar className="app">
        <Menu>
        <MenuItem className="menu1" icon={<MenuRounded />}>
            <div> 투두 리스트 </div>
          </MenuItem>
          <MenuItem icon={<GridViewRounded />} component={<Link to="/user/schedule" > </Link>}> 나의 스케줄 </MenuItem>
          {/* <MenuItem icon={<ReceiptRounded />} component={<Link to="/group/schedule" > </Link>}> 그룹스케줄 </MenuItem> */}
          <MenuItem icon={<LogoutRounded />} onClick={() => logOut()} > Logout </MenuItem>
        </Menu>
      </Sidebar>
      : <></>
      );
}