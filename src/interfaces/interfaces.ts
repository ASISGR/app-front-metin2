export interface userInfoInterface {
  userId: string;
  login: string;
  email: string;
  coins: string;
  jcoins: string;
  last_play: string;
  playtime: string;
  account_status: string;
  social_id: string;
  players: [string];
  empire: string;
  safebox_password: string;
}

export interface Kingdoms {
  JINNO?: { type: String; default: '0' };
  CHUNJO?: { type: String; default: '0' };
  SHINSOO?: { type: String; default: '0' };
}
