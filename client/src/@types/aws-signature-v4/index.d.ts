declare module 'aws-signature-v4' {
  class AwsSignatureV4 {
    static createPresignedURL(
      method: string,
      endpoint: string,
      socketUrl: string,
      text: string,
      hash: string,
      obj: any  
    ): any;
  }


  export = awsSignatureV4;
}