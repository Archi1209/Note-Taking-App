@echo off
echo ============================================
echo    NOTE-TAKING APP - STARTUP SCRIPT
echo ============================================
echo.
echo This will start both Backend and Frontend servers.
echo.
echo Step 1: Installing backend dependencies...
cd /d "%~dp0backend"
pip install -r requirements.txt
echo.
echo Step 2: Starting Backend server...
start "Backend Server" cmd /k "python app.py"
echo.
echo Step 3: Installing frontend dependencies...
cd /d "%~dp0frontend"
npm install
echo.
echo Step 4: Starting Frontend server...
start "Frontend Server" cmd /k "npm run dev"
echo.
echo ============================================
echo    Servers are starting!
echo    Backend: http://localhost:5000
echo    Frontend: http://localhost:5173
echo ============================================
echo.
echo Please open your browser to: http://localhost:5173
pause
