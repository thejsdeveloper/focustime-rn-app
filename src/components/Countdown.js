import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { fontSizes, spacing } from "../utils/sizes";
import { colors } from "../utils/colors";

const minutesToMilis = (min) => min * 1000 * 60;
const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

export const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const [milis, setMilis] = useState(null);
  const interval = React.useRef(null);

  const minute = Math.floor(milis / 1000 / 60) % 60;
  const seconds = Math.floor(milis / 1000) % 60;

  const countDown = () => {
    setMilis((time) => {
      if (time === 0) {
        clearInterval(interval.current);

        return time;
      }

      const timeLeft = time - 1000;

      return timeLeft;
    });
  };

  useEffect(() => {
    onProgress(timeLeft / minutesToMilis(minutes));
    if (milis === 0) onEnd();
  }, [milis]);

  useEffect(() => {
    clearInterval(interval.current);
    setMilis(minutesToMilis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: fontSizes.xxxl,
    padding: spacing.lg,
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
});
