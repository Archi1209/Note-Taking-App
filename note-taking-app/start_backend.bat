@echo off
echo Starting Note-Taking App Backend...
cd /d "%~dp0backend"
pip install -r requirements.txt
python app.py
