# Creating the Pie (Chart)

It is great to be able to see and navigate the data, but it is hard to make any meaning of it, since it is just raw numbers. So, let's make a visual representation of some of the data for a given row. In this case, let's make a pie chart.  

It might seem like a daunting task, but it actually turns out to be very simple given the tools we have available to us. It is important to note a couple of things about a pie chart. 

1. It is made up arcs of a shared circle whose angle values sum to 2π.
2. It represents portions of data whose total must add up to 1.

So, our algorithm for making a pie chart looks something like this: 

```pseudocode
// given: a list of data
// given: a center and radius of a circle
// add up all the data and store the total in a variable
// set a variable representing the previous theta (angle) value and set it to 0. 
// go through all the data 
//   calculate a ratio of the currenet data point/total
//   multiply that ratio by 2π and store the result
//   set a current theta value = previous value + result 
//   draw an arc from previous value to currenet value
//   set previous to current
```
Resulting in code that looks something like this: 
```javascript
function pieChart( x,y,r,data ) {
  let sum = 0;
  for( let d of data ) {
    sum += d;
  }
  let previousTheta = 0;
  for( let d of data ) {
    const currentTheta = previousTheta + TWO_PI * (d/sum);
    arc(x,y,r,r,previousTheta,currentTheta);
    previousTheta = currentTheta;
  }
}
```
If you tested the code with something like this:`pieChart(width/2,height/2,100,[1,2,3,4,5]);`, you'd notice that you end up with a plain, white circle. It is because the fill is the same for all the arcs. 

## Challenge

Add something to solve the problem of the single-color arcs. It would be best if your solution didn't involve random colors. As you can see from the exemplar at the beginning, all of the pie charts have the same color scheme. 
