// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'shadcn-nuxt',
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@nuxtjs/supabase',
		'@formkit/nuxt',
	],
	devtools: { enabled: true },
	css: ['~/assets/css/main.css'],
	ignore: ['pages/**/_*'],
	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: '2025-03-06',
	eslint: {
		config: {
			stylistic: true,
		},
	},
	formkit: {
		// Experimental support for auto loading (see note):
		autoImport: true,
	},
})
