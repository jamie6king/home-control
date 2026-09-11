import { defineConfig } from "vitest/config"

export default defineConfig({
    "test": {
        "isolate": false,
        "pool": "threads",
        "coverage": {
            "provider": "v8",
            "include": ["src/**/*.ts"],
            "exclude": [
                "**/*.d.ts",
                "**/*.types.ts"
            ]
        }
    },
    "resolve": {
        "tsconfigPaths": true
    }
})
