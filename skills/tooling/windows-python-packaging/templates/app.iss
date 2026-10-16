; Adapted from ref.ECC generating-python-installer (MIT).
; Replace product values and compile only after project-specific review.
#define MyAppName "Example App"
#define MyAppVersion "0.1.0"
#define MyPublisher "Your Organization"
#define MyExe "ExampleApp.exe"
#define MySourceDir "C:\reviewed\owned\ExampleApp.dist"
#define MyStableAppId "{{71BE7224-2571-42D8-AE75-83783F62FCA1}"

[Setup]
AppId={#MyStableAppId}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyPublisher}
DefaultDirName={localappdata}\Programs\{#MyAppName}
PrivilegesRequired=lowest
OutputDir=installer-output
OutputBaseFilename=ExampleApp-{#MyAppVersion}
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
UninstallDisplayIcon={app}\{#MyExe}

[Files]
Source: "{#MySourceDir}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; Flags: unchecked

[Icons]
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyExe}"; Tasks: desktopicon
Name: "{userprograms}\{#MyAppName}"; Filename: "{app}\{#MyExe}"

[Run]
Filename: "{app}\{#MyExe}"; Description: "Launch application"; Flags: nowait postinstall skipifsilent

; No wildcard [UninstallDelete]: preserve user-created data.
