export type BLOGPOST = {
  id: string;
  title: string;
  text: string;
};

export type RootStackParamList = {
  home: undefined;
  post: { id: string };
  'edit post': { id: string };
};
