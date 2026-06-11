import { defineConfig } from "eslint/config"

import js from "@eslint/js"
import ts from "typescript-eslint"
import stylistic from "@stylistic/eslint-plugin"

export default defineConfig([
    {
        "files": ["src/**/*"],
        "extends": [
            js.configs.recommended,
            ts.configs.strictTypeCheckedOnly
        ],
        "plugins": {
            "@stylistic": stylistic
        },
        "rules": {
            "@stylistic/array-bracket-spacing": ["error", "always"],
            "@stylistic/semi": ["error", "never"]
        },
        "languageOptions": {
            "parserOptions": {
                "projectService": true
            }
        }
    }
])
