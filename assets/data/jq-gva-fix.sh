head -n3 gva-ny-2016-10-23.csv | \
    jq --slurp -rR \
       'gsub("\""; "") | gsub(", "; " ") | split("\n") | .[1:] | map(split(",")) |
map({ "date": .[0],
      "state": .[1],
      "city": .[2],
      "address": .[3],
      "killed": .[4],
      "injured": .[5]})' \
 gva-ny-2016-10-23.csv > gva-ny-2016-10-23.json
