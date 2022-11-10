export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const defaultPost = (): Post => {
  return {
    userId: 0,
    id: 0,
    title: '',
    body: '',
  }
};
