export class ErrorResponse extends Error{
  status:number
  details?:Record<string,string>
  constructor(message:string,status:number,details?:Record<string,string>){
    super(message)
    this.status=status
    this.details=details
  }
}
