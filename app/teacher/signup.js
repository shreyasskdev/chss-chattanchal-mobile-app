import React from "react";
import { useContext, useEffect } from "react";
import { Context } from "../../stores/Context";
import { useState } from "react";
import Axios from "../../stores/Axios";
import { useRouter } from "expo-router";
import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import LoginImage from "../../imgs/login.svg"

export default function Login() {
  const router = useRouter();
  const { styles } = useContext(Context);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Admin", value: "admin" },
    { label: "Teacher", value: "teacher" },
    { label: "Student", value: "student" },
  ]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [inputColor, setInputColor] = useState(styles.colors.background._900);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInputColor(styles.colors.background._800);
  }, [styles]);

  function handleClick() {
    setIsLoading(true);
    Axios.post("teacher/signup", {
      email: email,
      password: password,
    })
      .then((res) => {
        router.push("/teacher/signup-otp");
        setIsLoading(false);
        setError("");
        setInputColor(styles.colors.background._800);
      })
      .catch((err) => {
        setIsLoading(false);

        if (err?.response?.status == 401) {
          setInputColor("#f77");
          setError(err.response.data);
        } else if (err?.response?.status === undefined) {
          setError("Server connection error");
        } else {
          setError(err.response.data);
        }
      });
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: styles.colors.background._950,
        flex: 1,
        justifyContent: "flex-end",
        minHeight: 500,
        padding: 40,
        gap: 20,
        paddingBottom: 50,
      }}
    >
      <LoginImage width={"100%"} height={"50%"} style={{
            color:styles.colors.text._50,
      }}/>
      <TextInput
        style={{ ...styles.input, borderColor: inputColor }}
        placeholder="Email"
        placeholderTextColor={styles.components.textInput.placeHolder.color}
        value={email}
        onChangeText={(text) => {
          setEmail(text.trim());
          setError();
          setInputColor(styles.colors.background._800);
        }}
      />
      <TextInput
        style={{ ...styles.input, borderColor: inputColor }}
        placeholder="Password"
        placeholderTextColor={styles.components.textInput.placeHolder.color}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text.trim());
          setError();
          setInputColor(styles.colors.background._800);
        }}
      />
      
      <Text style={styles.error}>{error}</Text>

      <TouchableOpacity
        style={{ ...styles.btn, marginTop: 40 }}
        onPress={handleClick}
      >
        { isLoading ? <ActivityIndicator size="small" animating={isLoading} color={styles.colors.text._950} /> : <Text style={styles.btnText}>SIGN UP</Text>}
      </TouchableOpacity>
</SafeAreaView>
  );
}
