export default function verify_env() {
	const app_id = process.env.DISCORD_APP_ID as string,
		token = process.env.DISCORD_APP_TOKEN as string,
		public_key = process.env.DISCORD_APP_PUBLIC_KEY as string;

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

function validate_env_var(name: (typeof process.env)[string]) {
	if (!name) {
		return false;
	}

	if (!name.length) {
		return false;
	}

	return true;
}
