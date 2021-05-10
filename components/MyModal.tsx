import React from 'react';
import { StyleSheet, Modal, View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type IModal = {
  visible?: boolean;
  setVisible?: (b: boolean) => void;
  children?: React.ReactNode;
};

export const MyModal = ({ visible, children, setVisible }: IModal) => {
  function onPress() {
    if (setVisible) setVisible(false);
  }

  return (
    <Modal animationType='fade' transparent={true} visible={visible}>
      <KeyboardAvoidingView style={{ height: '100%' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.centeredView}>
          <View style={styles.boxStyle}>
            {setVisible && (
              <Pressable style={styles.closeButton} onPress={onPress}>
                <AntDesign name='closecircleo' size={24} color='#33aad4' />
              </Pressable>
            )}
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#bfbfbf5e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxStyle: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 35,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
});
