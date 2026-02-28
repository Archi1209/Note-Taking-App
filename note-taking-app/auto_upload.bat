@echo off
set PATH=%PATH%;C:\Program Files\GitHub CLI
cd /d "%~dp0"

echo ===== Uploading to GitHub =====

echo Checking auth status...
gh auth status

if errorlevel 1 (
    echo Please run github_login.bat first!
    pause
    exit /b 1
)

echo.
echo Creating repository...
gh repo create note-taking-app --private --source=. --clone=false --description "Note-Taking Application - Python Flask + React"

if errorlevel 1 (
    echo Repository might already exist. Checking...
    gh repo view note-taking-app
    if errorlevel 1 (
        echo Could not find or create repository. Please check your GitHub account.
        pause
        exit /b 1
    )
)

echo.
echo Initializing git and pushing...
git init
git add .
git commit -m "Initial commit - Note Taking App (Python Flask + React)"
git branch -M main
git remote add origin https://github.com/note-taking-app.git
git push -u origin main --force

echo.
echo ===== Done! =====
echo Your project has been uploaded to GitHub!
pause
