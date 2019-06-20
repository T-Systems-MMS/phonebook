# Deployment

The Deployment Guide for the Phonebook.

### 1. Create and set up your Kubernetes Cluster

#### Azure:

1. `az group create --subscription <id> --name phonebook-kubernetes --location northeurope`
2. `az aks create --subscription <id> --resource-group phonebook-kubernetes --name phonebook-cluster --node-count 1 --enable-addons monitoring --generate-ssh-keys`
3. `az aks get-credentials --subscription <id> --resource-group phonebook-kubernetes --name phonebook-cluster`

> More Information here:
>
> 1. https://docs.microsoft.com/de-de/azure/aks/kubernetes-walkthrough

### 2. Install Helm and Traefik

> Install Tiller on you Kubernetes Cluster first: https://docs.microsoft.com/de-de/azure/aks/kubernetes-helm

1. `helm install --name phonebook --values traefik.values.yml stable/traefik`
2. `kubectl apply -f Phonebook.Frontend.yml`
3. `kubectl apply -f Phonebook.Assets.yml`

### 3. Update with Changes

`helm upgrade phonebook --values traefik.values.yml stable/traefik`
