import { Redirect } from "expo-router";
import { View } from "react-native";
import { useContext } from "react";
import { Context } from "../stores/Context";

export default function Direct(){
    const {styles} = useContext(Context)
    return <View style={{color: "red"}}><Redirect href={"/home"}/></View>
}