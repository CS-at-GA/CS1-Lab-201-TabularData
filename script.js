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
  currentRowIndex = int(random((table.getRowCount()+1)/4));
  noStroke();
  noLoop();

  for( let row of table.rows ) {
    for( let qc of ["lq_white","lq_black","lq_hisp","lq_asian","lq_other"]) {
      minQ = min( minQ, float(row.get(qc)) );
      maxQ = max( maxQ, float(row.get(qc)) )
    }
  }
}

function draw() {
  background('beige');
  const row = table.getRow(currentRowIndex);
  const name = row.get('metro_area')
  const x = 10;
  let y = 10;
  const dy = 14;
  noStroke();
  fill('black');
  // for( let column of table.columns ) {
  //   text( `${column}: ${row.get(column)}`, x, y )
  //   y+=dy;
  // }

  const w4 = width/4;
  const h4 = height/4;
  const r = width > height ? height/5 : width/5;
  
  text( name, 10, 10)
  for( let i = 0; i <= 3; i++ ) {
    const cr = table.getRow(currentRowIndex+i);
    if( new String(cr.get('metro_area')).valueOf() == new String(name).valueOf()) {
      const data = extractDataFromRow(cr)
      // console.log((2*(i%2)+1)*w4,(2*int(i/2))+1*h4)
      pieChart((2*(i%2)+1)*w4,((2*int(i/2))+1)*h4,r,data);
      noStroke();
      fill('black')
      text( cr.get('holc_grade'),(2*(i%2)+1)*w4,((2*int(i/2))+1)*h4 - r )
    }
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
    currentCityIndex--;
    if( currentCityIndex < 0 ) {
      currentCityIndex = int(table.getRowCount()/4) - 1;
    }
    redraw();
  }
  if( keyCode === RIGHT_ARROW ) {
    currentCityIndex++;
    if( currentRowIndex >= table.getRowCount() ) {
      currentRowIndex = 0;
    }
    redraw();
  }
}

function pieChart( x,y,r,data ) {
  console.log(r)
  const cr = r*map(1,minQ,maxQ,0.8,1.2)
  console.log(r)
  noStroke();
  let sum = 0;
  for( let d of data ) {
    sum += d.value;
  }
  let previousTheta = 0;
  for( let d of data ) {
    const currentTheta = previousTheta + TWO_PI * (d.value/sum);
    fill(d.c);
    const q = map(d.q, minQ, maxQ, 0.8, 1.2)
    // arc(x,y,r,r,previousTheta,currentTheta);
    arc(x,y,r*q,r*q,previousTheta,currentTheta);
    previousTheta = currentTheta;
  }
  noFill();
  stroke('black');
  circle(x,y,cr)
}