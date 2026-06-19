import { defineConfig } from "eslint/config"

import js from "@eslint/js"
import ts from "typescript-eslint"
import stylistic from "@stylistic/eslint-plugin"

export default defineConfig([
    {
        "files": ["src/**/*"],
        "extends": [
            js.configs.recommended,
            ts.configs.strictTypeChecked
        ],
        "plugins": {
            "@stylistic": stylistic
        },
        "rules": {
            "@typescript-eslint/consistent-type-imports": ["error", { "fixStyle": "inline-type-imports"}],
            "@stylistic/array-bracket-spacing": ["error", "always"],
            "@stylistic/member-delimiter-style": ["error", {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                }
            }],
            "@stylistic/semi": ["error", "never"]
        },
        "languageOptions": {
            "parserOptions": {
                "projectService": true
            }
        }
    }
])
