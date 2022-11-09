let table;
let currentRowIndex;
let minQ = Infinity;
let maxQ = -Infinity;
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
  noStroke();
  fill('black');
  for( let column of table.columns ) {
    text( `${column}: ${row.get(column)}`, x, y )
    y+=dy;
  }
}

function extractDataFromRow( row ) {
  return [
    {value:int(row.get('white_pop')), q: row.getNum('lq_white'), c:color('red')},
    {value:int(row.get('black_pop')), q: row.getNum('lq_black'), c:color('green')},
    {value:int(row.get('hisp_pop')), q: row.getNum('lq_hisp'), c:color('blue')},
    {value:int(row.get('asian_pop')), q: row.getNum('lq_asian'), c:color('orange')},
    {value:int(row.get('other_pop')), q: row.getNum('lq_other'), c:color('purple')}  
  ]
}

function keyPressed() {
  if( keyCode === LEFT_ARROW ) {
    redraw();
  }
  if( keyCode === RIGHT_ARROW ) {
    redraw();
  }
}