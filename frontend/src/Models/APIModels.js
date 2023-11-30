export class APIResponseModel {
    constructor(status, data, error, message) {
        this.statusCode = status;
        this.data = data;
        this.error = error;
        this.message = message;
    }

    GetStatusCode() {
        return this.statusCode;
    }

    GetData() {
        return this.data;
    }

    GetError() {
        return this.error;
    }

    GetMessage() {
        return this.message;
    }
}