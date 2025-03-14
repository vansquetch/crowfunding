// @ts-check
import prettierPlugin from 'eslint-plugin-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
	{
		plugins: {
			prettier: prettierPlugin,
		},
	},

	{
		files: ['**/*.ts', '**/*.vue', '**/*.js', '**/*.mjs'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'off',
			'@stylistic/no-tabs': 'off',
			'@stylistic/indent': 'off',
			'@stylistic/comma-dangle': 'off',
			'@stylistic/arrow-parens': 'off',

			'vue/singleline-html-element-content-newline': 'off',
			'vue/html-indent': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/html-self-closing': 'off',
			'vue/max-attributes-per-line': 'off',

			'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
			'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		},
	}
)
