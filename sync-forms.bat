@echo off
REM MitchNBugXNacosa Form Synchronization Script
REM This script synchronizes forms from a source repository and publishes them to the backend

echo Starting form synchronization process...

REM Step 1: Navigate to the project root directory
cd /d "%~dp0"
echo Current directory: %cd%

REM Step 2: Pull latest changes from the forms repository (assuming forms are in a separate repo or branch)
REM Replace 'forms-repo-url' with the actual repository URL containing the forms
REM If forms are in the same repo, this step can be skipped or modified to pull from a specific branch
echo Pulling latest forms from repository...
git pull origin main
if %errorlevel% neq 0 (
    echo Error: Failed to pull from repository
    pause
    exit /b 1
)

REM Step 3: Copy forms from source directory to backend public forms directory
REM Assuming forms are stored in a 'forms-source' directory in the project root
REM Adjust paths as needed based on your actual directory structure
echo Copying forms to backend public directory...
if exist "forms-source\*.xml" (
    copy "forms-source\*.xml" "backend\public\forms\"
    echo Forms copied successfully
) else (
    echo Warning: No XML forms found in forms-source directory
)

REM Step 4: Validate that forms were copied correctly
echo Validating form deployment...
dir "backend\public\forms\*.xml"
if %errorlevel% neq 0 (
    echo Error: No forms found in backend public directory after copy
    pause
    exit /b 1
)

REM Step 5: Restart backend service if running (optional, depending on deployment setup)
REM This assumes the backend is running as a service or via npm
REM Uncomment and modify as needed
REM echo Restarting backend service...
REM net stop "MitchNBugXNacosa Backend" 2>nul
REM net start "MitchNBugXNacosa Backend" 2>nul

REM Step 6: Log the synchronization
echo %date% %time% - Forms synchronized successfully >> sync-forms.log

echo Form synchronization completed successfully!
echo Check sync-forms.log for details
pause