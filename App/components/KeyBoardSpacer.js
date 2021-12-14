import React, {useEffect, useState} from 'react';
import {View, Keyboard, Dimensions, StyleSheet} from 'react-native';

export const KeyBoardSpacer = ({onToggle}) => {
  const [keyboardSpace, setKeyBoardSpace] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', event => {
      const screenHeight = Dimensions.get('window').width;
      const endY = event.endCoordinates.screenY;

      setKeyBoardSpace(screenHeight - endY);
      onToggle(true);
    });

    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyBoardSpace(0);
      onToggle(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return <View style={[styles.container, {height: keyboardSpace}]}></View>;
};

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});
