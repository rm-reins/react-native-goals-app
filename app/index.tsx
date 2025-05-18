import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [goals, setGoals] = useState<string[]>([]);
  const [enteredGoal, setEnteredGoal] = useState("");

  const handleAddGoal = () => {
    if (!enteredGoal.trim()) return;
    setGoals((prevGoals) => [...prevGoals, enteredGoal]);
    setEnteredGoal("");
  };

  const handleDeleteGoal = (idx: number) => {
    setGoals((prevGoals) => prevGoals.filter((_, i) => i !== idx));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Your course goal!"
        onChangeText={setEnteredGoal}
        value={enteredGoal}
        placeholderTextColor="#888"
        multiline
      />
      <Pressable
        onPress={handleAddGoal}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Add Goal</Text>
      </Pressable>
      <View style={styles.listOfGoals}>
        <FlatList
          data={goals}
          renderItem={({ item, index }) => (
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{item}</Text>
              <Pressable
                style={({ pressed }) => pressed && styles.buttonPressed}
                onPress={() => handleDeleteGoal(index)}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "San Francisco",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleInput: {
    width: "80%",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  listOfGoals: {
    marginTop: 10,
    width: "80%",
    height: "50%",
  },
  goalItem: {
    backgroundColor: "#e3f0ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalText: {
    fontSize: 16,
    color: "#333",
  },
});
