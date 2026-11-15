@echo off
chcp 65001 >nul
title CyberLabX prototype
cd /d "%~dp0.."
where node >nul 2>nul || (echo Chua cai Node.js. Cai tu https://nodejs.org roi chay lai. & pause & exit /b 1)
start "" http://localhost:5200/
node huong-dan-chay\serve.js 5200
pause
