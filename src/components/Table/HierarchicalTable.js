import { useState } from "react";
import HierarchicalRow from "./HierarchicalRow";
import { Data } from "../../data/Data";
import { calculateSubtotal, distributeToChildren } from "../../utils/Helpers";

function HierarchicalTable() {
  const [rows, setRows] = useState(Data);

  const updateTree = (nodes, id, updater) =>
    nodes.map(node => {
      if (node.id === id) {
        return updater(node);
      }

      if (node.children) {
        const updatedChildren = updateTree(node.children, id, updater);
        const updatedValue = calculateSubtotal(updatedChildren);
        return { ...node, children: updatedChildren, value: updatedValue };
      }

      return node;
    });

  const handlePercentChange = (id, percent) => {
    setRows(prev =>
      updateTree(prev, id, node => ({
        ...node,
        value: node.value + (node.value * percent) / 100
      }))
    );
  };

  const handleValueChange = (id, value) => {
    setRows(prev =>
      updateTree(prev, id, node => {
        if (node.children) {
          return {
            ...node,
            value,
            children: distributeToChildren(value, node.children)
          };
        }
        return { ...node, value };
      })
    );
  };

  const grandTotal = rows.reduce((sum, row) => sum + row.value, 0);

  return <>
    <div className="container data-table" role="region" aria-label="Hierarchical allocation table" aria-live="polite">
        <table>
        <thead>
            <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Actions</th>
            <th>Variance %</th>
            </tr>
        </thead>
        <tbody>
            {rows.map(row => (
            <HierarchicalRow
                key={row.id}
                row={row}
                level={0}
                onPercentChange={handlePercentChange}
                onValueChange={handleValueChange}
            />
            ))}
        </tbody>
        </table>
    </div>
  </>
}

export default HierarchicalTable;
