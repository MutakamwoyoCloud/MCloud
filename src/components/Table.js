import React, {Component} from 'react';
import { browserHistory } from 'react-router';
//import {Table, Column, Cell} from 'fixed-data-table';
var Table = require('fixed-data-table').Table;
var Column = require('fixed-data-table').Column;
var Cell = require('fixed-data-table').Cell;
var Button = require('react-foundation').Button;
//var tr = require('../../translate.js');

var CommonActions = require('./utils/CommonActions');
//var partitionHandler = require('./core/PetitionHandler');
const TextCellName = ({rowIndex, data, col, col2, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col][col2].toString()}
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
    console.log(event.target['id']);
    var params = {};
    params.success = function(request,response){
      browserHistory.push({
        pathname: '/resultWiki',
        state: { data: response }
      });
    }
    params.error = function(response){
      console.log(response);
    }
    params.data = event.target['id'];
    params.type = "wiki";
    if(params.data !== "")
      CommonActions.list(params, "getData");
    event.preventDefault();
  }
  
  render(){
    this.rows = this.props.rows;
    var length = 10;
    //var width = screen.width - 200;
    var that = this;
    if(this.rows){
      var rows = Object.keys(this.rows).map(function (key) { return that.rows[key]; });
      length = this.rows.length;
      return(
        <Table
          rowHeight={50}
          rowsCount={length}
          width={1200}
          height={50*(length+1)}
          headerHeight={50}>
          <Column
            header={<Cell>{"Description"}</Cell>}
            cell={<TextCellName data={rows} col="data" col2="name"/>}
            width={600}
            fixed={true}
            align={'center'}
          />
          <Column
            header={<Cell>{"leer"}</Cell>}
            cell={({rowIndex, ...props}) => (
              <Button id={rows[rowIndex]["name"]} onClick={this.handleSubmit}>Read</Button>
            )}
            width={600}
            fixed={true}
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
