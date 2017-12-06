var _ = require('lodash')
var d3 = require('d3')
var d3_gp = require('d3-geo-projection')
var topojson = require('topojson')


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
  // var lines_loc = window.location.protocol + "//" + window.location.host + "/assets/data/subway-lines.topojson"
  // var stops_loc = window.location.protocol + "//" + window.location.host + "/assets/data/subway-stations.topojson"
  var lines_loc = "assets/data/subway-lines.topojson"
  var stops_loc = "assets/data/subway-stations.topojson"

  console.log(lines_loc)

  d3.json(lines_loc, function(error, stuff) {
    if (error) return console.error(error)
    if (debug) console.log(stuff)
    app.mapdata = stuff
    app.status.routesloaded = true
    if (app.status.stationsloaded) app.status.maploaded = true
    if (app.status.maploaded) render()
  })

  d3.csv(stops_loc, function(error, stuff) {
    if (error) return console.error(error)
    if (debug) console.log(stuff)
    app.stations = stuff
    app.status.stationsloaded = true
    if (app.status.routesloaded) app.status.maploaded = true
    if (app.status.maploaded) render()
  })
}
