#!/bin/bash

# Container Build and Deployment Script for Azure Container Registry
# This script builds the Docker image and pushes it to Azure Container Registry

set -e

# Variables
RESOURCE_GROUP="new-app-copliot-demo"
LOCATION="westus2"
IMAGE_NAME="canada-day-calc"
IMAGE_TAG="latest"

echo "🐳 Starting container build and deployment process..."
echo "Resource Group: $RESOURCE_GROUP"
echo "Location: $LOCATION"
echo "Image: $IMAGE_NAME:$IMAGE_TAG"

# Check if logged into Azure
echo "📋 Checking Azure CLI login status..."
if ! az account show &> /dev/null; then
    echo "❌ Not logged into Azure. Please run 'az login' first."
    exit 1
fi

# Get the container registry name from the deployment
echo "🔍 Getting Azure Container Registry details..."
ACR_NAME=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "app-service-deployment-$(date +%Y%m%d)*" \
    --query "properties.outputs.containerRegistryName.value" \
    --output tsv 2>/dev/null | head -n1)

if [ -z "$ACR_NAME" ]; then
    echo "❌ Could not find Container Registry. Make sure the infrastructure is deployed first."
    echo "Run './infra/deploy.sh' to deploy the infrastructure."
    exit 1
fi

echo "📦 Container Registry: $ACR_NAME"

# Get ACR login server
ACR_LOGIN_SERVER=$(az acr show --name "$ACR_NAME" --resource-group "$RESOURCE_GROUP" --query "loginServer" --output tsv)
echo "🔗 ACR Login Server: $ACR_LOGIN_SERVER"

# Login to Azure Container Registry
echo "🔐 Logging into Azure Container Registry..."
az acr login --name "$ACR_NAME"

# Build the Docker image
echo "🏗️  Building Docker image..."
docker build -t "$IMAGE_NAME:$IMAGE_TAG" .

# Tag the image for ACR
echo "🏷️  Tagging image for Azure Container Registry..."
docker tag "$IMAGE_NAME:$IMAGE_TAG" "$ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG"

# Push the image to ACR
echo "📤 Pushing image to Azure Container Registry..."
docker push "$ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG"

# Update App Service to use the new container image
echo "🔄 Updating App Service with new container image..."
az webapp config container set \
    --name "app-new-app-demo" \
    --resource-group "$RESOURCE_GROUP" \
    --docker-custom-image-name "$ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG" \
    --docker-registry-server-url "https://$ACR_LOGIN_SERVER"

# Restart the App Service to pick up the new image
echo "🔄 Restarting App Service..."
az webapp restart \
    --name "app-new-app-demo" \
    --resource-group "$RESOURCE_GROUP"

# Get the App Service URL
APP_SERVICE_URL=$(az webapp show \
    --name "app-new-app-demo" \
    --resource-group "$RESOURCE_GROUP" \
    --query "defaultHostName" \
    --output tsv)

echo ""
echo "✅ Container deployment completed successfully!"
echo ""
echo "📋 Summary:"
echo "  Container Registry: $ACR_NAME"
echo "  Login Server: $ACR_LOGIN_SERVER"
echo "  Image: $ACR_LOGIN_SERVER/$IMAGE_NAME:$IMAGE_TAG"
echo "  App Service URL: https://$APP_SERVICE_URL"
echo ""
echo "🌐 Your containerized Node.js app is available at: https://$APP_SERVICE_URL"
echo ""
echo "🔍 To check the health of your app:"
echo "  curl https://$APP_SERVICE_URL/health"
echo ""
echo "🧪 To test the API:"
echo "  curl https://$APP_SERVICE_URL/api/canada-day/2024"