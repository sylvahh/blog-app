import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@/screens/home";
import NewPost from "@/screens/new-post";
import EditPost from "@/screens/edit-post";
import  Ionicons  from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

type TabIconName = 'home' | 'home-outline' | 'add-circle' | 'add-circle-outline'| 'pencil' | 'pencil-outline';


const TabNavigatior = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: TabIconName;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'New Post':
                iconName = focused ? 'add-circle' : 'add-circle-outline';
                break;
              default:
                iconName = 'home';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name='home' component={Home} options={{ headerShown: false }} />
        <Tab.Screen name='New Post' component={NewPost} />
      </Tab.Navigator>
    );
}

export default TabNavigatior