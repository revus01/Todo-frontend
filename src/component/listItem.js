import React, { useState } from "react";
import axios from "axios";
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';


const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;
const Text2 = styled.div`
  flex: 1;
  font-size: 15px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const ListItem = ({todo, reload}) => {


    const[isVisible, setIsVisivble] = useState(true);
    const[complete, setComplete] = useState(todo.isComplete);

    const deleteTodo = () => {
        axios.delete("/todo/delete/" + todo.id.toString())
        .then((response) => {setIsVisivble(false)})
        .catch(error => console.log(error))
    }

    const changeTodo = () => {
        axios.put(`/todo/change/${todo.id}/${!todo.isComplete}`,
        ).then((response) => {setComplete(!complete)})
        .catch(error => console.log(error))
    }

    


    return(
      isVisible
      ?
        <TodoItemBlock>
            <CheckCircle done={complete} onClick={()=> changeTodo()}>
                {complete && <MdDone />}
            </CheckCircle>
            <div style={{flex:1, flexDirection:"row"}}>
              <Text done={complete}>{todo.title}</Text>
              <Text2 done={complete}>{todo.content}</Text2>
            </div>
            <Remove onClick={() => deleteTodo()}>
                <MdDelete />
            </Remove>
      </TodoItemBlock>
      :<></>

    )
        
    
}

export default React.memo(ListItem);