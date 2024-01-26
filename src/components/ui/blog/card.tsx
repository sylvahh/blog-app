import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BLOGPOST, RootStackParamList } from '@/global.type';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '@/contexts/auth-context';

const imageLink =
  'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const BlogCard = ({ id, title, text }: BLOGPOST) => {
  const { editPost, deletePost } = useAuth();
  const Navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onViewPost = () => {
    Navigation.navigate('post', { id });
  };

  const onEditPost = () => {
    editPost(id);
  };

  const onDeletpost = () => {};

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageLink }} alt='blog image' />
      <View style={styles.deleteContainer}>
        <TouchableOpacity onPress={onViewPost}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TouchableOpacity onPress={onEditPost}>
            <Ionicons name={'pencil-outline'} size={25} color={'tomato'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deletePost(id)}>
            <Ionicons name={'trash-outline'} size={25} color={'tomato'} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.text}>{text} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginVertical: 10,
  },
  image: {
    width: 'auto',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    textTransform: 'capitalize',
    flex: 1,
  },

  text: {
    fontSize: 12,
  },
  deleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BlogCard;
