@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Santa Sara — avvio sito in locale ===
echo Cartella: %CD%
echo.
where npm >nul 2>&1
if errorlevel 1 (
  echo ERRORE: Node.js non trovato. Installa da https://nodejs.org versione LTS, poi riprova.
  pause
  exit /b 1
)
echo Installazione dipendenze ^(se serve^)...
call npm install
if errorlevel 1 (
  echo ERRORE durante npm install.
  pause
  exit /b 1
)
echo.
echo Apertura del sito: tra poco vedrai un indirizzo tipo http://localhost:5173
echo Apri quel link nel browser. Per fermare: chiudi questa finestra o premi Ctrl+C.
echo.
call npm run dev
pause
