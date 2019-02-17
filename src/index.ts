import { MyApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export async function main(options: ApplicationConfig = {}) {
	const app = new MyApplication(options);

	await app.start();
	console.log(`Server is running on port ${app.options.port}`);
	return app;
}
