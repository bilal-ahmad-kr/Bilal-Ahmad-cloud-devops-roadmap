#!/bin/bash
echo "=========================="
echo "Devops health check"
echo "=========================="

echo ""

if [ -d app ]; then
    echo "app directory: ok"
else
    echo "app directory: missing"
fi

if [ -d logs ]; then
    echo "logs directory: ok"
else
    echo "logs directory: missing"
fi

if [ -d scripts ]; then
    echo "scripts directory: ok"
else
    echo "scripts directory: missing"
fi

if [ -f "README.md" ]; then
    echo "README.md: ok"
else
    echo "README.md: missing"
fi
echo ""
echo "Health check completed"
