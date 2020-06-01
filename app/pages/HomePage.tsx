import React from 'react';
import { View, Text } from 'react-native';
import i18n from "i18n-js";


export interface Props { }
const HomePage = () => {
  return (
    <View>
      <Text>{i18n.t('Menu.Home')}</Text>
    </View>
  )
}

export default HomePage;