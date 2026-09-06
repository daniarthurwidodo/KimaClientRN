export type HomeStackParamList = {
  Home: undefined;
  RenunganDetail: { date: string };
};

export type VideosStackParamList = {
  VideoList: undefined;
  VideoPlayer: { videoId: string };
};

export type CommunityStackParamList = {
  CommunityHome: undefined;
  Videos: undefined;
};
