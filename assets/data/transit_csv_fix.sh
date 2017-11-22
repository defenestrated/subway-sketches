#!/usr/local/bin/zsh
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

cols="Line,Station Name,Station Latitude,Station Longitude"
routes="${$(echo Route{1..11},)//[[:blank:]]/}"
stripped=${routes%?}
combined=$cols","$stripped
echo "pulling from: "$cols

stringcheese="${$(echo \$Route{1..11})//[[:blank:]]/ . \" \" . }"
echo $stringcheese

soup="\$routelist = "$stringcheese
echo $soup

mlr --icsv --ojson --jvstack --jlistwrap cut -f $combined then head -n 1 -g "Station Name" then put $soup then cut -f $cols",routelist" NYC_Transit_Subway_Entrance_And_Exit_Data.csv > subway_stations_pruned.json
