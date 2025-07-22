@description('Location for all resources')
param location string = resourceGroup().location

@description('Name of the App Service Plan')
param appServicePlanName string = 'asp-new-app-demo'

@description('Name of the App Service')
param appServiceName string = 'app-new-app-demo'

@description('Name of the Azure Container Registry')
param containerRegistryName string = 'acrnewappdemo${uniqueString(resourceGroup().id)}'

@description('SKU for the App Service Plan')
param sku object = {
  name: 'B1'
  tier: 'Basic'
  size: 'B1'
  family: 'B'
  capacity: 1
}

@description('Container image name and tag')
param containerImage string = 'canada-day-calc:latest'

// Azure Container Registry
resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-07-01' = {
  name: containerRegistryName
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
  }
}

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: appServicePlanName
  location: location
  kind: 'linux'
  properties: {
    reserved: true
  }
  sku: sku
}

// App Service
resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: appServiceName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOCKER|${containerRegistry.properties.loginServer}/${containerImage}'
      appCommandLine: ''
      appSettings: [
        {
          name: 'NODE_ENV'
          value: 'production'
        }
        {
          name: 'PORT'
          value: '8080'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${containerRegistry.properties.loginServer}'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_USERNAME'
          value: containerRegistry.listCredentials().username
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_PASSWORD'
          value: containerRegistry.listCredentials().passwords[0].value
        }
      ]
    }
    httpsOnly: true
  }
}

// Outputs
@description('App Service Plan ID')
output appServicePlanId string = appServicePlan.id

@description('App Service Plan name')
output appServicePlanName string = appServicePlan.name

@description('App Service ID')
output appServiceId string = appService.id

@description('App Service name')  
output appServiceName string = appService.name

@description('App Service default hostname')
output appServiceDefaultHostname string = appService.properties.defaultHostName

@description('App Service URL')
output appServiceUrl string = 'https://${appService.properties.defaultHostName}'

@description('Container Registry ID')
output containerRegistryId string = containerRegistry.id

@description('Container Registry name')
output containerRegistryName string = containerRegistry.name

@description('Container Registry login server')
output containerRegistryLoginServer string = containerRegistry.properties.loginServer