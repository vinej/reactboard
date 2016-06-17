import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { observer } from "mobx-react"
import  TodoStore from '../../stores/todo_store'
import { pageGetAll, pagePrevious, pageNext } from '../../actions/page_actions'
import { dispatch } from '../../helpers/dispatcher'
import { popupShow } from '../../actions/popup_actions'
import TodoView from '../todo/todo_view'

@observer
class Helps extends Component {
  constructor() {
    super()
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd() {
    var component = <TodoView store={this.store} todo={TodoStore.createTodo()} />
    dispatch(popupShow(component, TodoStore.getEditFormDimension()))
  }

  componentWillMount() {
    if (this.props.store) {
      this.store = this.props.store;
      this.storeAsProps = true
    } else {
      this.store = TodoStore.create();
      this.storeAsProps = false
    }      
    dispatch(pageGetAll(this.store))
  }

  componentWillUnmount() {
    if (this.storeAsProps == false)  {
      TodoStore.remove(this.store);
      this.store = null;
    }
  }

  render() {
    return (
      <div className="ag-bootstrap" style={{height: "330px" }}>
        <AgGridReact
          // listen for events with React callbacks
          //onRowSelected={this.onRowSelected.bind(this)}
          //onCellClicked={this.onCellClicked.bind(this)}

          // binding to properties within React State or Props
          //showToolPanel="true"
          //quickFilterText="true"
          //icons={this.state.icons}

          // column definitions and row data are immutable, the grid
          // will update when these lists change
          columnDefs = {[
              {headerName: 'Description', field: 'description'},
              {headerName: 'Status', field: 'status'}
          ]}

          rowData = { this.store.page }

          // or provide props the old way with no binding
          rowSelection="multiple"
          enableSorting="true"
          enableFilter="true"
          rowHeight="30"
        />
        <button onClick={ () => dispatch(pagePrevious(this.store)) }>prev</button>
        <button onClick={ () => dispatch(pageNext(this.store)) }>next</button>
        <button onClick={ () => this.handleAdd() }>add</button>
      </div>
    )
  }
}
export default Helps