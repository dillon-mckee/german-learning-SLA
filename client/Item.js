var React = require('react');
var ReactDOM = require('react-dom');

var connect = require('react-redux').connect;

var actions = require('./actions');

var Item = React.createClass({
  updateText: function(e) {
    e.preventDefault();
    this.props.dispatch(actions.putData(this.props.todoId, this.refs.updateTitle.value));
    // TODO: control value of input in component state or even better with React
    ReactDOM.findDOMNode(this.refs.updateTitle).value = "";
  },
  updateStatus: function() {
    //c.preventDefault();
    console.log('status', this.props.status);
    console.log('status', !this.props.status);
    console.log('status again', this.props.status);


    this.props.dispatch(actions.putStatus(this.props.todoId, !this.props.status));
  },
  render: function() {
    console.log('in the rnder', this.props.status)
    return(
      <li><span onClick={this.updateStatus}> {this.props.title}</span>
      <form onSubmit={this.updateText}>
        <input type='text' ref='updateTitle'/>
        <button>Change text</button>
      </form>
      </li>
      )
  }
});

var Container = connect()(Item);
module.exports = Container;
