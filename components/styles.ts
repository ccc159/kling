import { Dimensions, StyleSheet } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const size = Math.min(windowWidth / 4, windowHeight / 4);
export const CircleSize = size - (size % 2) - 2;
export const SmallCircleSize = CircleSize - 4;

export const Colors = {
  buttonNormal: '#33aad4',
};

export const Styles = StyleSheet.create({
  boxStyle: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 35,
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
  circleStyle: {
    // backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 18,
    width: CircleSize,
    height: CircleSize,
    borderRadius: CircleSize / 2,
  },
});
