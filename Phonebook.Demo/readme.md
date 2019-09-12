# Demo Application for the Phonebook

## Prerequisites

### Working Kubernetes Cluster

#### Setup in Azure

> Note: To get the subscription id run `az account list`

1. `az group create --subscription <id> --name phonebook-kubernetes --location northeurope`
2. `az provider register --subscription <id> --namespace Microsoft.ContainerService`
3. `az aks create --subscription <id> --resource-group phonebook-kubernetes --name phonebook-cluster --node-count 1 --enable-addons monitoring --generate-ssh-keys --disable-rbac`
4. `az aks get-credentials --subscription <id> --resource-group phonebook-kubernetes --name phonebook-cluster`

> More Information [here](https://docs.microsoft.com/de-de/azure/aks/kubernetes-walkthrough)

> You can delete it with `az group delete --name phonebook-kubernetes --yes --no-wait`

### Helm and Tiller installed

> [Install Tiller on you Kubernetes Cluster first.](https://docs.microsoft.com/de-de/azure/aks/kubernetes-helm)

Configure RBAC by running `kubectl apply -f helm-rbac.yml`.

`kubectl create -f .\phonebook-namespace.yml`

## Installation

1. Install the Phonebook Application as described [here](./../Phonebook/readme.md) (under "Installation").
2. Install the Mocks:
   - Backend - `kubectl apply -f Phonebook.MockBackend.yml`
   - Assets - `kubectl apply -f Phonebook.Assets.yml`

## Uninstall

1. Delete the Mocks: 
   - Assets - `kubectl delete -f .\Phonebook.Assets.yml`
   - Backend - `kubectl delete -f .\Phonebook.MockBackend.yml`
2. Uninstall the Phonebook Application as described  [here](./../Phonebook/readme.md) (under "Uninstall").
