import { useState } from "react";

function AllocationControls({ onPercentApply, onValueApply, ariaLabel }) {
  const [input, setInput] = useState("");

  return (
    <div className="controls" role="group" aria-label={ariaLabel || "Allocation controls"}>
      <input
        type="number"
        aria-label="Allocation input"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button aria-label="Apply percent allocation" onClick={() => onPercentApply(Number(input))}>
        Allocation %
      </button>
      <button aria-label="Apply allocation value" onClick={() => onValueApply(Number(input))}>
        Allocation Val
      </button>
    </div>
  );
}

export default AllocationControls; 