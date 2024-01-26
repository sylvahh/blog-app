import { useAuth } from '@/contexts/auth-context';
import { RootStackParamList } from '@/global.type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

const NewPost = () => {
  const { CreatePost, blogPost } = useAuth();
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');
  const Navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const resetForm = () => {
    setTitle('');
    setText('');
  };
  const payload = {
    id: String(Math.floor(Math.random() * 200) + 1),
    title,
    text,
  };

  const handleNewPost = () => {
    CreatePost(payload).then((res) => {
      if (res) {
        Navigation.navigate('home');
        resetForm();
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Creat new post</Text>
      <View style={{ gap: 10 }}>
        <TextInput
          style={styles.inputText}
          placeholder='Blog Title'
          value={title}
          onChangeText={(newTitle) => setTitle(newTitle)}
        />
        <TextInput
          style={[styles.inputText, styles.textArea]}
          placeholder='Text'
          spellCheck={true}
          autoCorrect
          multiline={true}
          value={text}
          onChangeText={(newText) => setText(newText)}
          numberOfLines={10}
        />
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={handleNewPost}>
        <Text style={{ textAlign: 'center', color: 'white' }}> Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    margin: 10,
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

export default NewPost;
