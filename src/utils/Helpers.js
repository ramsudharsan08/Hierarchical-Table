export function calculateSubtotal(children) {
  return children.reduce((sum, child) => sum + child.value, 0);
}

export function distributeToChildren(parentValue, children) {
  const total = calculateSubtotal(children);

  return children.map(child => {
    const ratio = child.value / total;
    return {
      ...child,
      value: Number((ratio * parentValue).toFixed(4))
    };
  });
}