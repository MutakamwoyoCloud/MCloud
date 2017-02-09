import React, {Component} from 'react';
//import {Table, Column, Cell} from 'fixed-data-table';
import Read from '../node_modules/react-icons/lib/md/chrome-reader-mode';
var Table = require('fixed-data-table').Table;
var Column = require('fixed-data-table').Column;
var Cell = require('fixed-data-table').Cell;
var Button = require('react-foundation').Button;
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
    console.log("entro");
    this.rows = this.props.rows;
   
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert("Pulsada fila: "+event.target["id"]);
    event.preventDefault();
  }
  
  render(){
    this.rows = this.props.rows;
    var numCols = 4;
    var length = 10;
    var width = screen.width - 100;
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