@echo off
set PATH=%PATH%;C:\Program Files\GitHub CLI
cd /d "%~dp0"

echo ===== Uploading Note-Taking App to GitHub =====

echo.
echo Checking auth status...
gh auth status

echo.
echo Creating repository on GitHub...
gh repo create note-taking-app --private --source=. --clone=false --description "Note-Taking Application - Python Flask + React"

echo.
echo Initializing Git and pushing code...
git init
git add .
git commit -m "Initial commit - Note Taking App (Python Flask + React)"
git branch -M main
git remote add origin https://github.com/Archi1209/note-taking-app.git
git push -u origin main --force

echo.
echo ========================================
echo SUCCESS! Project uploaded to GitHub!
echo Repository: https://github.com/Archi1209/note-taking-app
echo ========================================
pause
