@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Santa Sara — build + pubblicazione su Netlify (produzione) ===
echo Se vedi "Authentication required", esegui prima ACCEDI-NETLIFY.bat
echo Se non hai mai collegato il progetto, esegui COLLEGA-SITO-UNAVOLTA.bat
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
call npm run deploy:netlify
if errorlevel 1 (
  echo.
  echo Se l'errore parla di autenticazione: ACCEDI-NETLIFY.bat
  echo Se parla di sito non collegato: COLLEGA-SITO-UNAVOLTA.bat
  echo Altrimenti apri NETLIFY-PASSO-PASSO.txt — Modalità A (trascina dist).
)
echo.
pause
