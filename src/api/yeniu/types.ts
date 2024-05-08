/**
 * 登录用户信息
 */
export interface YeniuCard {
  userId?: number;
  username?: string;
  nickname?: string;
  avatar?: string;
  roles: string[];
  perms: string[];
}
