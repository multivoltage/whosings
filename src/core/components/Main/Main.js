import React, { Component } from "react";
import HeaderWrapper from "../Header/HeaderWrapper";
import LoginLayerWrapper from "../LoginLayer/LoginLayerWrapper";
import { Link } from 'react-router-dom'
import "./style.scss";
import LoggedView from '../../components/LoggedView';
const Main = (props) => {

  return (
    <section className="main">

      <h2 className="title">WAHT DO YOU WANT TO DO SEE??</h2>
      <div className="actions">
        <LoggedView><Link className="action" to="/quiz">QUIZ PAGE</Link></LoggedView>
        <LoggedView><Link className="action" to="/profile">MY GAMES PAGE</Link></LoggedView>
        <Link className="action"to="/stats">ALL GAMES PAGE</Link>
      </div>
    </section>
  );
}

export default Main;
