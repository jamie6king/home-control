import { defineConfig } from "knip/config"

export default defineConfig({
    entry: "src/server.ts",
    project: "**/*.{ts,tsx,js,mjs,cjs}",
    ignoreFiles: [
        "src/public/**/*"
    ],
    ignoreIssues: {
        "src/lib/config/*.types.ts": [ "enumMembers", "types" ]
    },
    ignoreDependencies: [
        "pug",
        "tsc-alias",
        "tsconfig-paths"
    ]
})
