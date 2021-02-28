import React from "react";

import { FlatList, View, StyleSheet, Text, SafeAreaView } from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import { fontSizes, spacing } from "../../utils/sizes";

const HistoryItem = ({ item }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <SafeAreaView style={{ flex: 0.5, alignItems: "center" }}>
      {!!focusHistory.length && (
        <>
          <Text style={styles.title}>Things we have focused on</Text>
          <FlatList
            style={{ width: "100%", height: "100%", paddingTop: 16 }}
            contentContainerStyle={{ alignItems: "center" }}
            data={focusHistory}
            renderItem={({ item, index }) => <HistoryItem item={item} />}
          />
          <View style={styles.clearContainer}>
            <RoundedButton title="Clear" size={75} onPress={() => onClear()} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100%",
    paddingTop: 16,
  },
  contentContainerStyle: {
    alignItems: "center",
  },
  historyItem: (status) => ({
    color: status < 1 ? "red" : "green",
    fontSize: fontSizes.md,
  }),

  title: {
    color: "#fff",
    fontSize: fontSizes.lg,
  },

  clearContainer: {
    alignItems: "center",
    paddingTop: spacing.md,
  },
});
