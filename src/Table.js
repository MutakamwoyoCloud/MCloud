import React, {Component} from 'react';
//import {Table, Column, Cell} from 'fixed-data-table';
import Read from '../node_modules/react-icons/lib/md/chrome-reader-mode';
var Table = require('fixed-data-table').Table;
var Column = require('fixed-data-table').Column;
var Cell = require('fixed-data-table').Cell;
var Button = require('react-foundation').Button;
//var partitionHandler = require('./core/PetitionHandler');
var $ = require('jquery');

const rows = [
  ['a1', 'b1', 'c1'],
  ['a2', 'b2', 'c2'],
  ['a3', 'b3', 'c3'],
  // .... and more
];
const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

// Table data as a list of array./
class TableResult extends Component {
// Render your table
  constructor(props) {
    super(props);
    var that = this;
    var rows = $.getJSON({
        url: "/api/food?"+ "q=hash+browns",
        type: "GET",
        datatype: "json",
        //contentType: "application/json; charset=utf-8",
        //data: JSON.stringify(action),
        success: function(response) {
          console.log("ajax",response);
          that.rows = response;
          console.log("ajax",that.rows);
          return response;
        },
        error: function(response) {
          console.log("null")
          return null;
        }
    });
    console.log(this.rows);
    this.handleSubmit = this.handleSubmit.bind(this);
  }




  handleSubmit(event) {
    alert("Pulsada fila: "+event.target["id"]);
    //console.log(partitionHandler.pruebaDatos());
    event.preventDefault();
  }
  
  render(){
    var numCols = 4;
    //console.log(width)
    var rows = null;
    var length = 0;
    var width = screen.width - 100;
    if(this.rows){
      rows = this.rows;
      length = rows.length;
    }
    console.log(this.rows);
    return(
      <Table
        rowHeight={50}
        rowsCount={length}
        width={width}
        height={50*(length+1)}
        headerHeight={50}>
        <Column
          header={<Cell>Col A</Cell>}
          cell={<TextCell data={this.rows} col="description" />}
          width={width/numCols}
        />
        <Column
          header={<Cell>Col B</Cell>}
          cell={<TextCell data={this.rows} col="fat_g" />} 
          width={width/numCols}
        />
        <Column
          header={<Cell>Col C</Cell>}
          cell={<TextCell data={this.rows} col="kcal" />}
          width={width/numCols}
        />
        <Column
          header={<Cell>Col C</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              <form id={rowIndex} onSubmit={this.handleSubmit}>
                <Button><Read /></Button>
              </form>
            </Cell>
          )}
          width={width/numCols}
          align={'center'}
        />
      </Table>
    );
  }
}

export default TableResult;