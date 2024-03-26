import React, { useCallback } from "react";
import Slider from "react-native-a11y-slider";
import Styles from "./styles";

const RangeSlider = ({
  setLow,
  setHigh,
  min,
  max,
}: {
  setLow: (low: number) => void;
  setHigh: (high: number) => void;
  min: number;
  max: number;
}) => {
  const handleValueChange = useCallback((values: number[]) => {
    setLow(values[0]);
    setHigh(values[1]);
  }, []);

  return (
    <Slider
      min={min}
      max={max}
      values={[min, max]}
      markerColor="green"
      showLabel={false}
      trackStyle={Styles.root}
      selectedTrackStyle={Styles.root}
      onChange={(value: [number, number]) => {
        handleValueChange(value);
      }}
    />
  );
};

export default RangeSlider;
