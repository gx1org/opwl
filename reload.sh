#! /bin/bash

echo "Reloading"
git checkout .
git pull
go build -o opwl
pm2 reload opwl
