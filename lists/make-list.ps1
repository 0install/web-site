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

0install run --command=0publish https://apps.0install.net/0install/0publish-win.xml --catalog="$PSScriptRoot\$ListName.xml" "$workDir\*"

rm -Recurse -Force $workDir
