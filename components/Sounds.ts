import { Audio } from 'expo-av';

export async function PlayNotification() {
  try {
    const { sound } = await Audio.Sound.createAsync(require('../assets/notification.wav'));
    await sound.playAsync();
    // await sound.unloadAsync();
  } catch (error) {
    // An error occurred!
  }
}
