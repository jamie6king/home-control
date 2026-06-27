import { defineConfig } from "eslint/config"

import js from "@eslint/js"
import ts from "typescript-eslint"
import stylistic from "@stylistic/eslint-plugin"
import jest from "eslint-plugin-jest"

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
    },
    {
        "files": ["src/**/*.test.*"],
        "plugins": {
            jest: jest
        },
        "rules": {
            "@typescript-eslint/no-require-imports": ["off"],
            "@typescript-eslint/no-unsafe-call": ["off"],
            "@typescript-eslint/no-unsafe-member-access": ["off"],
            "@typescript-eslint/no-unsafe-assignment": ["off"],
            "@typescript-eslint/no-unsafe-return": ["off"]
        },
        "languageOptions": {
            "globals": jest.environments.globals.globals
        },
    }
])
