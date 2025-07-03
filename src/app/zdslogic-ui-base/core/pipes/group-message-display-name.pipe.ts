import { Pipe, PipeTransform } from '@angular/core';

import { Group } from '../../chat/core/group';
import { ChatParticipantType } from '../../chat/core/chat-participant-type.enum';
import { IChatParticipant } from '../../chat/core/chat-participant';
import { ChatMessage } from '../../app/core/models/chat-message.model';

/*
 * Renders the display name of a participant in a group based on who's sent the message
*/
@Pipe({name: 'groupMessageDisplayName'})
export class GroupMessageDisplayNamePipe implements PipeTransform {
    transform(participant: IChatParticipant, message: ChatMessage): string {
        if (participant && participant.participantType === ChatParticipantType.Group)
        {
            const group = participant as Group;
            const userIndex = group.chattingTo.findIndex(x => x.id === message.fromId);

            return group.chattingTo[userIndex >= 0 ? userIndex : 0].displayName;
        }
        else {
            return '';
        }
    }
}
