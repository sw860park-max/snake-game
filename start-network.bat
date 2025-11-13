@echo off
echo ========================================
echo   Snake Game - Network Server
echo ========================================
echo.

echo Checking your IP address...
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    echo Network IP: %%a
)

echo.
echo Starting server...
echo.
echo Access from this PC:
echo   http://localhost:5173
echo.
echo Access from other devices on same network:
echo   http://[YOUR-IP]:5173
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================

call npm run dev

