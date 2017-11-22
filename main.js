var debug = true

var app = app || {}

app.status = {
  routesloaded: false,
  stationsloaded: false,
  maploaded: false
}

loaddata()

function render() {
  app.vw = window.innerWidth
  app.vh = window.innerHeight
  if (debug) console.log(app.vw, app.vh);

  var parchment = d3.select(".parchment");

  // var subunits = topojson.feature(app.mapdata, app.mapdata.objects.subunits);
  var projection = d3.geoMercator()
      .center([-73.9536162, 40.7361])
		  .scale(100000)
		  .translate([app.vw/2,app.vh/2])

  var mappath = d3.geoPath()
      .projection(projection)

  var mapstuff = parchment.append("g").attr("class", "map-data")

  // parchment.append("path")
  //     .datum(subunits)
  //     .attr("d", path);

  mapstuff.selectAll(".trainline")
    .data(topojson.feature(app.mapdata, app.mapdata.objects.subway_lines).features)
    .enter().append("path")
    .attr("class", "trainline")
    .attr("id", (d) => {return d.properties.name})
    .attr("d", mappath)

}


function loaddata() {
  d3.json("assets/data/subway-lines.topojson", function(error, stuff) {
    if (error) return console.error(error)
    if (debug) console.log(stuff)
    app.mapdata = stuff
    app.status.routesloaded = true
    if (app.status.stationsloaded) app.status.maploaded = true
    if (app.status.maploaded) render()
  })

  d3.csv("assets/data/subway-stations.topojson", function(error, stuff) {
    if (error) return console.error(error)
    if (debug) console.log(stuff)
    app.stations = stuff
    app.status.stationsloaded = true
    if (app.status.routesloaded) app.status.maploaded = true
    if (app.status.maploaded) render()
  })
}
