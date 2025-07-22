#!/bin/bash

# Deploy Azure App Service Plan and App Service
# This script deploys the infrastructure to the specified resource group

set -e

# Variables
RESOURCE_GROUP="new-app-copliot-demo"
LOCATION="westus2"
DEPLOYMENT_NAME="app-service-deployment-$(date +%Y%m%d-%H%M%S)"

echo "🚀 Starting deployment of Azure App Service infrastructure..."
echo "Resource Group: $RESOURCE_GROUP"
echo "Location: $LOCATION"
echo "Deployment Name: $DEPLOYMENT_NAME"

# Check if resource group exists, create if it doesn't
echo "📋 Checking if resource group exists..."
if ! az group show --name "$RESOURCE_GROUP" &> /dev/null; then
    echo "✨ Creating resource group: $RESOURCE_GROUP"
    az group create --name "$RESOURCE_GROUP" --location "$LOCATION"
else
    echo "✅ Resource group $RESOURCE_GROUP already exists"
fi

# Deploy the Bicep template
echo "🏗️  Deploying infrastructure..."
az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file "infra/main.bicep" \
    --parameters "infra/parameters.json" \
    --name "$DEPLOYMENT_NAME" \
    --verbose

# Get deployment outputs
echo "📤 Getting deployment outputs..."
APP_SERVICE_URL=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$DEPLOYMENT_NAME" \
    --query "properties.outputs.appServiceUrl.value" \
    --output tsv)

APP_SERVICE_NAME=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$DEPLOYMENT_NAME" \
    --query "properties.outputs.appServiceName.value" \
    --output tsv)

APP_SERVICE_PLAN_NAME=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$DEPLOYMENT_NAME" \
    --query "properties.outputs.appServicePlanName.value" \
    --output tsv)

CONTAINER_REGISTRY_NAME=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$DEPLOYMENT_NAME" \
    --query "properties.outputs.containerRegistryName.value" \
    --output tsv)

CONTAINER_REGISTRY_LOGIN_SERVER=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "$DEPLOYMENT_NAME" \
    --query "properties.outputs.containerRegistryLoginServer.value" \
    --output tsv)

echo ""
echo "✅ Infrastructure deployment completed successfully!"
echo ""
echo "📋 Summary:"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  App Service Plan: $APP_SERVICE_PLAN_NAME"
echo "  App Service: $APP_SERVICE_NAME"
echo "  App Service URL: $APP_SERVICE_URL"
echo "  Container Registry: $CONTAINER_REGISTRY_NAME"
echo "  Container Registry Login Server: $CONTAINER_REGISTRY_LOGIN_SERVER"
echo ""
echo "🌐 Your containerized Node.js app infrastructure is ready!"
echo ""
echo "Next steps:"
echo "1. Build and deploy your container image:"
echo "   ./infra/container-deploy.sh"
echo "2. Test the deployed application at: $APP_SERVICE_URL"
echo "3. Set up CI/CD pipeline for automatic deployments"