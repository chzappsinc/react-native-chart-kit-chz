import React, { useState } from "react";
import { Text, View, Animated } from "react-native";
import {
  Circle,
  Polygon,
  Polyline,
  Path,
  Rect,
  G,
  Text as SVGText,
  Svg,
  LinearGradient,
  Line,
  Defs,
  Stop,
} from "react-native-svg";
import { LineChartProps } from "./types";
/**
 * ## Line Chart V2
 * Docs available at https://www.npmjs.com/package/react-native-chart-kit-chz
 */
const LineChart = (props: LineChartProps) => {
  const {
    onPointPress,
    selectedDotColor,
    chartConfig,
    bezier,
    fontFamilyBold,
    fontFamily,
    height,
    width,
    data,
    withShadow = true,
    withDots = true,
    style = {
      backgroundColor: "#fff",
    },
  } = props;
  const initialStateValue = {
    currentDot: -1,
    cy: 0,
    cx: 0,
    percentage: 0,
    amount: 0,
    show: false,
    currency: "",
    index: 0,
    color: "",
    id: -1,
    length: 0,
  };
  const [value, setValue] = useState(initialStateValue);

  //Calculate Scale
  const calcScaler = (data: any) => Math.max(...data) - Math.min(...data) || 1;

  //Render Horizontal Lines
  const renderHorizontalLines = (config: any) => {
    const { count, width, height, paddingTop, paddingRight } = config;
    return [...new Array(count)].map((_: any, i: number) => {
      return (
        <Line
          key={Math.random()}
          x1={paddingRight}
          y1={(height / 4) * i + paddingTop}
          x2={width}
          y2={(height / 4) * i + paddingTop}
          stroke={"#DDE0E9"}
          strokeWidth={1}
        />
      );
    });
  };

  //Render Horizontal Labels
  const renderHorizontalLabels = (config: any) => {
    const {
      count,
      data,
      height,
      paddingTop,
      paddingRight,
      yLabelsOffset = 12,
    } = config;
    var decimalPlaces =
      chartConfig?.decimalPlaces !== undefined ? chartConfig?.decimalPlaces : 2;
    return [...new Array(count)].map((_, i) => {
      return (
        // @ts-ignore
        <SVGText
          key={Math.random()}
          x={paddingRight - yLabelsOffset}
          textAnchor="end"
          y={(height * 3) / 4 - ((height - paddingTop) / count) * i + 12}
          fontSize={12}
          fontFamily={chartConfig?.fontFamily}
          fill={"#738794"}
        >
          {count === 1
            ? data[0].toFixed(decimalPlaces)
            : (
                (calcScaler(data) / (count - 1)) * i +
                Math.min(...data)
              ).toFixed(decimalPlaces)}
        </SVGText>
      );
    });
  };

  //Render Vertical Labels
  const renderVerticalLabels = (config: any) => {
    const {
      labels = [],
      width,
      height,
      paddingRight,
      paddingTop,
      horizontalOffset = 0,
    } = config;
    const fontSize = 12;
    return labels.map((label, i) => {
      return (
        //@ts-ignore
        <SVGText
          key={Math.random()}
          x={
            ((width - paddingRight) / labels.length) * i +
            paddingRight +
            horizontalOffset
          }
          y={(height * 3) / 4 + paddingTop + fontSize * 2}
          fontSize={fontSize}
          fontFamily={chartConfig?.fontFamily}
          fill={"#738794"}
          alignmentBaseline={"middle"}
          textAnchor="middle"
        >
          {label}
        </SVGText>
      );
    });
  };

  // Render Vertical Lines
  const renderVerticalLines = (config: any) => {
    const { data, width, height, paddingTop, paddingRight, current } = config;
    return [...new Array(data.length)].map((_, i) => {
      return (
        //@ts-ignore
        <G key={Math.random()}>
          {current === i && (
            <Line
              key={Math.random()}
              x1={Math.floor(
                ((width - paddingRight) / data.length) * i + paddingRight
              )}
              y1={0}
              x2={Math.floor(
                ((width - paddingRight) / data.length) * i + paddingRight
              )}
              y2={height - height / 4 + paddingTop}
              stroke={chartConfig?.color}
              strokeWidth={1.5}
            />
          )}
        </G>
      );
    });
  };

  //Render Defs
  const renderDefs = (config: any) => {
    const {
      width,
      height,
      backgroundGradientFrom = "#fff",
      backgroundGradientTo = "#fff",
    } = config;
    return (
      <Defs>
        {/*@ts-ignore*/}
        <LinearGradient
          id="backgroundGradient"
          x1="0"
          y1={height}
          x2={width}
          y2={0}
        >
          <Stop offset="0" stopColor={backgroundGradientFrom} />
          <Stop offset="1" stopColor={backgroundGradientTo} />
        </LinearGradient>
        {/*@ts-ignore*/}
        <LinearGradient
          id="fillShadowGradient"
          x1={0}
          y1={0}
          x2={0}
          y2={height}
        >
          <Stop offset="0" stopColor={chartConfig?.color} stopOpacity="0.1" />
          <Stop offset="1" stopColor={chartConfig?.color} stopOpacity="0" />
        </LinearGradient>
      </Defs>
    );
  };

  //Render Dots
  const renderDots = (config: any) => {
    const { data, width, height, paddingTop, paddingRight } = config;
    let output = [];
    data.map((dataset: any, index: number) => {
      dataset.data.map((x: any, i: any) => {
        let cx =
          paddingRight + (i * (width - paddingRight)) / dataset.data.length;
        let cy =
          (height / 4) *
            3 *
            (1 - (x - Math.min(...dataset.data)) / calcScaler(dataset.data)) +
          paddingTop;
        let returnData = {
          amount: dataset?.amount[i],
          percentage: dataset?.data[i],
          currency: dataset?.currency,
          x: cx,
          y: cy,
          index,
          color: dataset?.color,
        };
        const onPress = () => {
          onPointPress(returnData);
          setValue({
            currentDot: i,
            cy,
            percentage: dataset?.data[i],
            cx,
            show: true,
            amount: dataset?.amount[i],
            currency: dataset?.currency,
            index: i,
            color: dataset?.color,
            id: dataset?.id,
            length: data?.length,
          });
        };
        output.push(
          // @ts-ignore
          <G key={Math.random()}>
            <Circle
              onPress={onPress}
              onResponderMove={onPress}
              onPressIn={onPress}
              key={Math.random()}
              cx={cx}
              cy={cy}
              r="7"
              fill={
                value?.currentDot === i && value?.id === dataset?.id
                  ? selectedDotColor
                  : dataset?.color
              }
              stroke={"#fff"}
              strokeWidth={3}
            />
          </G>
        );
      });
    });
    return output;
  };

  //Render Shadow
  const renderShadow = (config: any) => {
    if (bezier) {
      return renderBezierShadow(config);
    }
    const { width, height, paddingRight, paddingTop } = config;
    let output = [];
    config.data.map((dataset: any, index: number) => {
      output.push(
        // @ts-ignore
        <Polygon
          key={index}
          points={
            dataset.data
              .map(
                (x: any, i: number) =>
                  paddingRight +
                  (i * (width - paddingRight)) / dataset.data.length +
                  "," +
                  ((height / 4) *
                    3 *
                    (1 -
                      (x - Math.min(...dataset.data)) /
                        calcScaler(dataset.data)) +
                    paddingTop)
              )
              .join(" ") +
            ` ${
              paddingRight +
              ((width - paddingRight) / dataset.data.length) *
                (dataset.data.length - 1)
            },${(height / 4) * 3 + paddingTop} ${paddingRight},${
              (height / 4) * 3 + paddingTop
            }`
          }
          fill="url(#fillShadowGradient)"
          strokeWidth={0}
        />
      );
    });
    return output;
  };

  //Render Line
  const renderLine = (config: any) => {
    if (bezier) {
      return renderBezierLine(config);
    }
    const { width, height, paddingRight, paddingTop, data } = config;
    let output = [];
    data.map((dataset: any, index: number) => {
      const points = dataset.data.map(
        (x: any, i: number) =>
          paddingRight +
          (i * (width - paddingRight)) / dataset.data.length +
          "," +
          ((height / 4) *
            3 *
            (1 - (x - Math.min(...dataset.data)) / calcScaler(dataset.data)) +
            paddingTop)
      );

      output.push(
        //@ts-ignore
        <Polyline
          key={index}
          points={points.join(" ")}
          fill="none"
          stroke={chartConfig?.color}
          strokeWidth={3}
        />
      );
    });

    return output;
  };

  //Line Points Bezier
  const getBezierLinePoints = (dataset: any, config: any) => {
    const { width, height, paddingRight, paddingTop } = config;
    if (dataset.data.length === 0) {
      return "M0,0";
    }
    const x = (i: number) =>
      Math.floor(
        paddingRight + (i * (width - paddingRight)) / dataset.data.length
      );
    const y = (i: number) =>
      Math.floor(
        (height / 4) *
          3 *
          (1 -
            (dataset.data[i] - Math.min(...dataset.data)) /
              calcScaler(dataset.data)) +
          paddingTop
      );

    return [`M${x(0)},${y(0)}`]
      .concat(
        dataset.data.slice(0, -1).map((_: any, i: number) => {
          const x_mid = (x(i) + x(i + 1)) / 2;
          const y_mid = (y(i) + y(i + 1)) / 2;
          const cp_x1 = (x_mid + x(i)) / 2;
          const cp_x2 = (x_mid + x(i + 1)) / 2;
          return (
            `Q ${cp_x1}, ${y(i)}, ${x_mid}, ${y_mid}` +
            `Q ${cp_x2}, ${y(i + 1)}, ${x(i + 1)}, ${y(i + 1)}`
          );
        })
      )
      .join(" ");
  };

  //Render Bezier Lines
  const renderBezierLine = (config: any) => {
    let output = [];
    config.data.map((dataset: any, index: number) => {
      let result = getBezierLinePoints(dataset, config);
      output.push(
        //@ts-ignore
        <Path
          key={index}
          d={result}
          fill="none"
          stroke={dataset?.color}
          strokeWidth={2.5}
        />
      );
    });
    return output;
  };

  //Render Bezier Shadow
  const renderBezierShadow = (config: any) => {
    const { width, height, paddingRight, paddingTop, data } = config;
    let output = [];
    data.map((dataset: any, index: number) => {
      let d =
        getBezierLinePoints(dataset, config) +
        ` L${
          paddingRight +
          ((width - paddingRight) / dataset.data.length) *
            (dataset.data.length - 1)
        },${(height / 4) * 3 + paddingTop} L${paddingRight},${
          (height / 4) * 3 + paddingTop
        } Z`;
      output.push(
        //@ts-ignore
        <Path key={index} d={d} fill={dataset?.color + 20} strokeWidth={0} />
      );
    });
    return output;
  };

  const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
  });
  const paddingTop = 16;
  const paddingRight = 60;
  const reqIn = [5, 6];
  const { labels = [] } = data;
  const { borderRadius = 0 } = style;
  const config = {
    width,
    height,
  };
  return (
    <View style={style}>
      <Svg
        onPress={() => {
          setValue(initialStateValue);
        }}
        height={height}
        width={width + 50}
      >
        {/* @ts-ignore */}
        <G>
          {renderDefs({
            ...config,
            ...chartConfig,
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          {renderHorizontalLines({
            ...config,
            count: 4,
            paddingTop,
            paddingRight,
          })}
          {renderHorizontalLabels({
            ...config,
            count:
              Math.min(...data.datasets[0].data) ===
              Math.max(...data.datasets[0].data)
                ? 1
                : 4,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight,
          })}
          {renderVerticalLines({
            ...config,
            data: data.datasets[0].data,
            paddingTop,
            paddingRight,
            current: value?.currentDot,
            cy: value?.cy,
          })}
          {renderVerticalLabels({
            ...config,
            labels,
            paddingRight,
            paddingTop,
          })}
          {renderLine({
            ...config,
            paddingRight,
            paddingTop,
            data: data.datasets,
          })}
          {withShadow &&
            renderShadow({
              ...config,
              data: data.datasets,
              paddingRight,
              paddingTop,
            })}
          {withDots &&
            renderDots({
              ...config,
              data: data.datasets,
              paddingTop,
              paddingRight,
            })}
        </G>
        {value?.show && (
          <Animated.View
            testID={"LineChartToolTip"}
            style={{
              transform: [
                {
                  translateX: reqIn.includes(value?.index)
                    ? value?.cx - 80
                    : value?.cx + 11,
                },
                { translateY: value?.cy - 10 },
              ],
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#DDE0E9",
              padding: 8,
              borderRadius: 10,
              maxWidth: "30%",
              alignItems: "center",
              alignSelf: "baseline",
              borderBottomWidth: value?.length > 1 ? 2 : 1,
              borderBottomColor: value?.length > 1 ? value?.color : "#DDE0E9",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                fontFamily: fontFamilyBold,
              }}
            >
              {value?.percentage}%
            </Text>
            <Text
              style={{
                color: "#738794",
                fontSize: 11,
                fontFamily: fontFamily,
                textAlign: "center",
              }}
            >
              {value?.currency} {formatter.format(value?.amount)}
            </Text>
          </Animated.View>
        )}
      </Svg>
    </View>
  );
};

export default LineChart;
