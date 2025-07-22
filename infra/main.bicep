@description('Location for all resources')
param location string = resourceGroup().location

@description('Name of the App Service Plan')
param appServicePlanName string = 'asp-new-app-demo'

@description('Name of the App Service')
param appServiceName string = 'app-new-app-demo'

@description('SKU for the App Service Plan')
param sku object = {
  name: 'F1'
  tier: 'Free'
  size: 'F1'
  family: 'F'
  capacity: 1
}

@description('Runtime stack for the App Service')
param linuxFxVersion string = 'NODE|20-lts'

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
      linuxFxVersion: linuxFxVersion
      appCommandLine: 'npm start'
      appSettings: [
        {
          name: 'NODE_ENV'
          value: 'production'
        }
        {
          name: 'PORT'
          value: '8080'
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