import CustomBottomSheetModal from '@/components/ui/custom-bottom-sheet';
import { useAuth } from '@/contexts/auth-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { BLOGPOST } from '@/global.type';
import Ionicons from '@expo/vector-icons/Ionicons';

const DeletePost = () => {
  const { setDeletePostId, deletePost, deletePostId } = useAuth();

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const handleCloseModal = () => {
    bottomSheetRef.current?.close();
    setDeletePostId(null);
  };
  const handleShowModal = (idx: number) => bottomSheetRef.current?.snapToIndex(idx);

  if (!deletePostId) return null;

  return (
    <CustomBottomSheetModal snapIndex={1} onClose={handleCloseModal} ref={bottomSheetRef}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.header}> Deleting post!</Text>
          <TouchableOpacity onPress={handleCloseModal}>
            <Ionicons name={'close'} size={20} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', justifyContent:'space-between', gap: 25,  }}>
          <Text style={{ color: 'red', fontSize: 16 }}> Are you sure you want to delete this post ?</Text>
          <TouchableOpacity onPress={() => deletePost(deletePostId.id)} style={styles.deleteBtn}>
            <Text style={{ color: 'white' }}>YES</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomBottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    margin: 10,
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: '800',
    color: 'red',
  },
  deleteBtn: {
    width: '60%',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
  },
});

export default DeletePost;
