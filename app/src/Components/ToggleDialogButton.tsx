import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ToggleDialogButton = ({ toggleDialog, isDialogVisible }) => {
  return (
    <TouchableOpacity style={styles.toggleButton} onPress={toggleDialog}>
      <FontAwesome6 name={isDialogVisible ? "chevron-up" : "chevron-down"} size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ToggleDialogButton;

const styles = StyleSheet.create({
  toggleButton: {
    backgroundColor: '#D8BFD8',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
});
