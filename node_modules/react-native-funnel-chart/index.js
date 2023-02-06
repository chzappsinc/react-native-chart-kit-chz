import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";

/**
 * @author Jasim T K
 *
 * @see https://chzapps.com
 *
 * @see https://chzappsinc.github.io/react-native-funnel-chart-chz
 *
 * @version 1.0.0
 *
 */

const FunnelChart = ({
  data,
  height = 200,
  space = 1,
  fontSize = 12,
  fontFamily,
  lineColor = "#000",
  backgroundColor = "#fff",
  textColor = "#000",
  animated,
}) => {
  const [render, setRender] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    ReleaseData();
  }, []);

  const ReleaseData = () => {
    if (data) {
      if (height >= 150) {
        const updateToNumber = data.map((i) => {
          return {
            label: i.label,
            value: Number(i.value),
            color: i.color,
          };
        });
        const short = updateToNumber.sort((a, b) => a.value - b.value);
        const totalValue = updateToNumber.reduce(
          (diff, a) => diff + a.value,
          0
        );
        setTotal(totalValue);
        setRender(short);
      } else {
        console.error(
          "Funnel Chart only supports height more then 150 Thankyou!"
        );
      }
    } else {
      console.error("Pass valid data to the Funnel Chart");
    }
  };

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  return (
    <Animatable.View
      animation={animated ? "zoomInUp" : null}
      style={{
        backgroundColor: backgroundColor,
        height: height >= 150 ? height : 0,
        overflow: "hidden",
      }}
    >
      {render &&
        render.map((toShow) => {
          const toSize = Math.round((toShow.value / total) * 100);
          const sized = toSize.toString() + "%";
          return (
            <View
              key={generateColor()}
              style={{
                backgroundColor: toShow.color,
                width: "100%",
                height: sized,
                marginBottom: space,
              }}
            />
          );
        })}
      <View
        style={{
          backgroundColor: backgroundColor,
          height: height <= 199 ? "200%" : "185%",
          width: "50%",
          position: "absolute",
          transform: [
            { rotate: "330deg" },
            {
              translateX:
                height <= 199
                  ? -Dimensions.get("window").width * 0.058
                  : -Dimensions.get("window").width * 0.058,
            },
            { translateY: height <= 199 ? -80 : -120 },
          ],
        }}
      />
      <View
        style={{
          backgroundColor: backgroundColor,
          height: height <= 199 ? "200%" : "185%",
          width: "50%",
          position: "absolute",
          transform: [
            { rotate: "-331deg" },
            {
              translateX:
                height <= 199
                  ? Dimensions.get("window").width * 0.49
                  : Dimensions.get("window").width * 0.49,
            },
            { translateY: height <= 199 ? -180 : -200 },
          ],
        }}
      />
      <View style={{ position: "absolute", height: "100%" }}>
        {render &&
          render.map((text) => {
            const toSize = Math.round((text.value / total) * 100);
            const sized = toSize.toString() + "%";
            return (
              <View
                key={generateColor()}
                style={{
                  height: sized,
                  minHeight: 20,
                  alignItems: "center",
                  marginLeft: 10,
                  width: Dimensions.get("window").width * 0.5,
                  flexDirection: "row",
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    flex: 3,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    color: textColor,
                  }}
                >
                  {text.label}
                </Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: lineColor,
                    flex: 1,
                  }}
                />
                <View
                  style={{
                    height: 10,
                    backgroundColor: lineColor,
                    width: 10,
                    borderRadius: 100,
                  }}
                />
              </View>
            );
          })}
      </View>
    </Animatable.View>
  );
};

// FunnelChart.propType = {
//   data: PropTypes.array.isRequired,
// };

export default FunnelChart;

/**
 * @folly
 * @turner
 * @path /libs/async
 * @action ~~true
 * */
("use-chz-types;@chzappsinc-types-required;folly-lib;folly-json;chz-device@0.2.2~ios;chz-device;");
`ProChecked-${false}`;
