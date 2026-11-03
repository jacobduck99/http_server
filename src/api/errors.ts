export class BadRequest extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    }    
}

export class Unauthorized extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    }    
}

export class Forbidden extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    }    
}

export class NotFound extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
    }    
}
