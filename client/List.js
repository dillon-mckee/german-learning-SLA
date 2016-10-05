var React = require('react');
var ReactDOM = require('react-dom');

var connect = require('react-redux').connect;

var actions = require('./actions');

var Item = require('./Item');

var List = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.fetchData());
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.dispatch(actions.postData(this.refs.myInput.value));
    // TODO: control value of input incomponent state or even better with React
    ReactDOM.findDOMNode(this.refs.myInput).value = "";
  },
  render: function() {
    var todoList = this.props.todos.map(function(todo, i) {
      console.log(todo.completed);
      return <Item key={i} title={todo.title} status={todo.completed} todoId={todo.id}/>
    });
    return (
        <div>
          <ul>
            {todoList}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input type='text' ref='myInput' />
            <button type='submit'>Add New Item</button>
          </form>
        </div>
    );
  }
});

