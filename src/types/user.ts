export interface Profile {
  id: string;
  account: string;
  mobile: string;
  token: string;
  avatar: string;
  nickname: string;
  gender: string;
  birthday?: string;
  cityCode: string;
  provinceCode: string;
  profession: string;
}

export type QQUserInfo = {
  figureurl_qq_2: string;
  nickname: string;
};
