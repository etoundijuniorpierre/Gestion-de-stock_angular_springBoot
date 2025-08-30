# Script de liaison Spring Boot - Angular
param(
    [string]$SpringBootUrl = "http://localhost:2035",
    [string]$AngularOutputDir = "./src/app/api",
    [switch]$Watch
)

Write-Host "=== Liaison Spring Boot - Angular ===" -ForegroundColor Green

# Vérifier Spring Boot
try {
    $response = Invoke-WebRequest -Uri "$SpringBootUrl/v3/api-docs" -Method GET -TimeoutSec 10
    Write-Host "✓ API Spring Boot accessible" -ForegroundColor Green
} catch {
    Write-Host "✗ API Spring Boot non accessible" -ForegroundColor Red
    Write-Host "Vérifiez que votre API est démarrée sur $SpringBootUrl" -ForegroundColor Yellow
    exit 1
}

# Créer dossier de sortie
if (-not (Test-Path $AngularOutputDir)) {
    New-Item -ItemType Directory -Path $AngularOutputDir -Force
}

# Générer les services
Write-Host "Génération des services..." -ForegroundColor Yellow
try {
    npx ng-swagger-gen -i "$SpringBootUrl/v3/api-docs" -o $AngularOutputDir
    Write-Host "✓ Services générés" -ForegroundColor Green
} catch {
    Write-Host "Utilisation de swagger-codegen..." -ForegroundColor Yellow
    java -jar swagger-codegen-cli.jar generate -i "$SpringBootUrl/v3/api-docs" -l typescript-angular -o $AngularOutputDir
}

Write-Host "Liaison terminée!" -ForegroundColor Green 