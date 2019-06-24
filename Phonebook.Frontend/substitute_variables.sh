#!/bin/bash

# State all variables which should be included here
variables=( BASE_URL SERVER_NAME RAVEN_URL EMPLOYEE_PICTURES_ENDPOINT ASSETS_ENDPOINT CONTACT_EMAIL CONTACT_URL ROOMPLANNINGTOOL_URL)

# BASE_URL - used througout the whole app (e.g. opensearch.xml) - example: https://example.com/


# The first parameter has to be the path to the directory or file which should be used for the substitution
if [[ -z $1 ]]; then
    echo 'ERROR: No target file or directory given.'
    exit 1
fi

for i in "${variables[@]}"
do
  # Error if variable is not defined
  if [[ -z ${!i} ]]; then
    echo 'ERROR: Variable "'$i'" not defined.'
    exit 1
  fi

  # Escape special characters, for URLs
  replaceString=$(echo ${!i} | sed -e 's/[\/&]/\\&/g')

  # Get all files including the environment variable (and ending with '.html') substitute the placeholder with its content
  if [ "$DEBUG" = true ]
  then
    # If DEBUG=true in order to log the replaced files
    grep -rl --include \*.html --include \*.xml --include \*.conf "$i" "$1" | xargs sed -i "s/\${""$i""}/$replaceString/Ig;w /dev/stdout"
  else
    # If DEBUG=false do it without logging
    grep -rl --include \*.html --include \*.xml --include \*.conf "$i" "$1" | xargs sed -i "s/\${""$i""}/$replaceString/Ig"
  fi
done

# Execute all other parameters
exec "${@:2}"