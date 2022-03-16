export class InitializePaymentRequestModel {

  constructor(
    public orderId: string,
    public amount: number,
    public callBackUrl: string,
    public email: string
  ){ }
}
