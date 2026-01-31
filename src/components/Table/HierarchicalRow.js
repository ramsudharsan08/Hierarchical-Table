import AllocationControls from "../Controls/AllocationControls";
import { calculateVariance } from "../../utils/calculations";

function HierarchicalRow({
  row,
  level,
  onPercentChange,
  onValueChange
}) {

  const variance = calculateVariance(row.originalValue, row.value);

  return (
    <>
      <tr>
        <td style={{ paddingLeft: `${level * 20}px` }}>
          {level > 0 && "-- "} {row.label}
        </td>
        <td>{row.value.toFixed(2)}</td>
        <td>
          <AllocationControls
            ariaLabel={`${row.label} allocation controls`}
            onPercentApply={percent => onPercentChange(row.id, percent)}
            onValueApply={value => onValueChange(row.id, value)}
          />
        </td>
        <td aria-label={`Variance ${variance.toFixed(2)} percent`}>{variance.toFixed(2)}%</td>
      </tr>

      {row.children &&
        row.children.map(child => (
          <HierarchicalRow
            key={child.id}
            row={child}
            level={level + 1}
            onPercentChange={onPercentChange}
            onValueChange={onValueChange}
          />
        ))}
    </>
  );
}

export default HierarchicalRow;