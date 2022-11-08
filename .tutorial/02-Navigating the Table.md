# Navigating the Table

Let's get to some coding with the table. You'll see that I've added a variable called `currentRowIndex`. In `setup` I initialize that variable to a random row in the table using the `p5.Table` function `getRowCount`.

In `draw` we get the current row given by the variable by calling the `p5.Table` function `getRow`. This function returns a `p5.TableRow`, which has many delightful functions to [read about](https://p5js.org/reference/#/p5.TableRow) as well. 

The next thing we see is some x and y variables being set up, and then an odd bit of code involving a loop:

```javascript
for( let column of table.columns ) {
  text( `${column}: ${row.get(column)}`, x, y )
  y+=dy;
}
```

A few interesting things here. 

First `table.columns` is an array that contains all the header values (first row) from the `csv` file. This is great because we can use these values to access those columns in either a `p5.Table` or a `p5.TableRow`. We use the _for-each_ style loop here to get the name of each column. 

Next, you'll see a call to the p5 `text` function which writes a string to the screen at a given location. This function is a bit quirky in the world of p5 because the x and y locations are in the lower left instead of the upper right. Just so you know. The string that we are writing is what is called a _templating string_ surrounded by the backtick (\`) character. We can embed code into the string using the following sequence of characters with javascript inside the curly brackets: `${}`. Here, we embed the column name along with the value retrieved from the column using `row.get(column)`. This is a fundamental task to be performed.  


## Challenge

Finish writing the `keyPressed` function to change `currentRowIndex` appropriately. The trick here is managing the "edge cases." In this instance, the edge cases are when the index becomes less than zero and when it is larger than the number of rows in the table.  