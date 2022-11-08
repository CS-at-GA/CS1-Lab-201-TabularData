let table;
let currentRowIndex;

function preload() {
  table = loadTable("data/metro-grades.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  background(255);
  ellipseMode(RADIUS);
  currentRowIndex = int(random(table.getRowCount()));
  noStroke();
  noLoop();
}

function draw() {
  background('beige');
  const row = table.getRow(currentRowIndex);
  const x = 10;
  let y = 10;
  const dy = 14;
  for( let column of table.columns ) {
    text( `${column}: ${row.get(column)}`, x, y )
    y+=dy;
  }
  pieChart(width/2,height/2,100,[
    {value:1, c:color('red')},
    {value:2, c:color('blue')},
    {value:3, c:color('green')},
    {value:4, c:color('yellow')},
    {value:5, c:color('purple')}]);
}

function keyPressed() {
  if( keyCode === LEFT_ARROW ) {
    currentRowIndex--;
    if( currentRowIndex < 0 ) {
      currentRowIndex = table.getRowCount() - 1;
    }
    redraw();
  }
  if( keyCode === RIGHT_ARROW ) {
    currentRowIndex++;
    if( currentRowIndex >= table.getRowCount() ) {
      currentRowIndex = 0;
    }
    redraw();
  }
}

function pieChart( x,y,r,data ) {
  let sum = 0;
  for( let d of data ) {
    sum += d.value;
  }
  let previousTheta = 0;
  for( let d of data ) {
    const currentTheta = previousTheta + TWO_PI * (d.value/sum);
    fill(d.c);
    arc(x,y,r,r,previousTheta,currentTheta);
    previousTheta = currentTheta;
  }
}