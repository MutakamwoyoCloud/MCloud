import React, {Component} from 'react';
import { browserHistory } from 'react-router';
//import {Table, Column, Cell} from 'fixed-data-table';
var Table = require('fixed-data-table').Table;
var Column = require('fixed-data-table').Column;
var Cell = require('fixed-data-table').Cell;
var Button = require('react-foundation').Button;
var tr = require('../../translate.js');

var CommonActions = require('./utils/CommonActions');
//var partitionHandler = require('./core/PetitionHandler');
const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col].toString()}
  </Cell>
);

// Table data as a list of array./
class TableResult extends Component {
// Render your table
  constructor(props) {
    super(props);
    this.rows = this.props.rows;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    var params = {};
    params.success = function(request,response){
      //console.log(response);
      browserHistory.push({
        pathname: '/result',
        state: { data: response }
      });
    }
    params.error = function(response){
      console.log(response);
    }
    params.data = event.target['id'];
    params.type = "wiki";
    if(params.data != "")
      CommonActions.list(params, "getData");
    event.preventDefault();
  }
  
  render(){
    this.rows = this.props.rows;
    var numCols = 2;
    var length = 10;
    var width = screen.width - 200;
    var that = this;
    if(this.rows){
      var rows = Object.keys(this.rows).map(function (key) { return that.rows[key]; });
      //var rows = this.rows;
      length = this.rows.length;
      return(
        <Table
          rowHeight={50}
          rowsCount={length}
          width={width}
          height={50*(length+1)}
          headerHeight={50}>
          <Column
            header={<Cell>{"Description"}</Cell>}
            cell={<TextCell data={rows} col="name" />}
            width={width/numCols}
          />
          <Column
            header={<Cell>{"leer"}</Cell>}
            cell={({rowIndex, ...props}) => (
              <Button id={rows[rowIndex]['name']} onClick={this.handleSubmit}>Read</Button>
            )}
            width={width/numCols}
            align={'center'}
          />
        </Table>
      );
    }
    else 
      return(<div>"Enter search..."</div>);
  }
}

export default TableResult;