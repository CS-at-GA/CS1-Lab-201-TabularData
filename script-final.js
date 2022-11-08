let table;
const colorMap = {
  white_pop: 'maroon',
  black_pop: 'olive',
  hisp_pop: 'teal',
  asian_pop: 'navy',
  other_pop: 'grey'
}

const populationCategories = ["white_pop","black_pop","hisp_pop","asian_pop","other_pop", "total_pop"];

const sums = {
  "A": {white_pop:0,black_pop:0,hisp_pop:0,asian_pop:0,other_pop:0,total_pop:0},
  "B": {white_pop:0,black_pop:0,hisp_pop:0,asian_pop:0,other_pop:0,total_pop:0},
  "C": {white_pop:0,black_pop:0,hisp_pop:0,asian_pop:0,other_pop:0,total_pop:0},
  "D": {white_pop:0,black_pop:0,hisp_pop:0,asian_pop:0,other_pop:0,total_pop:0},
}
function preload() {
  table = loadTable("data/metro-grades.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  background(255);
  ellipseMode(RADIUS);
  noStroke();
  for( const row of table.rows ) {
    for( const popCategory of populationCategories) {
      sums[row.get("holc_grade")][popCategory] += int(row.get(popCategory))
    }
  }
  noLoop();
}

function draw() {
  const qh = height/4;
  const qw = width/4
  const r = width > height ? height/5 : width/5;
  const htw = textWidth("HOLC Grade:  ")/2;
  
  pieChart( qw,qh,r,sums["A"] );
  fill("black")
  text( "HOLC Grade: A", qw - htw, qh - r - 5);
  pieChart( 3*qw, qh, r, sums["B"])
  fill("black")
  text( "HOLC Grade: B", 3*qw - htw, qh - r - 5);  
  pieChart( qw, 3*qh, r, sums["C"])
  fill("black")
  text( "HOLC Grade: C", qw - htw, 3*qh - r - 5);  
  pieChart(3*qw,3*qh,r,sums["D"])
  fill("black")
  text( "HOLC Grade: D", 3*qw - htw, 3*qh - r - 5);

  drawKey();

  const totals = populationCategories.reduce( (totals, current) => {
    totals[current] = Object.values(sums).reduce( (sum,x) => sum += x[current], 0)
    return totals
  }, {})
  fill('black');
  text( "nation-wide population distribution", width/2 + r/2 + 5, height/2 );
  pieChart(width/2,height/2,r/2,totals);
}

function drawKey() {
  let y = height/2 - 14 * 2.5;
  for( const population of Object.keys(colorMap) ) {
    fill( colorMap[population] );
    const t = population.replace("hisp", "hispanic").replace("_pop","");
    text( t, 10, y );
    y += 14;
  }  
}

function pieChart( x,y,r,data,totalProperty = "total_pop" ) {
  const total = data[totalProperty];
  let previousTheta = 0;
  for( const k of Object.keys(data).filter( k => k !== totalProperty) ) {
    const currentTheta = previousTheta + map( data[k], 0, total, 0, TWO_PI )
    fill(colorMap[k])
    arc( x, y, r, r, previousTheta, currentTheta );
    previousTheta = currentTheta;
  }
}