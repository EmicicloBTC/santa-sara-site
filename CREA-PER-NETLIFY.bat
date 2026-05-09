@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo === Santa Sara — crea cartella da pubblicare su Netlify ===
echo.
where npm >nul 2>&1
if errorlevel 1 (
  echo ERRORE: Node.js non trovato. Installa da https://nodejs.org versione LTS, poi riprova.
  pause
  exit /b 1
)
call npm install
if errorlevel 1 (
  echo ERRORE durante npm install.
  pause
  exit /b 1
)
call npm run build
if errorlevel 1 (
  echo ERRORE durante la build.
  pause
  exit /b 1
)
echo.
echo FATTO. Si apre la cartella "dist": e quella che trascini su Netlify.
echo Su netlify.com: Add new site - Deploy manually - trascina la cartella dist.
echo.
explorer dist
pause
