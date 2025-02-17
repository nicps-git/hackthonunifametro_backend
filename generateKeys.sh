#!/bin/bash

env_file=".env"

if grep -q "^JWT_PRIVATE_KEY=" "$env_file" && grep -q "^JWT_PUBLIC_KEY=" "$env_file"; then
    echo "As variáveis JWT_PRIVATE_KEY e JWT_PUBLIC_KEY já existem no arquivo .env."
    exit 0
fi

private_key=$(openssl genpkey -algorithm RSA -outform PEM)
public_key=$(echo "$private_key" | openssl rsa -pubout -outform PEM)

private_key_base64=$(echo "$private_key" | openssl base64 | tr -d '\n')
public_key_base64=$(echo "$public_key" | openssl base64 | tr -d '\n')

{
    echo ""
    echo "JWT_PRIVATE_KEY=\"$private_key_base64\""
    echo "JWT_PUBLIC_KEY=\"$public_key_base64\""
} >> "$env_file"

echo "As chaves foram geradas e salvas no arquivo .env com sucesso."
