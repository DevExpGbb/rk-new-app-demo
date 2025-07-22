# Azure Infrastructure

This directory contains the Azure infrastructure as code for deploying the Node.js application to Azure App Service.

## Resources Created

- **Azure App Service Plan**: A Basic B1 Linux-based hosting plan
- **Azure App Service**: A web app configured for Node.js 20 LTS runtime

## Files

- `main.bicep` - Main Bicep template defining the Azure resources
- `parameters.json` - Parameter values for the deployment
- `deploy.sh` - Deployment script to provision the infrastructure
- `README.md` - This documentation file

## Prerequisites

1. Azure CLI installed and configured
2. Appropriate Azure permissions to create resources
3. An Azure subscription

## Deployment

### Using the deployment script (recommended)

```bash
# Make sure you're logged into Azure CLI
az login

# Run the deployment script
./infra/deploy.sh
```

### Manual deployment

```bash
# Create resource group (if it doesn't exist)
az group create --name "new-app-copliot-demo" --location "eastus"

# Deploy infrastructure
az deployment group create \
    --resource-group "new-app-copliot-demo" \
    --template-file "infra/main.bicep" \
    --parameters "infra/parameters.json"
```

## Configuration

The infrastructure is configured with:

- **Location**: East US (configurable via parameters)
- **App Service Plan**: Basic B1 tier (1 vCPU, 1.75 GB RAM)
- **Runtime**: Node.js 20 LTS on Linux
- **HTTPS**: Enforced
- **Resource Group**: `new-app-copliot-demo`

## Outputs

After deployment, the following information will be available:

- App Service Plan ID and name
- App Service ID and name  
- App Service default hostname
- App Service URL

## Next Steps

After the infrastructure is deployed:

1. Deploy your Node.js application code to the App Service
2. Configure any additional application settings
3. Set up CI/CD pipeline for automatic deployments
4. Configure custom domains and SSL certificates (if needed)

## Cleanup

To remove all created resources:

```bash
az group delete --name "new-app-copliot-demo" --yes --no-wait
```