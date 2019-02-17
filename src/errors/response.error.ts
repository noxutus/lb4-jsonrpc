import { ResponseErrors } from "./response.errors";

export class ResponseError extends Error {

	public code: number;
	public message: string;

	constructor(code: number, message: string) {
		super();

		this.code = code;
		this.message = message;
	}

	public static get(code: number): ResponseError {
		for (let err of ResponseError.list()) {
			if (err.code === code) {
				return new ResponseError(err.code, err.message);
			}
		}

		throw new Error('Error (' + code + ') not found!');
	}

	public static list() {
		return ResponseErrors;
	}
}
