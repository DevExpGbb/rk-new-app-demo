# Azure App Service Status Scripts

This directory contains scripts to check the status of the App Service running in Azure using Azure MCP server tools.

## Scripts

### 1. `check-app-service-status.js`
A comprehensive status report script that displays the current state of the App Service based on Azure MCP tool queries.

**Usage:**
```bash
node scripts/check-app-service-status.js
```

**Features:**
- Shows current App Service state and configuration
- Displays application URLs for testing
- Lists outbound IP addresses
- Provides health check recommendations
- Exit code indicates service health (0 = healthy, 1 = issues)

### 2. `azure-status-live.js`
An educational script that demonstrates the Azure MCP tools usage patterns for live status monitoring.

**Usage:**
```bash
node scripts/azure-status-live.js
```

**Features:**
- Shows step-by-step Azure MCP tool usage
- Demonstrates the complete monitoring workflow
- Provides implementation guidance
- Educational resource for Azure MCP integration

## Azure Resources Monitored

- **Resource Group:** `new-app-copliot-demo`
- **App Service:** `app-new-app-demo`
- **App Service Plan:** `asp-new-app-demo`
- **Location:** West US 2
- **Runtime:** Node.js 20 LTS on Linux

## Azure MCP Tools Used

1. **Azure-azmcp_subscription_list**: Lists available Azure subscriptions
2. **Azure-azmcp_group_list**: Lists resource groups in a subscription
3. **Azure-azmcp_extension_az**: Executes Azure CLI commands for detailed resource information

## Sample Output

```
🔍 Azure App Service Status Checker
=====================================

📋 Configuration:
   Subscription ID: e5a80692-cd9b-4e75-aed6-af99fc79847e
   Resource Group: new-app-copliot-demo
   App Service Name: app-new-app-demo
   App Service Plan: asp-new-app-demo

✅ App Service Status Summary:
🌐 Application URL: https://app-new-app-demo.azurewebsites.net
📊 Current State: Running
🔒 HTTPS Only: true
✅ Enabled: true
📈 Availability: Normal
🐧 Runtime: NODE|20-lts
📍 Location: West US 2
⏰ Last Modified: 2025-07-22T01:06:57.670000
```

## Integration

These scripts can be integrated into:
- CI/CD pipelines for deployment verification
- Monitoring and alerting systems
- Health check automation
- Infrastructure status dashboards

## Requirements

- Node.js runtime
- Access to Azure MCP server tools
- Appropriate Azure permissions for the target subscription and resource group