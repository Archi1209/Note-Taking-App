@echo off
set PATH=%PATH%;C:\Program Files\GitHub CLI
cd /d "%~dp0"

echo ===== Complete GitHub Upload =====
echo.

echo Step 1: Setting up Git user identity...
git config --global user.email "archi1209@github.com"
git config --global user.name "Archi"

echo.
echo Step 2: Checking GitHub login...
gh auth status
if errorlevel 1 (
    echo Not logged in. Starting login process...
    gh auth login
)

echo.
echo Step 3: Creating GitHub repository...
gh repo create note-taking-app --private --source=. --clone=false --description "Note-Taking Application - Python Flask + React"

echo.
echo Step 4: Initializing Git and pushing...
git init
git add .
git commit -m "Initial commit - Note Taking App (Python Flask + React)"
git branch -M main
git remote add origin https://github.com/Archi1209/note-taking-app.git
git push -u origin main

echo.
echo ========================================
echo SUCCESS!
echo https://github.com/Archi1209/note-taking-app
echo ========================================
pause
