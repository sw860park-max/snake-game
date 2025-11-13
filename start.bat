@echo off
echo Installing dependencies...
call npm install

echo.
echo Starting development server...
echo Open http://localhost:5173 in your browser
echo Press Ctrl+C to stop the server
echo.
call npm run dev

