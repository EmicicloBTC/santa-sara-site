@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Netlify — collega questa cartella a un sito (SOLO la prima volta) ===
echo Prima esegui ACCEDI-NETLIFY.bat se non l'hai mai fatto.
echo.
echo Nelle domande che compariranno:
echo   - Scegli di creare / collegare un sito nuovo
echo   - Team: di solito il tuo account personale
echo   - Nome sito: es. santa-sara (diventa santa-sara.netlify.app se libero)
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
call npx netlify init
echo.
pause
