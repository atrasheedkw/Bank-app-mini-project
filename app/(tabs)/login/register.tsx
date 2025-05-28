import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { loginFunction, registerFunction } from "@/api/auth";
import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { AuthContext } from "@/Context/Authcontext";
import { getToken } from "@/api/storage";

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const registerInput = {
    username,
    password,
    image,
  };

  const loginHandling = () => {
    console.log("Login Input", registerInput);
    mutate({ username, password });
  };

  ///// Refactore -  we will use the same interface for both login and regiter 
  interface registerInput {
    username: string;
    password: string;
    image?: string;
  }

  //let's try out useMutation for register
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ username, password }: registerInput) =>
      loginFunction(
        registerInput.username,
        registerInput.password
      ),
    onSuccess: () => {
      router.replace("/(tabs)/(protected)/home");
      setIsAuthenticated(true);
      alert("logged In");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
////// to keep user signied in after refresh
 useEffect(() => {
  const checkToken = async () => {
    try {
      const token = await getToken(); // ✅ safely attempt to read token
      if (token) {
        setIsAuthenticated(true); // ✅ mark user as logged in
        ////// direct if "authinticated" to the desired page 
        router.replace("/(tabs)/(protected)/home")
        console.log('Token found, user is logged IN');

      } else {
        console.log('No token found, user is not authenticated');
      }
    } catch (error) {
      console.error('Failed to check auth token:', error); // ✅ handle failure
    }
  };

  checkToken();
}, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="enter your username"
        onChangeText={(input) => {
          setUsername(input);
        }}
      >
        {" "}
      </TextInput>
      <Text>password</Text>
      <TextInput
        style={styles.input}
        placeholder="enter your username"
        onChangeText={(input) => {
          setPassword(input);
        }}
      >
        {" "}
      </TextInput>
      {/* <Text>image</Text> */}
      {/* <TextInput
        style={styles.input}
        placeholder="enter your username"
        onChangeText={(input) => {
          setImage(input);
        }}
      >
        {" "}
      </TextInput> */}

      <TouchableOpacity
        style={styles.registerButton}
        onPress={loginHandling}
      >
        <Text style={styles.registerButtonText}>Login</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => { router.push("/(tabs)/login/register") }}>

        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

  
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    margin: 10,
    width: 250,
  },
  registerButton: {
    backgroundColor: "#4f46e5", // Indigo
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
