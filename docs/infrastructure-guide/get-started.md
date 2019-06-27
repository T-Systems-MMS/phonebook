# Infrastructure

The Phonebook is running on docker containers. This guide describes what is used wherefore.

> If your are running any of the commands on windows please run `$Env:COMPOSE_CONVERT_WINDOWS_PATHS=1` first.

## General

The Phonebook App is build into a docker container ([Dockerfile](/Dockerfile).

### Traefik

Traefik allows to dynamically serve Docker Images on endpoints. This is done by labelling the docker images with [routing rules](https://docs.traefik.io/basics/).

## Content Delivery

We are using NGINX to serve the static content of the Phonebook.

## Monitoring

We are using Prometheus to gather monitoring Data and Grafana to display them.

## Grafana

## Prometheus
