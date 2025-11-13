@echo off
echo ========================================
echo   Snake Game - Vercel Deployment
echo ========================================
echo.

echo Checking if Vercel CLI is installed...
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Vercel CLI not found. Installing...
    call npm install -g vercel
)

echo.
echo Building project...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed! Please check for errors.
    pause
    exit /b 1
)

echo.
echo Deploying to Vercel...
call vercel --prod

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your game is now live on the internet!
echo Check the URL above to access it.
echo.
pause

