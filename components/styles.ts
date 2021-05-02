import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const size = Math.min(windowWidth / 4, windowHeight / 4);
export const CircleSize = size - (size % 2);

export const Styles = StyleSheet.create({
  boxStyle: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  circleStyle: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: CircleSize,
    height: CircleSize,
    borderRadius: CircleSize / 2,
  },
});
