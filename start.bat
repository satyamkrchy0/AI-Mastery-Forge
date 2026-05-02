@echo off
echo.
echo ========================================
echo   AI Mastery Forge (Python Backend)
echo ========================================
echo.
echo [1/3] Setting up Python dependencies...
cd /d %~dp0python_backend
python -m pip install -r requirements.txt

echo.
echo [2/3] Starting FastAPI backend server (port 5000)...
start "AI Mastery Forge API (Python)" cmd /k "cd /d %~dp0python_backend && uvicorn main:app --host 0.0.0.0 --port 5000 --reload"

timeout /t 3 /nobreak >nul

echo [3/3] Starting React frontend (port 5173)...
start "AI Mastery Forge UI" cmd /k "cd /d %~dp0client && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Both servers are starting up!
echo ----------------------------------------
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000/docs (Swagger UI)
echo   Health:   http://localhost:5000/api/health
echo ========================================
echo.
echo Opening browser...
timeout /t 2 /nobreak >nul
start http://localhost:5173

echo.
echo Press any key to close this launcher...
pause >nul
