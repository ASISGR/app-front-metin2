export interface userInfoInterface {
  userInfo: {
    userId: string;
    login: string;
    email: string;
    coins: string;
    jcoins: string;
    last_play: string;
    playtime: string;
    account_status: string;
    social_id: string;
    players: String[];
    empire: number;
    safebox_password: string;
    isAdmin: boolean;
    isVerified: boolean;
  } | null;
  token: string;
  login: boolean;
}

export interface Kingdoms {
  JINNO?: { type: String; default: "0" };
  CHUNJO?: { type: String; default: "0" };
  SHINSOO?: { type: String; default: "0" };
}
