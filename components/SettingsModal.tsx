import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ITask } from '../store/task';
import { IConfig } from '../types';
import { MyButton } from './Button';
import { MyModal } from './MyModal';
import { MyTextInput } from './MyTextInput';
import { MyTitle } from './Title';
import { MyText } from './MyText';
import { t } from '../i18n';

interface ISettingsModal {
  config: IConfig;
  task: ITask;
}

export const SettingsModal = ({ task, config }: ISettingsModal) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editConfig, setEditConfig] = useState<IConfig>(config);

  function showModal() {
    setEditConfig(config);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function updateConfig() {
    if (editConfig === config) return;
    task.UpdateConfig(editConfig);

    closeModal();
  }

  function setNumber(value: string | undefined, setter: (v: number) => void) {
    if (value === undefined) return;
    value = value.replace(/[^0-9]/g, '');
    if (value === '') setter(0);
    else setter(parseInt(value));
  }

  return (
    <View>
      <MyModal visible={modalVisible} setVisible={setModalVisible}>
        <MyTitle text={t('SETTING')} />

        <MyText>{t('PHASE1_READY_MINUTES')}</MyText>
        <MyTextInput
          value={editConfig.PHASE1_READY_MINUTES.toString()}
          onChangeText={(v) => setNumber(v, (val) => setEditConfig({ ...editConfig, PHASE1_READY_MINUTES: val }))}
        />

        <MyText>{t('PHASE1_EXPIRE_MINUTES')}</MyText>
        <MyTextInput
          value={editConfig.PHASE1_EXPIRE_MINUTES.toString()}
          onChangeText={(v) => setNumber(v, (val) => setEditConfig({ ...editConfig, PHASE1_EXPIRE_MINUTES: val }))}
        />

        <MyText>{t('PHASE2_READY_MINUTES')}</MyText>
        <MyTextInput
          value={editConfig.PHASE2_READY_MINUTES.toString()}
          onChangeText={(v) => setNumber(v, (val) => setEditConfig({ ...editConfig, PHASE2_READY_MINUTES: val }))}
        />

        <MyText>{t('PHASE2_READY_MINUTES')}</MyText>
        <MyTextInput
          value={editConfig.PHASE2_READY_MINUTES.toString()}
          onChangeText={(v) => setNumber(v, (val) => setEditConfig({ ...editConfig, PHASE2_READY_MINUTES: val }))}
        />

        <MyButton disabled={editConfig === config} title={t('OK')} onPress={updateConfig} />
      </MyModal>

      <Text style={styles.smallText}>
        <Text style={{ color: 'white' }} onPress={showModal}>
          {t('SETTING')}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  smallText: {
    color: 'white',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 8,
  },
});
