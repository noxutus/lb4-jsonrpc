import { RPCServer } from './rpc.server';
import * as express from 'express';
import * as parser from 'body-parser';
import { ResponseError } from './errors/response.error';
import { MethodsHandler } from './controllers/methods.handler';

export function rpcRouter(server: RPCServer) {

	const jsonParser = parser.json({
		verify: function (req, res, buf) {
			let rawJSON = buf.toString();

			try {
				JSON.parse(rawJSON);
			}
			catch (err) {
				errorResponse(<express.Response>res, undefined, ResponseError.get(-32700));
			}
		}
	});

	server.expressServer.post('*', jsonParser, async (request, response) => {
		await routeHandler(request, response);
	});
}

export async function routeHandler(
	request: express.Request,
	response: express.Response,
) {

	const jsonrpc = request.body.jsonrpc;
	const id = request.body.id;
	const methodName = request.body.method;
	const params = request.body.params;

	let method: Function;

	if (jsonrpc !== '2.0') {
		let err = ResponseError.get(-32600);
		if (err === null) {
			return;
		}

		errorResponse(response, id, err);
		return;
	}

	try {
		method = MethodsHandler.getMethod(methodName);
	}
	catch (err) {
		errorResponse(response, id, err);
		return;
	}

	try {
		let result = method(params);
		successResponse(response, id, result);
	}
	catch (err) {
		errorResponse(response, id, err);
	}
}

function errorResponse(response: express.Response, id: any, error: ResponseError) {

	let responseData = {
		jsonrpc: "2.0",
		error: error,
		id: id
	};

	response.send(JSON.stringify(responseData));
}

function successResponse(response: express.Response, id: any, result: any) {
	let responseData = {
		jsonrpc: "2.0",
		result: result,
		id: id
	};

	response.send(JSON.stringify(responseData));
}
