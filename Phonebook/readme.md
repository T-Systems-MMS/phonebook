# Phonebook Application

The Deployment Guide for the Phonebook.
We use [traefik](https://traefik.io/) under the hood. 

## Deployment

### Installation

> Currenty we don't have a Chart package so please clone the repo. 

> Please make sure you have a running Kubernetes Cluster, with Tiller and Helm installed.

1. Create your `values.yml`. For settings look [here](#Settings).
2. Install your Phonebook application by running `helm install --values ./path/to/your/values.yml ./phonebook`

#### Settings

> You can overwrite traefik's configuration by setting the parameters under the `traefik` parameter. You can find them [here](https://github.com/helm/charts/tree/master/stable/traefik).

| Parameter | Description                       | Default Value |
| --------- | --------------------------------- | ------------- |
| host      | The host used by the installation | localhost     |

### Upgrade

`helm upgrade phonebook --values ./path/to/your/values.yml ./phonebook`

### Uninstalling the Chart

```bash
helm delete <deployment-name>
```

## Development

Execute `helm install --dry-run --debug`
