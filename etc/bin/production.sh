#! /usr/bin/env bash

if [[ -n "$1" ]]; then
    HOST_ARGUMENT="--bind $1"
fi

(
    cd ..
    gunicorn buses.app:app --workers=4 $HOST_ARGUMENT
)
