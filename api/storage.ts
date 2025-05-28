//// to deal with the token storage encryption and decryption

import * as SecureStore from "expo-secure-store"

//// to save Tokens securly 
const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};
 
// Retrieve stored 'token' and decrypt 
const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("token");
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

///Delete stored 'data'.*/
const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync("token");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};

//// export all of them

export { storeToken, getToken, deleteToken };
