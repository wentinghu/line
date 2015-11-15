import React from 'react/addons';
import Operation from './operations.jsx';
import Editor from './editor.jsx'
import {
  Add,
  Sub,
  Mult,
  Div,
  Value,
  RangeTo,
  RangeUntil,
  Apply,
  Map,
  Insert,
  Sum,
  Product,
  Power
} from './Operation.js';

var _= require('lodash');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      procedures: {Test: [new Value(), new Value(), new Add(), new Apply()]},
      editing: null
    };
  } 

  save(title, operations){
    var duplicate = _.clone(this.state.procedures);
    duplicate[title] = operations;
    console.log(duplicate);
    this.setState({procedures: duplicate});
  }

  handleChange(e){
    this.setState({title: e.target.value});
  }

  confirmDelete(proc){
    var agree=confirm("Are you sure you want to delete this file?");
    if (agree)
         this.removeProcedure(proc);
  }

  removeProcedure(proc){
    var duplicate = _.clone(this.state.procedures);
    delete duplicate[proc];
    this.setState({procedures: duplicate});
  }

  loadProcedure(proc){
    this.setState({editing: proc});
  }

  returnToProcedures(){
    this.setState({editing: null});
  }

  createNewProc(){
    this.setState({editing: "New Procedure"});
  }

  render() { 
    if(this.state.editing){
        return <div><Editor procs={this.state.procedures} procedure={this.state.editing} operations={this.state.procedures[this.state.editing]} save={(a, b) => this.save(a,b)}/><button className="backButton" onClick={() => this.returnToProcedures()}><i className="fa fa-arrow-left"></i> </button></div>
    }else{
      return(
        <div className="app">
          <div className="header">
            <h1>cascade</h1>
          </div>
          <div className="procedures">
          <div className="procedureswrapper">
            <ReactCSSTransitionGroup transitionName='opTransition' transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
              {_.map(this.state.procedures, (proc, name) => {
                return <div className="procedure"><button className="procedureName" onClick={() => this.loadProcedure(name)}>{name}</button><button className="delete" onClick={() => this.confirmDelete(name)}><i className="fa fa-times"></i></button></div>
              })}
            </ReactCSSTransitionGroup>
          </div>
          </div>
          <div className="buttons">
            <button onClick={() => this.createNewProc()}><i className="fa fa-plus"></i></button>
          </div>
        </div>
      )
    }
  }
}

React.render(<App/>, document.getElementById('app'));
