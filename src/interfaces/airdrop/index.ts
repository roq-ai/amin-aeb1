import { StartupInterface } from 'interfaces/startup';
import { GetQueryInterface } from 'interfaces';

export interface AirdropInterface {
  id?: string;
  name: string;
  startup_id?: string;
  created_at?: any;
  updated_at?: any;

  startup?: StartupInterface;
  _count?: {};
}

export interface AirdropGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  startup_id?: string;
}
