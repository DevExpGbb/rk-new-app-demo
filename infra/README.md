# Azure Infrastructure

This directory contains the Azure infrastructure as code for deploying the containerized Node.js application to Azure App Service using Azure Container Registry.

## Resources Created

- **Azure Container Registry**: A Basic tier container registry for storing Docker images
- **Azure App Service Plan**: A Basic B1 Linux-based hosting plan
- **Azure App Service**: A web app configured for Docker container deployment

## Files

- `main.bicep` - Main Bicep template defining the Azure resources
- `parameters.json` - Parameter values for the deployment
- `deploy.sh` - Deployment script to provision the infrastructure
- `container-deploy.sh` - Script to build and deploy the container image
- `README.md` - This documentation file

## Prerequisites

1. Azure CLI installed and configured
2. Docker installed and running
3. Appropriate Azure permissions to create resources
4. An Azure subscription

## Deployment

### Step 1: Deploy Infrastructure

```bash
# Make sure you're logged into Azure CLI
az login

# Deploy the infrastructure (ACR, App Service Plan, App Service)
./infra/deploy.sh
```

### Step 2: Build and Deploy Container

```bash
# Build the Docker image and push to Azure Container Registry
./infra/container-deploy.sh
```

### Manual deployment

```bash
# Create resource group (if it doesn't exist)
az group create --name "new-app-copliot-demo" --location "westus2"

# Deploy infrastructure
az deployment group create \
    --resource-group "new-app-copliot-demo" \
    --template-file "infra/main.bicep" \
    --parameters "infra/parameters.json"

# Build and push container image
./infra/container-deploy.sh
```

## Configuration

The infrastructure is configured with:

- **Location**: West US 2 (configurable via parameters)
- **App Service Plan**: Basic B1 tier (1 vCPU, 1.75 GB RAM)
- **Container Registry**: Basic tier Azure Container Registry
- **Runtime**: Docker container with Node.js 20 Alpine
- **HTTPS**: Enforced
- **Resource Group**: `new-app-copliot-demo`

## Outputs

After deployment, the following information will be available:

- App Service Plan ID and name
- App Service ID and name  
- App Service default hostname
- App Service URL
- Container Registry ID, name, and login server

## Container Image

The application is containerized using Docker with the following features:

- **Base Image**: Node.js 20 Alpine Linux
- **Security**: Non-root user execution
- **Health Check**: Built-in health endpoint monitoring
- **Production**: Optimized for production deployment
- **Size**: Minimal footprint using Alpine Linux

## Next Steps

After the infrastructure is deployed:

1. Build and deploy your containerized application:
   ```bash
   ./infra/container-deploy.sh
   ```
2. Test the deployed application
3. Set up CI/CD pipeline for automatic deployments
4. Configure custom domains and SSL certificates (if needed)
5. Monitor application performance and logs

## Testing

After deployment, you can test the application:

```bash
# Check application health
curl https://your-app-url/health

# Test the Canada Day API
curl https://your-app-url/api/canada-day/2024
```

## Cleanup

To remove all created resources:

```bash
az group delete --name "new-app-copliot-demo" --yes --no-wait
```