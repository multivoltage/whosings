import React from 'react';
import { connect } from "react-redux";
import { currentUserSelector } from "../selectors/user";

const LoggedView = ({ currentUser, children }) => {

  if(currentUser!==null && currentUser.name){
    return children
  }

  return <span></span>
}


const mapStateToProps = (state) => {
  return {
    currentUser: currentUserSelector(state),
  }
}


export default connect(
  mapStateToProps,
  null
)(LoggedView);

