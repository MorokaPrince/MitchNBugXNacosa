# MitchNBugXNacosa Project

## Overview

MitchNBugXNacosa is a comprehensive data collection and management system designed for community health and social support surveys. The project integrates Enketo Express for web-based form rendering and a Node.js backend for handling Open Data Kit (ODK) submissions. It supports XLSForm-based surveys for efficient data collection in resource-constrained environments.

## Project Components

### Enketo Express
- **Purpose**: Web-based form renderer that converts XLSForm XML into interactive web forms
- **Location**: `enketo_express/` directory
- **Technology**: Node.js application with Express framework
- **Configuration**: `enketo_express/config/config.json`
- **Features**: Offline-capable forms, multi-language support, data encryption

### Backend
- **Purpose**: API server for handling form submissions and data storage
- **Location**: `backend/` directory
- **Technology**: Node.js with Express.js
- **Dependencies**: body-parser, express, multer, xml2js
- **Routes**: ODK-compatible endpoints in `backend/routes/odk.js`
- **Public Assets**: Static files served from `backend/public/`

### Forms
- **Location**: `backend/public/forms/`
- **Format**: XLSForm XML files
- **Example**: `test-form.xml` (sample form)
- **Purpose**: Survey definitions used by Enketo for rendering

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- Docker (for containerized deployment)
- Render account (for cloud deployment)

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd MitchNBugXNacosa
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
The backend will run on port 5001 by default.

### 3. Enketo Express Setup
```bash
cd ../enketo_express
npm install
npm start
```
Enketo will run on port 8005 by default.

### 4. Configuration
- Update `enketo_express/config/config.json` with your API keys and server URLs
- Ensure the backend URL in Enketo config matches your local backend instance

### 5. Form Deployment
- Place XLSForm XML files in `backend/public/forms/`
- Access forms via Enketo interface

## Deployment

### Backend Deployment (Render)
1. Connect repository to Render
2. Select Node.js runtime
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Configure environment variables if needed

### Enketo Express Deployment (Render)
1. Use the included Dockerfile
2. Set environment variables:
   - `ENKETO_API_KEY`: Your Enketo API key
   - `ENKETO_SECRET`: Encryption secret (32 characters)
   - `PORT`: 8005
3. Deploy as web service

### Environment Variables
For Enketo:
```
ENKETO_API_KEY=your_api_key_here
ENKETO_SECRET=your_32_char_secret
PORT=8005
```

## Usage

1. Access Enketo interface at deployed URL
2. Load forms from the backend's public/forms directory
3. Collect data through web forms
4. Submissions are sent to the backend API
5. Monitor submissions via the QC dashboard

## Quality Control Dashboard

Access the QC dashboard at `backend/public/qc-dashboard.html` to review form submissions and data quality metrics.

## Form Synchronization

Use the included `sync-forms.bat` script to synchronize forms between development and production environments.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test locally
5. Submit a pull request

## Support

For support, contact support@nacosa.org.za

## License

[Add license information if applicable]