import { HouseType } from '../../../types/house/house.types';
import { SwornMemberType } from '../../../types/swornMember/swornMember.types';

export type HouseCardProps = {
  house: HouseType;
  swornMembers: SwornMemberType[];
  isLoading: boolean;
};
