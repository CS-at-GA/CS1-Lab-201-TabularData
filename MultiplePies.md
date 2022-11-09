# Displaying Multiple Pies

**This part of the tutorial has been junked because during development, I discovered that not every city has all four grades. This sort of problem both a) is common in working with real data and b) adds a level of complexity that is counter-productive at this stage. We will return to this idea soon**

Let's change the sketch a bit so that we are showing one pie for each grade for a given city. To do this we will need to do a couple things: 

1. determine where each of the four pie charts should go (taking into account that we won't know how big our user's screen is)
2. be able to get four rows at a time from the table
3. increment by city instead of by row

## Layout 
Consult the drawing to see a suggestion for the layout: [4 Pie Layout](assets/4pieLayout.draw). The only consideration is making sure we set the radius for the circles to be based on the orientation of the screen. 

---

## Four rows

It isn't very difficult to get four rows at a time, really, especially if we have the number of the row we are currently on. 

Something like...
```javascript
currentRow0 = table.getRow(currentRowIndex)
currentRow1 = table.getRow(currentRowIndex + 1)
currentRow2 = table.getRow(currentRowIndex + 2)
currentRow3 = table.getRow(currentRowIndex + 3)
```

But then I'd have to construct the data arrays four times by hand. This seems like a time for a function. 

```javascript
function extractDataFromRow(row) {
  return [
    int(row.get('white_pop')),
    int(row.get('black_pop')),
    int(row.get('hisp_pop')),
    int(row.get('asian_pop')),
    int(row.get('other_pop'))
  ]
}

// then, in draw, we could do something like...

function draw() {
  // ...
  for( let i = 0; i < 3; i++ ) {
    const data = extractDataFromRow(table.getRow(currentRowIndex+i))
    pieChart( ..., data ); // being super clever here about how we use i to position the pie charts. 
  }
}
```

## Increment by City

Also, not too challenging, once we get the hang of things. We already know that the data is grouped by city[^1] and that there are four rows per city. 

```pseudocode
line 0: city 1, A, ...
line 1: city 1, B, ...
line 2: city 1, C, ...
line 3: city 1, D, ...
line 4: city 2, A, ...
...
line 8: city 3, A, ...
```
You'll notice that each city begins on a multiple of four. That's information we can use. 

So, let's select a random city. This time, instead of selecting a random row from all the rows, let's select a random value that can be multiplied by four and be a city's "A" row: 
```javascript
currentRowIndex = int(random(table.getRowCount()/4));
```

And to change cities, instead of changing by one, we change by 4: 

```javascript
// ...
currentRowIndex -= 4
// ...
currentRowIndex += 4
```

<!--Footnotes-->

[^1]: If they weren't grouped, we'd have to search through the data, and this would be much harder. A good argument for pre-processing your data and sorting it appropriately in a tool like google sheets or excel first. 
