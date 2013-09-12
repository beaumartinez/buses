#! /usr/bin/env bash

if [[ -n "$@" ]]; then
    HOST_ARGUMENT="$@"
fi

(
    cd ..

    python -m buses.app_debug $HOST_ARGUMENT
)
