import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  uri: string;
  onClose: () => void;
  onDelete: () => void;
  onChange: () => void;
};

const { width } = Dimensions.get("window");

const AvatarPreviewModal = ({
  visible,
  uri,
  onClose,
  onDelete,
  onChange,
}: Props) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0,0,0,0.9)" },
        ]}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Ionicons name="close" size={20} color="#94a3b8" />
              </TouchableOpacity>

              <Image source={{ uri }} style={styles.image} />

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={onChange}
                  activeOpacity={0.8}
                >
                  <Ionicons name="camera-outline" size={18} color="#818cf8" />
                  <Text style={styles.actionText}>Changer</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleDelete}
                  activeOpacity={0.8}
                >
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  <Text style={[styles.actionText, { color: "#ef4444" }]}>
                    Supprimer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: width,
    height: width,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  actions: {
    flexDirection: "row",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
    width: 240,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
  },
  actionText: {
    color: "#818cf8",
    fontWeight: "600",
    fontSize: 14,
  },
  divider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  closeButton: {
    alignSelf: "flex-end",
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default AvatarPreviewModal;
