@echo off
echo Starting Note-Taking App Frontend...
cd /d "%~dp0frontend"
npm install
npm run dev
