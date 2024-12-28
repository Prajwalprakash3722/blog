#!/bin/bash

# Check if a title was provided
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 \"Post Title\""
  exit 1
fi

# Get the title from command line argument
TITLE="$1"

# Create filename-friendly version of title (lowercase, spaces to hyphens)
FILENAME=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')

# Get current date in ISO 8601 format
DATE=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")
SIMPLE_DATE=$(date -u +"%Y-%m-%d")

# Create the full filepath
FILEPATH="_posts/${SIMPLE_DATE}-${FILENAME}.mdx"

# Generate the template
cat >"$FILEPATH" <<EOF
---
title: "${TITLE}"
ogImage:
  url: ""
category: 
coverImage: ""
date: "${DATE}"
draft: true
---

EOF

echo "Created new post template at: $FILEPATH"
