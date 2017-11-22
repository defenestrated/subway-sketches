#head -n3 NYPD_7_Major_Felony_Incident_Map.csv | \
jq --slurp --raw-input --raw-output \
   'gsub("\"."; "") | gsub(".\""; "") | split("\n") | .[1:] | map(split(",")) |
map({"object_id": .[0],
     "event_id": .[1],
     "date": .[2],
     "weekday": .[3],
     "month": .[4],
     "day": .[5],
     "year": .[6],
     "hour": .[7],
     "cs_month": .[8],
     "cs_day": .[9],
     "cs_year": .[10],
     "offense": .[11],
     "offense_class": .[12],
     "sector": .[13],
     "precint": .[14],
     "borough": .[15],
     "jurisdiction": .[16],
     "x_coordinate": .[17],
     "y_coordinate": .[18],
     "location": .[19:]
})' \
   NYPD_7_Major_Felony_Incident_Map.csv > assault-felonies-clean.json
