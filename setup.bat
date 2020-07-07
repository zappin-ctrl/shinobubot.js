@echo off
call npm init -y
echo.
echo.
echo.
Pause. >nul | echo. / / / Found dependencies. Press 'enter' to install. / / /
call npm install
echo.
echo.
echo.
Pause. >nul | echo. / / / Installed dependencies. Please setup your '.env' file. Press 'enter' to exit. / / / 

