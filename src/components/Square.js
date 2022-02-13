import React from "react";

function Square({ val, chooseSlot }) {
  return (
    <div className="square" onClick={chooseSlot}>
      {val}
    </div>
  );
}

export default Square;
