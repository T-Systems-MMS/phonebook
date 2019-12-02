#!/bin/bash

# State all required variables here
requiredVariables=( BASE_URL SERVER_NAME ENVIRONMENT ENVIRONMENT_TAG ASSETS_ENDPOINT CONTACT_EMAIL CONTACT_URL)

# State all optional variables here
optionalVariables=( RAVEN_URL EMPLOYEE_PICTURES_ENDPOINT ROOMPLANNINGTOOL_URL SMARTSPACES_URL)

# BASE_URL - used througout the whole app (e.g. opensearch.xml) - example: https://example.com/


# The first parameter has to be the path to the directory or file which should be used for the substitution
if [[ -z $1 ]]; then
    echo 'ERROR: No target file or directory given.'
    exit 1
fi

# Variables defined as required will error if not supplied
for i in "${requiredVariables[@]}"
do
  # Error if variable is not defined
  if [[ -z ${!i} ]]; then
    echo 'ERROR: Variable "'$i'" not defined.'
    exit 1
  fi
done

# Write Variables to files
for i in "${requiredVariables[@]}" "${optionalVariables[@]}"
do
  # Inform if a variable is not defined
  if [[ -z ${!i} ]]; then
    echo 'INFO: Variable "'$i'" not defined.'
  else
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
  fi
done

# Execute all other parameters
exec "${@:2}"
