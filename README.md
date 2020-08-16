# ffc-template-node
Template to support rapid delivery of microservices for FFC Platform

## Edit the following

* `package.json`: `name`, `description`, `homepage`
* `docker-compose.yaml`: service name and `image`
* `docker-compose.test.yaml`: service name and `image`
* `docker-compose.override.yaml`: service name and `image`
* Rename `helm/ffc-template-node`
* `helm/ffc-template-node/Chart.yaml`: `description` and `name`
* `helm/ffc-template-node/values.yaml`: `name`, `namespace`, `workstream`, `image`, `containerConfigMap.name`
* `helm/ffc-template-node/templates/_container.yaml`: name of template
* `helm/ffc-template-node/templates/cluster-ip-service.yaml`: name of template and list parameter of include
* `helm/ffc-template-node/templates/config-map.yaml`: name of template and list parameter of include
* `helm/ffc-template-node/templates/deployment.yaml`: name of template,  list parameter of deployment and container includes
