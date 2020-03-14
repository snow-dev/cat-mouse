import React from 'react';

const Cell = (props) => {
  
  return (
    
    <button className ='cell'
            disabled  ={props.type !== -1}
            onClick   ={ () => props.onClickCellHandler(props.coordinates ) }>
      <img alt="" src ={props.image} />
    </button>
  
  )
};

export default Cell;