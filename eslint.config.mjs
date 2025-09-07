import globals from 'globals';
import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
	{ ignores: ['dist/**', 'node_modules/**', 'src/**/*.d.ts'] },
	{ files: ['src/**/*.ts'], ...js.configs.recommended },
	...tseslint.configs.recommended.map((config) => ({ files: ['src/**/*.ts'], ...config })),
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			globals: { ...globals.node, ...globals.es2021 },
		},
		plugins: { prettier: prettierPlugin },
		rules: {
			...configPrettier.rules,
			'prettier/prettier': 'warn',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error'],
		},
	},
);
