import { Request } from 'express';

interface RequestWithUser extends Request {
  user: any; //@TODO: Fix
}

export default RequestWithUser;
