## Summary of Previous Lab

## Overview of Current Lab


```javascript
  const totals = populationCategories.reduce( (totals, current) => {
    totals[current] = Object.values(sums).reduce( (sum,x) => sum += x[current], 0)
    return totals
  }, {})
```
# Goals
