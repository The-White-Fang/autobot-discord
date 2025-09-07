import globals from 'globals';
import eslint from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['src/**/*.ts'],
		plugins: {
			prettier: prettierPlugin,
			'@typescript-eslint': tseslint.plugin,
		},
		languageOptions: {
			parser: tseslint.parser,
			globals: { ...globals.node, ...globals.es5, ...globals.es2021 },
		},
		rules: {
			...eslint.configs.recommended.rules,
			...tseslint.configs.recommended.rules,
			...configPrettier.rules,
			'prettier/prettier': 'warn',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error'],
		},
		ignores: ['dist/**', 'node_modules/**', 'src/**/*d.ts'],
	},
];
