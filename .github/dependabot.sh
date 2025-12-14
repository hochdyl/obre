#!/bin/bash

function dependabot {
    if [ $# -lt 1 ]; then
        echo 'Usage: dependabot <merge|rebase|recreate> [pr_number]'
        return
    fi

    command=$1
    pr=$2

    case $command in
        merge)
            action="approve"
            ;;
        rebase|recreate)
            action="comment"
            ;;
        *)
            echo "Invalid command: $command"
            return
            ;;
    esac

    if [ $# -eq 2 ]; then
        gh pr review --body "@dependabot $command" --$action $pr
    else
        gh pr list --app Dependabot --jq ".[].number" --json number | xargs -I % sh -c "gh pr review --body '@dependabot $command' --$action %"
    fi
}

dependabot "$@"
