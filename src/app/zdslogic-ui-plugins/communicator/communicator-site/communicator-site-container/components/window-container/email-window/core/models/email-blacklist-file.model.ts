import { User } from 'app/zdslogic-ui-base/core/models/user.model';

export class EMailBlacklistFile {

  id: string;

  userId: string;

  type: string;

  fromId: string;

  toId: string;

  fromText: string;

  replyText: string;

  toText: string;

  subject: string;

  message: string;

  dateSent: string;

  dateSeen: string;

  fromUser?: User = new User();

  toUser?: User = new User();
}
