export default class Response {
    body: string
    statusCode: number
    constructor(body: string, statusCode: number) {
        this.body = body
        this.statusCode = statusCode
    }
}

export class NotFoundResponse extends Response {
    constructor(body: string) {
        super(body, 404)
    }
}
