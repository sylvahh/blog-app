import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigatior from '@/navigation/tab-navigation';
import { AuthProvider, useAuth } from '@/contexts/auth-context';
import EditPost from '@/screens/edit-post';
import Post from '@/screens/post';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
const Stack = createStackNavigator();
export default function App() {
  return (
    <AuthProvider>
      {/* <BottomSheetModalProvider> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home'>
          <Stack.Screen name='home' component={TabNavigatior} options={{ headerShown: false }} />
          <Stack.Screen name='edit post' component={EditPost} options={{ headerShown: false }} />
          <Stack.Screen name='post' component={Post} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </BottomSheetModalProvider> */}
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
