# Azure Pipelines for the Phonebook

We have seperate Pipelines for Production Builds and Pull Requests

`/pr` handles everything concerning Pull Requests, that does mean testing, linting etc. to keep up the quality.

`/production` does not test anymore and focuses on only building a production ready app.

Find more infos on how they work [here](https://docs.microsoft.com/en-us/azure/devops/pipelines/)
