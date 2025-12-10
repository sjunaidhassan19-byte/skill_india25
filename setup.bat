@echo off
setlocal enabledelayedexpansion
color 0A

echo.
echo ============================================================
echo          MEDICONNECT ADMIN - COMPLETE SETUP
echo ============================================================
echo.

REM Check Node.js installation
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and run the installer.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% found
echo.

REM Navigate to frontend
cd /d "%~dp0frontend" || (
    echo ERROR: Could not navigate to frontend folder
    pause
    exit /b 1
)

echo Current folder: %cd%
echo.

REM Clean install if needed
if "%1"=="clean" (
    echo Cleaning old installation...
    if exist node_modules (
        rmdir /s /q node_modules
        echo Removed node_modules
    )
    if exist package-lock.json (
        del package-lock.json
        echo Removed package-lock.json
    )
    echo.
)

REM Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies... (this may take 2-3 minutes)
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo ERROR: npm install failed!
        pause
        exit /b 1
    )
    echo.
)

REM Start development server
color 0A
echo ============================================================
echo.
echo [OK] Setup complete! Starting development server...
echo.
echo Server will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ============================================================
echo.

call npm run dev

pause
