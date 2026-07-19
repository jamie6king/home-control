#!/bin/bash

IGNORE=(
    "typescript"
)

# get dependencies
dependencies=$(cat package.json | jq ".dependencies | keys | @sh" | tr -d \' | tr -d \")
devDependencies=$(cat package.json | jq ".devDependencies | keys | @sh" | tr -d \' | tr -d \")

# update normal dependencies
for dep in $dependencies; do
    echo "N> updating $dep..."
    npm i "$dep@latest" 1> /dev/null
done

# update dev dependencies
for dep in $devDependencies; do
    echo "D> updating $dep..."

    if [[ ${IGNORE[@]} =~ $dep ]]; then
        echo " > skipping"
    else
        npm i -D "$dep@latest" 1> /dev/null
    fi
done

# update other dependencies
npm update
