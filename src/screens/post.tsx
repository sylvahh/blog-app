import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BLOGPOST, RootStackParamList } from '@/global.type';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@/contexts/auth-context';

const imageLink =
  'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const Post = () => {
  const { blogPost } = useAuth();
  const [postDetials, setPostDetails] = React.useState<BLOGPOST | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'post'>>();
  const { id } = route.params;

  const getPostDetails = React.useCallback(() => {
    const postDetails = blogPost.find((post) => post.id === id);
    if (postDetails) {
      setPostDetails(postDetails);
    }
  }, [id]);

  React.useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageLink }} alt='blog image' />
      <View style={styles.deleteContainer}>
        <Text style={styles.title}>{postDetials?.title}</Text>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TouchableOpacity>
            <Ionicons name={'pencil-outline'} size={25} color={'tomato'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name={'trash-outline'} size={25} color={'tomato'} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.text}>{postDetials?.text} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginVertical: 10,
    // padding:10
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
  },
});

export default Post;
