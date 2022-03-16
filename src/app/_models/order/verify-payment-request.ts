export class VerifyPaymentRequestModel {

  constructor(
    public authority: string,
    public orderId: string
  ){ }
}
