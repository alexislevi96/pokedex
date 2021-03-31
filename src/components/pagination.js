import React from 'react'

export default function Pagination(props) {
  const { onLeftClick, onRightClick} = props;
  return (
    <div className="botones">
      <button onClick={onLeftClick}  className="iconArrow">
        <i className="fas fa-caret-left "/>
      </button>
      <button onClick={onRightClick} className="iconArrow">
        <i className="fas fa-caret-right "/>
      </button>
    </div>
  )
}
