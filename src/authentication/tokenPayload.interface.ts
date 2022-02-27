import { User } from "@prisma/client";

export class TokenPayload {
  user: User;
  iat: Date; //timestamp
  exp: Date;
}
