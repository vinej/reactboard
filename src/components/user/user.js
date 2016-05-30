import React, { Component } from 'react';
import { observer } from "mobx-react";
import * as actions from '../../actions/user_actions';
import { dispatch } from '../../helpers/dispatcher';


@observer // need observer to update a row when a note is modified
class User extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(user) {
    dispatch(actions.userDelete(this.props.mstore, user));
  } 

  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user._id}</td>
        <td><i onClick={ () => this.handleDelete(user)} className="fa fa-trash"/></td>
      </tr>
    );
  }
};
export default User;