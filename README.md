# FFC Template Node

Template to support rapid delivery of microservices for FFC Platform. It contains the configuration needed to deploy a simple Hapi Node server to the Azure Kubernetes Platform.

## Usage

Create a new repository from this template then edit the following to work with the name of your new repository:

* `package.json`: update `name`, `description`, `homepage`
* `docker-compose.yaml`: update the service name, `image` and `container_name`
* `docker-compose.test.yaml`: update the service name, `image` and `container_name`
* `docker-compose.override.yaml`: update the service name, `image` and `container_name`
* Rename `helm/ffc-template-node`
* `helm/ffc-template-node/Chart.yaml`: update `description` and `name`
* `helm/ffc-template-node/values.yaml`: update  `name`, `namespace`, `workstream`, `image`, `containerConfigMap.name`
* `helm/ffc-template-node/templates/_container.yaml`: update the template name
* `helm/ffc-template-node/templates/cluster-ip-service.yaml`: update the template name and list parameter of include
* `helm/ffc-template-node/templates/config-map.yaml`: update the template name and list parameter of include
* `helm/ffc-template-node/templates/deployment.yaml`: update the template name, list parameter of deployment and container includes

The Helm chart deployment values in `helm/ffc-template-node/values.yaml` may need updating depending on the resource needs of your microservice.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
