import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        // Add your custom rules here
        rules: {
            "no-unused-vars": ["error", { "varsIgnorePattern": "^_" }],
            "semi": ["error", "always"],
        },
    },
    { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
    
    {
        files: ['**/*.js'],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
    },
]);
