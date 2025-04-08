@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION

REM Script to convert PNG and JPG/JPEG files in the current directory to WebP using sharp-cli

REM --- Configuration ---
SET "SHARP_COMMAND=sharp.exe"
REM --- End Configuration ---

REM Check if sharp-cli is available in PATH
WHERE %SHARP_COMMAND% >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO Error: '%SHARP_COMMAND%' command not found in PATH.
    ECHO Please install sharp-cli, for example using: npm install -g sharp-cli
    ECHO Or ensure the directory containing %SHARP_COMMAND% is in your system's PATH environment variable.
    PAUSE
    GOTO :EOF
)

ECHO Starting conversion process in current directory: %CD%
ECHO =====================================================

SET /A converted_count=0
SET /A error_count=0

REM Loop through PNG, JPG, and JPEG files in the current directory
FOR %%F IN (*.png *.jpg *.jpeg) DO (
    REM %%~nF gets the filename without extension
    SET "output_file=%%~nF.webp"

    ECHO Converting "%%F" to "!output_file!"...

    REM Run the sharp-cli command. Redirect sharp-cli's own output to nul if you only want this script's messages.
    REM Remove "> nul" if you want to see sharp-cli's output/errors directly.
    %SHARP_COMMAND% -i "%%F" -o "!output_file!" > nul

    REM Check if the command was successful (ERRORLEVEL 0 means success)
    IF !ERRORLEVEL! EQU 0 (
        ECHO   Successfully converted "%%F".
        SET /A converted_count+=1
    ) ELSE (
        ECHO   ERROR converting "%%F". Check sharp-cli output if not redirected. (Error code: !ERRORLEVEL!)
        SET /A error_count+=1
    )
)

ECHO =====================================================
ECHO Conversion process finished.
ECHO Successfully converted: !converted_count! file(s).
IF !error_count! GTR 0 (
    ECHO Failed conversions: !error_count! file(s).
) ELSE (
    ECHO No errors encountered.
)
ECHO =====================================================

ENDLOCAL
PAUSE
EXIT /B 0

:EOF
ENDLOCAL
ECHO Script terminated.
PAUSE
EXIT /B 1