
// class Errors {
//     statusCode: number;
//     message: string;
//
//     constructor(statusCode: number, message: string){
//         this.statusCode = statusCode;
//         this.message = message;
//     }
//
//     errorMessage() {
//         console.log("it worked");
//         console.error("chirp too long. Max length is 140");
//     }
// }

export class BadRequest extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string){
        super(message);
        this.statusCode = statusCode;
    }    
}

