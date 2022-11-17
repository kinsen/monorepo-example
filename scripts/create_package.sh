#!/bin/bash

read -p "Are you sure create package $1 ? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then

    git clone --single-branch --branch package https://github.com/kinsen/monorepo-example.git $1
    mv ./$1/package ./packages/$1
    rm -rf ./$1
    cd packages/$1
    # linux
    #sed -i "s/commom/$1/g" jest.config.js
    # mac
    grep -rl 'commom' ./  | xargs sed -i "" "s/commom/$1/g"

fi

echo DONE