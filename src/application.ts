import { Application, ApplicationConfig } from '@loopback/core';
import { RPCServer } from './rpc.server';
import { PingController } from './controllers';

export class MyApplication extends Application {
	options: ApplicationConfig;
	constructor(options: ApplicationConfig = {}) {
		// Allow options to replace the defined components array, if desired.
		super(options);

		this.controller(PingController);

		this.server(RPCServer);
		this.options.port = this.options.port || 3000;
		this.bind('rpcServer.config').to(this.options);
	}
}
