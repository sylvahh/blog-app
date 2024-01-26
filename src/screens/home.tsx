import BlogCard from '@/components/ui/blog/card';
import { useAuth } from '@/contexts/auth-context';
import React from 'react';
import { FlatList, Text, View, StyleSheet} from 'react-native';
import EditPost from './edit-post';
import BottomSheet from '@gorhom/bottom-sheet';
import DeletePost from './delete-post';

const Home = () => {
  const { blogPost } = useAuth();
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.header}>Blogs</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={blogPost}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BlogCard {...item} />}
        />
      </View>

      <EditPost />
      <DeletePost />
    </React.Fragment>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  header: {
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: '800',
  },
});
