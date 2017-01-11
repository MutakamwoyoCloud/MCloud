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
    {data[rowIndex][col].toString()}
  </Cell>
);

// Table data as a list of array./
class TableResult extends Component {
// Render your table
  constructor(props) {
    super(props);
    this.rows;
    var that = this;
    $.getJSON({
        url: "/api/food?"+ "q=hash+browns",
        type: "GET",
        datatype: "json",
        success: function(response) {
          that.rows = response;
          that.render();
          //return response;
          that.forceUpdate();
        },
        error: function(response) {
          //return null;
        }
    });
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert("Pulsada fila: "+event.target["id"]);
    event.preventDefault();
  }
  
  render(){
    var numCols = 4;
    var length = 10;
    var width = screen.width - 100;
    var that = this;
    if(this.rows){
      var rows = Object.keys(this.rows).map(function (key) { return that.rows[key]; });
      //var rows = this.rows;
      length = this.rows.length;
      console.log(rows);
      console.log(rows[0]["description"]);
      return(
        <Table
          rowHeight={50}
          rowsCount={length}
          width={width}
          height={50*(length+1)}
          headerHeight={50}>
          <Column
            header={<Cell>Description</Cell>}
            cell={<TextCell data={rows} col="description" />}
            width={width/numCols}
          />
          <Column
            header={<Cell>G</Cell>}
            cell={<TextCell data={rows} col="fat_g" />} 
            width={width/numCols}
          />
          <Column
            header={<Cell>Kcal</Cell>}
            cell={<TextCell data={rows} col="kcal" />}
            width={width/numCols}
          />
          <Column
            header={<Cell>Read</Cell>}
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
    else 
      return(<div>"Loading..."</div>);
  }
}

export default TableResult;