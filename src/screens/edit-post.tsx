import CustomBottomSheetModal from '@/components/ui/custom-bottom-sheet';
import { useAuth } from '@/contexts/auth-context';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { BLOGPOST } from '@/global.type';
import Ionicons from '@expo/vector-icons/Ionicons';

const EditPost = () => {
  const { postId, updatePost, setPostId, blogPost } = useAuth();
  const [postDetails, setPostDetails] = React.useState<BLOGPOST>({
    id: '',
    title: '',
    text: '',
  });


  const resetState = () => {
    setPostDetails({ id: '', title: '', text: '' });
  };
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const handleCloseModal = () => {
    bottomSheetRef.current?.close();
    setPostId(null)
    resetState();
  };
  const handleShowModal = (idx: number) => bottomSheetRef.current?.snapToIndex(idx);

  React.useEffect(() => {
    if (!postId) return;
    setPostDetails(postId);
    handleShowModal(0);
  }, [postId]);

  if (!postId) return null;

  const payload = {
    id: postDetails.id,
    title: postDetails.title,
    text: postDetails.text,
  };

  return (
    <CustomBottomSheetModal onClose={handleCloseModal} ref={bottomSheetRef}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.header}> Edit post</Text>
          <TouchableOpacity onPress={handleCloseModal}>
            <Ionicons name={'close'} size={20} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={{ gap: 10 }}>
          <BottomSheetTextInput
            style={styles.inputText}
            placeholder='Blog Title'
            value={postDetails.title}
            onChangeText={(newTitle) => setPostDetails((prev) => ({ ...prev, title: newTitle }))}
          />
          <BottomSheetTextInput
            style={[styles.inputText, styles.textArea]}
            placeholder='Text'
            spellCheck={true}
            autoCorrect
            multiline={true}
            value={postDetails.text}
            onChangeText={(newText) => setPostDetails((prev) => ({ ...prev, text: newText }))}
            numberOfLines={10}
          />
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            updatePost(payload).then(() => handleCloseModal());
          }}>
          <Text style={{ textAlign: 'center', color: 'white' }}> Update</Text>
        </TouchableOpacity>
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
  },
  inputText: {
    padding: 10,
    borderColor: '#292727',
    borderWidth: 1,
    borderRadius: 5,
  },
  textArea: {
    textAlignVertical: 'top',
  },
  submitBtn: {
    width: 'auto',
    backgroundColor: '#6f88da',
    padding: 10,
    borderRadius: 5,
  },
});

export default EditPost;
