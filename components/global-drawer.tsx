import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type DrawerNav = DrawerNavigationProp<any>;

const Drawer = () => {
  const navigation = useNavigation<DrawerNav>();

  return (
    <TouchableOpacity
      style={styles.drawerButton}
      onPress={() => navigation.openDrawer()}
    >
      <Text style={styles.drawerIcon}>
        <Ionicons name="menu" size={32} color="#f1f5f9" />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  drawerButton: {
    marginLeft: "auto",
    padding: 8,
  },

  drawerIcon: {
    fontSize: 24,
    color: "#f1f5f9",
    fontWeight: "700",
  },
});

export default Drawer;
