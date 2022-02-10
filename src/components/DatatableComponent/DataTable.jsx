import React, { Component } from "react";
import DataTable from "react-data-table-component";

export class TableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.props.columns,
      data: this.props.data,
    };
    
  }
  render() {
    if (this.props.expandableRows) {
      return (
        <DataTable
        columns={this.state.columns}
        data={this.state.data}
        pagination
        fixedHeaderScrollHeight="100vh"
        pointerOnHover={true}
        striped={true}
        persistTableHead={true}
        expandableRows
        expandableRowsComponent={this.props.expandableRowsComponent}
      />
      )
    }
    return (
      <DataTable
        columns={this.state.columns}
        data={this.state.data}
        pagination
        fixedHeaderScrollHeight="100vh"
        pointerOnHover={true}
        striped={true}
        persistTableHead={true}
      />
    );
  }
}

export default TableComponent;
