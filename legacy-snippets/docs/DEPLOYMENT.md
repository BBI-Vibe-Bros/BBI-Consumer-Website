# Deployment Guide

This guide explains how to handle environment variables during deployment.

## Environment Variables Setup

### Local Development
1. Copy `.env.example` to `.env`
2. Fill in the required values
3. The `.env` file is automatically loaded by Vite

### Staging Environment
1. Create a `.env.staging` file with staging-specific values
2. Use the following command to build with staging environment:
```bash
npm run build -- --mode staging
```

### Production Environment
1. Create a `.env.production` file with production-specific values
2. Use the following command to build with production environment:
```bash
npm run build -- --mode production
```

## CI/CD Integration

### GitHub Actions
Add the following secrets to your GitHub repository:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `LEAD_CONNECTOR_WEBHOOK_URL`
- `GOOGLE_MAPS_API_KEY`
- `GOOGLE_ANALYTICS_ID`

Example workflow:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build -- --mode production
        env:
          CONTENTFUL_SPACE_ID: ${{ secrets.CONTENTFUL_SPACE_ID }}
          CONTENTFUL_ACCESS_TOKEN: ${{ secrets.CONTENTFUL_ACCESS_TOKEN }}
          LEAD_CONNECTOR_WEBHOOK_URL: ${{ secrets.LEAD_CONNECTOR_WEBHOOK_URL }}
          GOOGLE_MAPS_API_KEY: ${{ secrets.GOOGLE_MAPS_API_KEY }}
          GOOGLE_ANALYTICS_ID: ${{ secrets.GOOGLE_ANALYTICS_ID }}
```

### Netlify
1. Go to Site settings > Build & deploy > Environment
2. Add the following environment variables:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `LEAD_CONNECTOR_WEBHOOK_URL`
   - `GOOGLE_MAPS_API_KEY`
   - `GOOGLE_ANALYTICS_ID`
3. Set the build command to:
```bash
npm run build -- --mode production
```

### Vercel
1. Go to Project Settings > Environment Variables
2. Add the following environment variables:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `LEAD_CONNECTOR_WEBHOOK_URL`
   - `GOOGLE_MAPS_API_KEY`
   - `GOOGLE_ANALYTICS_ID`
3. Set the build command to:
```bash
npm run build -- --mode production
```

## Security Considerations

1. **Never commit sensitive data**
   - Keep `.env` files local
   - Use platform-specific secrets management
   - Rotate keys regularly

2. **Environment-specific values**
   - Use different API keys for development and production
   - Use different webhook URLs for different environments
   - Configure analytics separately for each environment

3. **Access Control**
   - Limit access to production environment variables
   - Use role-based access control
   - Monitor access logs

## Troubleshooting

If environment variables are not loading:
1. Check if the `.env` file exists
2. Verify variable names match the code
3. Ensure the build process is using the correct mode (--mode production)
4. Check for typos in variable names
5. Verify the deployment platform's environment variable configuration 