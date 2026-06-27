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
            "@stylistic/array-bracket-spacing": ["error", "always"],
            "@stylistic/arrow-spacing": ["error", {
                "before": true,
                "after": true
            }],
            "@stylistic/member-delimiter-style": ["error", {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                }
            }],
            "@stylistic/semi": ["error", "never"],
            "@stylistic/type-annotation-spacing": ["error", {
                "before": true,
                "after": true,
                "overrides": {
                    "colon": {
                        "before": false,
                        "after": true
                    }
                }
            }],
            "@typescript-eslint/consistent-type-imports": ["error", { "fixStyle": "inline-type-imports"}]
        },
        "languageOptions": {
            "parserOptions": {
                "projectService": true
            }
        }
    }
])
