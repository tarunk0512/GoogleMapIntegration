import React from 'react';
import { View, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const DestinationInputs = ({
  destinationInputs,
  setDestinationInputs,
  moveDestination,
  fetchDestinationCoordinates,
  isDialogVisible,
}) => {
  return (
    <>
      {isDialogVisible && (
        <View>
          {destinationInputs.map((input, index) => (
            <View key={index} style={styles.inputRow}>
              <TextInput
                placeholder={`Enter Destination ${index + 1}`}
                style={styles.input}
                value={input}
                onChangeText={(text) => {
                  const newInputs = [...destinationInputs];
                  newInputs[index] = text;
                  setDestinationInputs(newInputs);
                }}
              />
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  onPress={() => moveDestination(index, Math.max(0, index - 1))}
                  disabled={index === 0}
                  style={[styles.moveButton, index === 0 && styles.disabledButton]}
                >
                  <FontAwesome6 name="arrow-up" size={16} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => moveDestination(index, Math.min(destinationInputs.length - 1, index + 1))}
                  disabled={index === destinationInputs.length - 1}
                  style={[styles.moveButton, index === destinationInputs.length - 1 && styles.disabledButton]}
                >
                  <FontAwesome6 name="arrow-down" size={16} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Button title="Add Destination" onPress={fetchDestinationCoordinates} />
        </View>
      )}
    </>
  );
};

export default DestinationInputs;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  moveButton: {
    marginHorizontal: 0,
    padding: 5,
    backgroundColor: '#D8BFD8',
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
});
