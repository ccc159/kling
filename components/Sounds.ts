import { Audio } from 'expo-av';

export async function PlayNotification() {
  try {
    const { sound } = await Audio.Sound.createAsync(require('../assets/notification.wav'));
    await sound.playAsync();
    setTimeout(async function () {
      await sound.unloadAsync();
    }, 1000);
  } catch (error) {
    // An error occurred!
  }
}
