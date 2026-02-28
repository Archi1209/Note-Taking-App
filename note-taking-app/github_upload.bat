@echo off
set PATH=%PATH%;C:\Program Files\GitHub CLI
cd /d "%~dp0"

echo Checking GitHub CLI...
gh --version
if errorlevel 1 (
    echo GitHub CLI not found. Please install it first.
    pause
    exit /b 1
)

echo.
echo ===== GitHub Upload Script =====
echo.

echo Checking if logged in to GitHub...
gh auth status
if errorlevel 1 (
    echo Not logged in. Please run: gh auth login
    pause
    exit /b 1
)

echo.
echo Ready to upload to GitHub!
echo.

echo What is your GitHub username?
set /p GH_USERNAME=

echo What repository name do you want?
set /p REPO_NAME=

echo Creating repository %REPO_NAME%...
gh repo create %REPO_NAME% --private --source=. --clone=false --description "Note-Taking Application - Full Stack Project"

if errorlevel 1 (
    echo Failed to create repository. It might already exist.
    echo Pushing to existing repository instead...
    echo.
    echo Enter the existing repository (format: username/repo):
    set /p EXISTING_REPO=
    git init
    git add .
    git commit -m "Initial commit - Note Taking App"
    git branch -M main
    git remote add origin https://github.com/%EXISTING_REPO%.git
    git push -u origin main
) else (
    echo.
    echo Repository created! Now pushing code...
    git init
    git add .
    git commit -m "Initial commit - Note Taking App"
    git branch -M main
    git remote add origin https://github.com/%GH_USERNAME%/%REPO_NAME%.git
    git push -u origin main
)

echo.
echo ===== Done! =====
echo Your project should now be on GitHub!
pause
