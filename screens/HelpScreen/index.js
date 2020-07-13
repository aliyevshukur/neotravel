import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { QandACard } from "./QandACard";
import COLORS from "../../styles/colors";
const FAQData = [
  {
    id: 1,
    question: "Why did you launch a new site?",
    answer:
      "You asked, we listened and couldn't wait to bring all your suggestions to life. So we did, and the new site was born. We're making it easier for you to plan trips, contribute content and find exactly what you're looking for. (We tried launching a space shuttle too, but let's just say it was a bit too complicated for us web folks).",
  },
  {
    id: 2,
    question: "How can I give you my feedback and suggestions?",
    answer:
      "Just shout through your megaphone and we'll hear you. On second thought, you can share your thoughts with us here. Please tell us anything and everything. We take your comments seriously and use them to help make TripAdvisor a better, more helpful site for you.",
  },
  {
    id: 3,
    question: "Why have only some pages been redesigned?",
    answer:
      "We're rolling the site out gradually so we can incorporate your feedback and ideas on every page, every step of the way. After all, Rome wasn't built in a day – and that's a good thing. (Can you imagine what the Coliseum would look like?)",
  },
  {
    id: 4,
    question:
      "As an owner or manager, how do I report a review that violates your guidelines?",
    answer:
      "We will remove the review if we confirm that it violates our review guidelines. However, please note that we do not fact check reviews, so we cannot remove a review simply because there is a disagreement about its contents.",
  },
];

export const HelpScreen = () => {
  const theme = useSelector((state) => state.themeReducer).theme;

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme == "light" ? COLORS.bgcLight : COLORS.bgcDark,
      }}
    >
      <FlatList
        contentContainerStyle={{ margin: 0, padding: 0 }}
        data={FAQData}
        renderItem={({ item }) => <QandACard theme={theme} item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
