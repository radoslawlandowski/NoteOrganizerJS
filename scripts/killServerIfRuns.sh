#!/bin/bash

if fuser 3000/tcp &>/dev/null;
  then
    fuser -k 3000/tcp &>/dev/null
fi
