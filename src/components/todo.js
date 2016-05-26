import React, { Component } from 'react';
import { observer } from "mobx-react";
import { storeDelete } from '../actions/base_actions';
import { dispatch } from '../helpers/dispatcher';

@observer // need observer to update a row when a note is modified
class Todo extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(todo) {
    dispatch(storeDelete(this.props.mstore, todo));
  }     

  render() {
    const todo = this.props.todo;
    return (
      <tr>
        <td>{todo.description}</td>
        <td>{todo.status}</td>
        <td><i onClick={ () => this.handleDelete(todo)} className="fa fa-trash"/></td>
      </tr>
    );
  }
};
export default Todo;