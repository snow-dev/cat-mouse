import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
//import './styles.css'
import './styles.css'; // Tell webpack that Button.js uses these styles


ReactDOM.render
(
    <Game />, 
    document.getElementById('root')
);
    