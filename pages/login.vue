<script setup lang="ts">
	import { Button } from '~/components/ui/button'
	import { Input } from '~/components/ui/input'
	import { Label } from '~/components/ui/label'

	const loginParams = ref({
		email: '',
		password: '',
	})

	const login = async () => {
		const auth = useSupabaseClient().auth
		const { error } = await auth.signInWithPassword(loginParams.value)
		if (error) return console.log(error)
		navigateTo('/')
	}

	definePageMeta({ layout: 'unauthenticated' })
	useHead({ title: 'Login' })
</script>

<template>
	<div class="min-h-screen w-full lg:grid lg:grid-cols-2">
		<div class="flex items-center justify-center py-12">
			<form class="mx-auto grid w-[350px] gap-6" @submit.prevent="login">
				<div class="grid gap-2 text-center">
					<h1 class="text-3xl font-bold">Login</h1>
					<p class="text-balance text-muted-foreground">
						Enter your email below to login to your account
					</p>
				</div>
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							v-model="loginParams.email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
							<a
								href="/forgot-password"
								class="ml-auto inline-block text-sm underline"
							>
								Forgot your password?
							</a>
						</div>
						<Input
							id="password"
							v-model="loginParams.password"
							type="password"
							required
						/>
					</div>
					<Button type="submit" class="w-full">Login</Button>
					<Button variant="outline" class="w-full">Login with Google</Button>
				</div>
				<div class="mt-4 text-center text-sm">
					Don't have an account?
					<a href="#" class="underline">Sign up</a>
				</div>
			</form>
		</div>
		<div class="hidden bg-muted lg:block">
			<img
				src="/placeholder.svg"
				alt="Image"
				width="1920"
				height="1080"
				class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
			/>
		</div>
	</div>
</template>
