$env:AWS_ACCESS_KEY_ID = (aws configure get aws_access_key_id  --profile $args[0])
Write-Host AWS_ACCESS_KEY_ID=$env:AWS_ACCESS_KEY_ID

$env:AWS_SECRET_ACCESS_KEY = (aws configure get aws_secret_access_key --profile $args[0])

$env:AWS_REGION = (aws configure get region --profile $args[0])
Write-Host AWS_REGION=$env:AWS_REGION

$env:AWS_ACCOUNT_ID = (aws sts get-caller-identity --query 'Account' --output text --profile $args[0])
Write-Host AWS_ACCOUNT_ID=$env:AWS_ACCOUNT_ID

$env:AWS_FRONTEND_BUCKET_SSM_PARAM = [string]::Format("/{0}/""/dev/frontend/bucket/name", $env:AWS_REGION)
$env:AWS_FRONTEND_BUCKET = (aws ssm get-parameter --name $env:AWS_FRONTEND_BUCKET_SSM_PARAM --profile $args[0] --query 'Parameter.Value' --output text)
Write-Host AWS_FRONTEND_BUCKET=$env:AWS_FRONTEND_BUCKET
