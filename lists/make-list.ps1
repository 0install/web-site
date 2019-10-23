Param ([Parameter(Mandatory = $True)] $ListName)
$ErrorActionPreference = "Stop"
Add-Type -Assembly System.Web

$workDir = "$env:TEMP\catalog-feeds"
if (Test-Path $workDir) { rm -Recurse -Force $workDir }
mkdir $workDir | Out-Null

foreach ($uri in Get-Content "$PSScriptRoot\$ListName.lst") {
  echo $uri
  $encodedUri = [System.Web.HttpUtility]::UrlEncode($uri)
  Invoke-WebRequest $uri -OutFile "$workDir\$encodedUri"
}

0install run --command=0publish http://0install.de/feeds/ZeroInstall_Tools.xml --catalog="$PSScriptRoot\$ListName.xml" "$workDir\*"

rm -Recurse -Force $workDir
