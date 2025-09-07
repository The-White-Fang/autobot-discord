export default function verify_env() {
	const app_id = process.env.DISCORD_APP_ID,
		token = process.env.DISCORD_APP_TOKEN,
		public_key = process.env.DISCORD_APP_PUBLIC_KEY;

	if (!validate_env_var(app_id)) {
		console.error('Missing or invalid DISCORD_APP_ID in environment variables.');
		process.exit(1);
	}

	if (!validate_env_var(token)) {
		console.error('Missing or invalid DISCORD_APP_TOKEN in environment variables.');
		process.exit(1);
	}

	if (!validate_env_var(public_key)) {
		console.error('Missing or invalid DISCORD_APP_PUBLIC_KEY in environment variables.');
		process.exit(1);
	}

	return {
		app_id,
		token,
		public_key,
	};
}

function validate_env_var(value: (typeof process.env)[string]): value is string {
	if (!value) {
		return false;
	}

	if (!value.length) {
		return false;
	}

	return true;
}
