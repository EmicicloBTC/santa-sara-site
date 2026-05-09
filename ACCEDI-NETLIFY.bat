@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Netlify — accesso (una volta, o se la sessione è scaduta) ===
echo Si aprirà il browser: accedi e autorizza Netlify CLI.
echo.
where npm >nul 2>&1
if errorlevel 1 (
  echo ERRORE: Node.js non trovato. Installa da https://nodejs.org LTS.
  pause
  exit /b 1
)
call npm install
if errorlevel 1 (
  pause
  exit /b 1
)
call npx netlify login
echo.
pause
