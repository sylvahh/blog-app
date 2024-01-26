import { BLOGPOST } from '@/global.type';
import React, { createContext, useContext, ReactNode } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

interface AuthContextType {
  blogPost: BLOGPOST[];
  postId: BLOGPOST | null;
  CreatePost: (payload: BLOGPOST) => Promise<boolean>;
  updatePost: (payload: BLOGPOST) => Promise<void>;
  deletePost: (id: string) => void;
  editPost: (id: string) => void;
  setPostId: React.Dispatch<React.SetStateAction<BLOGPOST | null>>;
  deletePostId: BLOGPOST | null;
  setDeletePostId: React.Dispatch<React.SetStateAction<BLOGPOST | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

let BLOGDATA: BLOGPOST[] = [
  {
    id: '1',
    title: 'first blog',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, placeat!',
  },

  {
    id: '2',
    title: 'new blog',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, placeat!',
  },

  {
    id: '3',
    title: 'hello world',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, placeat!',
  },
];

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [blogPost, setBlogPost] = React.useState<BLOGPOST[]>(BLOGDATA);
  const [postId, setPostId] = React.useState<BLOGPOST | null>(null);
  const [deletePostId, setDeletePostId] = React.useState<BLOGPOST | null>(null);

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const CreatePost = async (payload: BLOGPOST) => {
    const isInValid = Object.values(payload).some((item) => item === '');
    if (isInValid) return false
    setBlogPost([payload, ...blogPost]);
    return true
  };
  const deletePost = (id: string) => {
    if (!deletePostId) {
      const postToDelete = blogPost.find((blog) => blog.id === id);
      if (postToDelete) {
        setDeletePostId(postToDelete);
        return;
      }
    }

    const newPostData = blogPost.filter((post) => post.id !== id);
    BLOGDATA = newPostData;
    setBlogPost(newPostData);
    setDeletePostId(null);
  };

  const editPost = (id: string) => {
    setPostId(null);
    const match = blogPost.find((blog) => blog.id === id);
    if (match) {
      setPostId(match);
    }
  };

  const updatePost = async (payload: BLOGPOST) => {
    const updatedBlogPost = blogPost.map((post) => {
      if (post.id === payload.id) {
        setPostId(null);
        return { ...post, ...payload };
      }
      return post;
    });
    setBlogPost([...updatedBlogPost]);
  };

  const value: AuthContextType = {
    blogPost,
    postId,
    deletePostId,
    setDeletePostId,
    setPostId,
    CreatePost,
    editPost,
    updatePost,
    deletePost,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
