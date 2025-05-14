export enum TennantSubscriptionType {
  PayAsYouGo = "PayAsYoGo",
  PrePurchase = "PrePurchase",
};

export type Tennant = Readonly<{
  TennantId: string, // tennant id
  Type: string,
  Name: string,
}>;

export type TennantUser = Readonly<{}>;

export const TennantFromObject = (data: Object): Tennant => {
  let res: Tennant = {
    TennantId: data["TennantId"],
    Type: data["TennantType"],
    Name: data["CompanyName"],
  }
  return res;
}