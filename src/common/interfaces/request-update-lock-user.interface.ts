export interface IRequestUpdateLockUser {
  account_id: number;
  is_bg_lock: boolean;
  start_date_bg_lock: Date;
  end_date_bg_lock: Date;
  is_woe_lock: boolean;
  start_date_woe_lock: Date;
  end_date_woe_lock: Date;
  is_ban: boolean;
  start_date_ban: Date;
  end_date_ban: Date;
  admin: string;
}
