import { ResponseError } from '../errors/response.error';
import { PingController } from './ping.controller';

export class MethodsHandler {

	private static methods = [
		{
			name: 'ping',
			function: (new PingController).ping
		}
	];

	static getMethod(methodName: string): any {

		for (let m of this.methods) {
			if (m.name === methodName) {
				return m.function;
			}
		}

		throw ResponseError.get(-32601);
	}

}
