@echo off
set PATH=%PATH%;C:\Program Files\GitHub CLI
cd /d "%~dp0"

echo ===== GitHub Login =====
echo.
gh auth login
