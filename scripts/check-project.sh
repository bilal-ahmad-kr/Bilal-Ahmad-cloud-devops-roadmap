#!/bin/bash

if [ -d "app" ]; then
    echo "App directory exists"
else
    echo "App directory missing"
fi
if [ -f "README.md" ]; then
    echo "README.md exits"
else
    echo "README.md not exits"
fi
