# Script pour télécharger swagger-codegen et générer les services Angular
Write-Host "=== Téléchargement de Swagger CodeGen ===" -ForegroundColor Green

# URL de téléchargement de swagger-codegen
$swaggerUrl = "https://repo1.maven.org/maven2/io/swagger/codegen/v3/swagger-codegen-cli/3.0.52/swagger-codegen-cli-3.0.52.jar"
$swaggerJar = "swagger-codegen-cli.jar"

Write-Host "Téléchargement de swagger-codegen..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri $swaggerUrl -OutFile $swaggerJar
    Write-Host "✓ Swagger CodeGen téléchargé" -ForegroundColor Green
} catch {
    Write-Host "✗ Erreur lors du téléchargement: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "Génération des services Angular..." -ForegroundColor Yellow
try {
    java -jar $swaggerJar generate -i "http://localhost:2035/v3/api-docs" -l typescript-angular -o src/app/api --additional-properties ngVersion=19.0.0,supportsES6=true,modelPropertyNaming=camelCase,enumPropertyNaming=camelCase
    Write-Host "✓ Services générés avec succès" -ForegroundColor Green
} catch {
    Write-Host "✗ Erreur lors de la génération: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "=== Génération terminée! ===" -ForegroundColor Green 