# Aggregrating Data
_just a fancy word for adding things up_

The final step of this involves displaying what each of the four grades looks like at a national level, then displaying four different pie charts. To do this, we need to aggregate the data. That is, sum up all the values for all the populations and separate them by grade. 

## Summing the values

This sounds like an easy thing, but how many values are we talking about here? There are four different grades and five different populations, which means there are twenty different sums to keep track of. Structuring our data cleverly will help us out a lot. 

JavaScript's objects can help out a lot here **and** we should use the column names and grade names as keys whenever possible.[^1] Here is how I recommend structuring the data:

```javascript
const sums = {
  "A": {white_pop:0,black_pop:0,hisp_pop:0,asian_pop:0,other_pop:0},
  "B": {white_pop:0,black_pop:0,hisp_pop:0,asian_pop:0,other_pop:0},
  "C": {white_pop:0,black_pop:0,hisp_pop:0,asian_pop:0,other_pop:0},
  "D": {white_pop:0,black_pop:0,hisp_pop:0,asian_pop:0,other_pop:0},
}
```
It should be noted that we aren't really short-cutting anything here. There are still twenty variables, but we've structured things so that they will be easy to access later.

Look at this: 

```javascript
const populationCategories =  ["white_pop","black_pop","hisp_pop","asian_pop","other_pop"]
for( const row of table.rows ) {
  for( const popCategory of populationCategories) {
    sums[row.get("holc_grade")][popCategory] += int(row.get(popCategory))
  }
}
```

Let's write out what's happening, since it is kind of dense. 

First, we set up an array with all the header names for the population categories. Then, we go through each row of the table. For each row, we go through each population category. This makes sense: 
> _for each row, and for each population category in that row, we want to update the sums_.

The next line is the doozy and the magic. Let's look at the right side first: `int(row.get(popCategory))`. This is getting the value we want to add with. That means the left side is the value we want to add to. We already have `popCategory`, so now we just need to make sure we are adding to the right popCategory (the one for the row's grade.) The row's grade can be found at `row.get('holc_grade')`. So, we ask `sums` to retrieve that object by saying: `sums[row.get('holc_grade')]`. That value is the object with all the sums for that grade. Then, we ask that object to retrieve the value for the current population category: `sums[row.get('holc_grade')][popCategory]` and that is the value we update. 

_It should be noted that this work will be done in `setup`. This isn't the kind of thing you'd want do every call to `draw`, and certainly, you don't need to._


## Layout 
Consult the drawing to see a suggestion for the layout: [4 Pie Layout](https://replit.com/@ga-cs1-2223/Lab-201-Tabular-Data#.tutorial/assets/4pieLayout.draw). The only consideration is making sure we set the radius for the circles to be based on the orientation of the screen. 

## Pulling it all together. 
Now that you have the data you need, you'll potentially need to make some changes to what you're passing in to `pieChart`, or how you process the `data` parameter before displaying it, but you should be close! 

## Challenges
1. Display the four aggregate pie charts for each of the categories.
2. Create a key and a label for what's on the screen to help users interpret the data
3. **Honors** Display a fifth chart that shows the nation-wide population distribution. 

<!--Footnote-->

[^1]: It is even possible to generate these structures dynamically, but that is maybe beyond the scope of this project initially. 