import classNames from 'classnames';
import React, { useState, useEffect, useRef } from "react";
import './style.scss';

const LoginLayer = ({ currentUser, loginLayerActive, signIn, hideLoginLayer }) => {

  const [name,setName] = useState("")
  const classes = classNames({ loginLayer: true, visible: loginLayerActive });
  const inputEl = useRef(null);

  useEffect(()=>{
    inputEl.current.focus()
    setName("")
  },[loginLayerActive])

  return(
    <div className={classes}>

      <img onClick={hideLoginLayer} className="icon-close" srcSet="
        ./assets/2x/outline_close_white_48dp.png 2x,
        ./assets/1x/outline_close_white_48dp.png 1x
        " />

      <div className="loginLayer--background"/>

      <div className="loginLayer--content">
        <p className="loginLayer--title">Please login to play game</p>
        <input ref={inputEl} type="text" placeholder="il tuo nome..." value={name}
          onChange={({ target })=>{ setName(target.value.toLocaleLowerCase()) }}
          onKeyUp={(e)=>{
            const isEnter = e.key === 'Enter';
            isEnter && name.length>0 && signIn(name);
          }}/>
        <button disabled={name.length === 0} onClick={()=> signIn(name)}>LOGIN</button>
      </div>
    </div>
  )
}

export default LoginLayer;

