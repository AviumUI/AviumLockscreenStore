#!/bin/bash
#
# Copyright (C) 2025-2026 The AviumUI Project
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SRC_DIR="$SCRIPT_DIR/src/official"
OUTPUT_DIR="$SCRIPT_DIR/lockscreen-product"

mkdir -p "$OUTPUT_DIR"

for folder in "$SRC_DIR"/*/; do
    folder="${folder%/}"
    folder_name=$(basename "$folder")
    zip_file="$OUTPUT_DIR/$folder_name.zip"
    (cd "$folder" && zip -rq "$zip_file" .)
    
    if [ $? -eq 0 ]; then
        echo "✓ : $folder_name"
    else
        echo "✗ : $folder_name"
    fi
done

echo ""
