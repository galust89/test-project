import React, {useState} from 'react';
import {useDispatchContext, useStateContext} from './State/provider'
import api from './api';
import {
  GET_CODE,
  GET_DATA,
} from "./State/types"

import "./App.css"

function App() {
  const dispatch = useDispatchContext();
  const {success} = useStateContext();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const onPhone = (e) => {
     setPhone(e.target.value);
  }

  const onCode = (e) => {
    setCode(e.target.value)
  }
  const onSubmit = async () => {
    if(!phone && !code){
       //DO something when empty
       return;
    }
    //TODO create actions file and do it there
    if(!code) {
      const response = await api.getCode(phone);
      console.log(response);
       dispatch({type: GET_CODE, response});
       return;
    }

    if(phone && code && success) {
      //TODO create types for loading 
      const response = await api.login({phone, code});
      console.log(response);
      localStorage.setItem("token", response.jwt)
      dispatch({type: GET_DATA, response});
      return;
    }
  }

  return (
      <div className="App-header">
        <form onSubmit={onSubmit}>
          <input value={phone} placeholder="enter phone number" onChange={onPhone} required/>
          <input value={code} placeholder="enter code" onChange={onCode}/>
          <button type="submit">Login</button>
        </form>
      </div>
  );
}

export default App;
