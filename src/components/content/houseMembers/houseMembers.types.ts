import { SwornMemberType } from '../../../types/swornMember/swornMember.types';

export type MembersComponentProps = {
  isLoading: boolean;
  swornMembers: SwornMemberType[];
  houseSwornMembers: string[];
};
