@echo off
setlocal enabledelayedexpansion

echo.
echo ======================================
echo   Mediconnect Admin Frontend Setup
echo ======================================
echo.

REM Navigate to frontend folder
cd /d "c:\Users\C3I LAB_B39\Mini Mobile app\madiconnect-admin\frontend"

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/3] Node.js and npm found
echo.

REM Check if node_modules exists
if exist node_modules (
    echo [2/3] Dependencies already installed
) else (
    echo [2/3] Installing dependencies... This may take a few minutes
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: npm install failed!
        pause
        exit /b 1
    )
)

echo.
echo [3/3] Starting development server...
echo.
echo ======================================
echo   Server is starting on port 3000
echo   Open your browser to: http://localhost:3000
echo ======================================
echo.

call npm run dev

pause
