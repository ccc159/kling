import { Audio } from 'expo-av';

export async function PlayReady() {
  try {
    const { sound } = await Audio.Sound.createAsync(require('../assets/ready.wav'));
    await sound.playAsync();
    setTimeout(async function () {
      await sound.unloadAsync();
    }, 1000);
  } catch (error) {
    // An error occurred!
  }
}

export async function PlayExpired() {
  try {
    const { sound } = await Audio.Sound.createAsync(require('../assets/expired.wav'));
    await sound.playAsync();
    setTimeout(async function () {
      await sound.unloadAsync();
    }, 1000);
  } catch (error) {
    // An error occurred!
  }
}

export async function PlayPositive() {
  try {
    const { sound } = await Audio.Sound.createAsync(require('../assets/positive.wav'));
    await sound.playAsync();
    setTimeout(async function () {
      await sound.unloadAsync();
    }, 1000);
  } catch (error) {
    // An error occurred!
  }
}

export async function PlayNegative() {
  try {
    const { sound } = await Audio.Sound.createAsync(require('../assets/negative.wav'));
    await sound.playAsync();
    setTimeout(async function () {
      await sound.unloadAsync();
    }, 1000);
  } catch (error) {
    // An error occurred!
  }
}
