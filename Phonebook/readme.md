# Phonebook Application

The Deployment Guide for the Phonebook.
We use [traefik](https://traefik.io/) under the hood. 

## Deployment

### Installation

> Please make sure you have a running Kubernetes Cluster, with Tiller and Helm installed.

1. Create your `values.yml`. For settings look [here](#Settings).

    ```yml
    # Minimal Working Example
    host: &host 'example.com'
    contactUrl: '<Your Contact Url, maybe an issue tracker?>'
    roomPlanningToolUrl: '<Url to your Room Planning Tool>'
    contactEmail: &contactEmail '<Your Contact Email>'
    employeePictureEndpoint: '<Url To you User Picture Endpoint>'
    assetsEndpoint: '<Url To you User Assets Endpoint>'
    ```

    For a more complete Example have a look at our demo [values.yml](../demo/values.yml).

2. Install your Phonebook application by running `helm install --values ./path/to/your/values.yml https://github.com/T-Systems-MMS/phonebook/releases/download/<latest release>/phonebook.tgz`

#### Settings

If you install into a different namespace than `kube-public` please be sure to also update the `traefik.kubernetes.namespaces` parameters.

#### Phonebook

| Parameter                | required | Description                                                                                                                                                                                          | Default Value                                                                                | Example                                             |
| ------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `host`                   | Yes      | The host used by the installation                                                                                                                                                                    | `localhost`                                                                                  | `domain.com`                                        |
| `environment`            | Yes      | Determines the Environment the application is running in. Possible values: `development`, `preview`, `production`. Read more [here](..\Phonebook.Frontend\src\environments\EnvironmentInterfaces.ts) | `development`                                                                                | `production`                                        |
| `environmentTag`         | Yes      | The tag that will be displayed alongside the title of the page. Can be any string.                                                                                                                   | Depends on the environment: `development` - `dev`, `preview`- `preview`, `production` - none | `demo-label`                                        |
| `contactUrl`             | Yes      | The contact Url used for private Feedback throughout the app                                                                                                                                         | none                                                                                         | `https://github.com/T-Systems-MMS/phonebook/issues` |
| `roomPlanningToolUrl`    | No      | If you are using a Room Planning Tool you can provide a link here.                                                                                                                                   | none                                                                                         | `https://room.tool.com`                             |
| `contactEmail`           | Yes      | Provide a contact Email for your users.                                                                                                                                                              | none                                                                                         | `help@here.com`                                     |
| `ravenUrl`               | No       | If you want to collect Bug Reports automatically you can setup a [Sentry](https://sentry.io/) Instance provide the link for Raven through this parameter.                                            | none                                                                                         | `https://<key>@sentry.io/<project>`                 |
| `employeePictureEnpoint` | No      | Provide an Endpoint for the pictures of you users.                                                                                                                                                   | none                                                                                         | `https://employee.pictures.com`                     |
| `assetsEndpoint`         | Yes      | Provide an Endpoint for the assets (roomplans, pictures of Building).                                                                                                                                | none                                                                                         | `https://assets.company.com`                        |
| `rocketChatUrl`          | No       | Add a direct link from the user profile to [RocketChat](https://rocket.chat/). (Linked by `person.Id`)                                                                                               | none                                                                                         | `https://rocketchat.yourcompany.com`                |

For more advanced settings have a look [here](phonebook/values.yaml).

#### Traefik

You can overwrite traefik's configuration by setting the parameters under the `traefik` parameter. You can find them [here](https://github.com/helm/charts/tree/master/stable/traefik).
This Chart only sets some basic settings. You can have a look at them [here](phonebook/values.yaml).

### Upgrade

`helm upgrade phonebook --values ./path/to/your/values.yml ./phonebook`

### Uninstalling the Chart

```bash
helm delete <deployment-name>
```

## Development

Execute `helm install --dry-run --debug`
