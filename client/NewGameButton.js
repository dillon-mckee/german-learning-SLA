var React = require('react');
var ReactDOM = require('react-dom');

var NewGameButton = function(props) {
   return (
    <div className="newgame-button">
    <input type="button" value="New Game" onClick={props.onClick}>
    </input>
    </div>
    );
};

module.exports = NewGameButton;
