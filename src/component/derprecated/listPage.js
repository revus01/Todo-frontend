import React from "react";
import "./listPage.css"
import ListItem from "./listItem";
import styled from "styled-components"


const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  
`;

const ListPage = ({todolist,  reload}) => {
    return(

        
        <TodoListBlock>
                {todolist
                ?   todolist.map( todo => <ListItem key={JSON.stringify(todo)} todo={todo} reload={reload} />)
                :   <></>}
        </TodoListBlock>
    )
}

export default ListPage