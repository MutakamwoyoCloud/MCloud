import React, {Component} from 'react';
//import {Table, Column, Cell} from 'fixed-data-table';
import Read from '../node_modules/react-icons/lib/md/chrome-reader-mode';
var Table = require('fixed-data-table').Table;
var Column = require('fixed-data-table').Column;
var Cell = require('fixed-data-table').Cell;
var Button = require('react-foundation').Button;

// Table data as a list of array.
class TableResult extends Component {
// Render your table
  constructor(props) {
    super(props);
    this.rows = props.rows;
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    alert("Pulsada fila: "+event.target["id"]);
    event.preventDefault();
  }
  
  render(){
    var numCols = 4;
    //ar screen = screen.width;
    var rows = null;
    var length = 0;
    if(this.rows){
      rows = this.rows;
      length = rows.length;
    }
    return(
      <Table
        rowHeight={50}
        rowsCount={length}
        width={screen.width}
        height={50*(length+1)}
        headerHeight={50}>
        <Column
          header={<Cell>Col A</Cell>}
           cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {rows[rowIndex][0]}
            </Cell>
          )}
          width={screen.width/numCols}
        />
        <Column
          header={<Cell>Col B</Cell>}
           cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {rows[rowIndex][1]}
            </Cell>
          )}
          width={screen.width/numCols}
        />
        <Column
          header={<Cell>Col C</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {rows[rowIndex][2]}
            </Cell>
          )}
          width={screen.width/numCols}
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
          width={screen.width/numCols}
          align={'center'}
        />
      </Table>
    );
  }
}

export default TableResult;