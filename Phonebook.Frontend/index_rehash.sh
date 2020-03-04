#!/bin/bash

# This updates the hash of the index.html in the corresponding ngsw.json 
# Execute it after replacing the environment variables

# Paths to folders containing the index.html files (where the hash should be recalculated)
paths=( "de" "en")

# The first parameter has to be the path to the directory with the language folders
if [[ -z $1 ]]; then
    echo 'ERROR: No target file or directory given.'
    exit 1
fi



# Go to all folders containing index.html and ngsw.json
for i in "${paths[@]}"
do
  # Calculate hash of index.html
  replaceString=($(sha1sum $1/$i/index.html))

  if [ "$DEBUG" = true ]
  then
    # If DEBUG=true in order to log the replaced files
    sed -i "s|\"\/$i\/index\.html\":\s\"\(.*\)\"|\"/""$i""/index.html\": \"""$replaceString""\"|Ig;w /dev/stdout" "$1/$i/ngsw.json"
  else
    # If DEBUG=false do it without logging
    sed -i "s|\"\/$i\/index\.html\":\s\"\(.*\)\"|\"/""$i""/index.html\": \"""$replaceString""\"|Ig" "$1/$i/ngsw.json"
  fi
done

# Execute all other parameters
exec "${@:2}"
