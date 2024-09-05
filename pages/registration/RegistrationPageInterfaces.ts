import { cardInfoFields } from "../brand/BrandPageInterfaces";

export interface registrationFields extends cardInfoFields {
  email: string;
  password: string;
  confirmPassword: string;
  brandInfo: string;
  cardInfo?: cardInfoFields;
}
