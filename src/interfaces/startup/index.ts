import { AirdropInterface } from 'interfaces/airdrop';
import { RewardInterface } from 'interfaces/reward';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StartupInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  airdrop?: AirdropInterface[];
  reward?: RewardInterface[];
  user?: UserInterface;
  _count?: {
    airdrop?: number;
    reward?: number;
  };
}

export interface StartupGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
