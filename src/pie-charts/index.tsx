import React, {useState} from 'react';
import {View, Platform} from 'react-native';
//@ts-ignore
import * as shape from 'd3-shape';
import Svg, {G, Path} from 'react-native-svg';
import {PieChartProps} from './types';

/**
 * ### PieChart
 * @example <PieChart
 * style={{height 180,width:180}}
 * items={[
 * {
        key: 1,
        value: 15,
        svg: {fill: '#039'},
        label: '15%',
      },
      {
        key: 2,
        value: 85,
        svg: {fill: '#940'},
        label: '95%',
      },
 * ]}
 * innerRadius={40}
 * outerRadius={57}
 * labelRadius={60}/>
 * */
const PieChart = (props: PieChartProps) => {
  //Initial state, it will overwrite
  const [dimensions, setDimensions] = useState({
    height: 0, // Based on radius height and width will updated
    width: 0,
  });

  const {
    items = [],
    innerRadius = 0,
    outerRadius = 0,
    labelRadius = 0,
    style = {
      height: 0,
      width: 0,
    },
    valueAccessor = ({item}: {item: any}) => item.value,
    children,
    startAngle = 0,
    endAngle = Math.PI * 2,
    testID,
    sort = (a: any, b: any) => b.value - a.value,
  } = props;

  const data = items;
  const _onLayout = (event: any) => {
    const {
      nativeEvent: {
        layout: {height, width},
      },
    } = event;
    setDimensions({height, width});
  };
  const _calculateRadius = (arg: any, defaultVal: any) => {
    if (typeof arg === 'string') {
      //@ts-ignore
      return (arg.split('%')[0] / 100) * max;
    } else if (arg) {
      return arg;
    } else {
      return defaultVal;
    }
  };

  const {height, width} = dimensions;
  const maxRadius = Math.min(width, height) / 2;
  const _outerRadius = _calculateRadius(outerRadius, maxRadius);
  const _innerRadius = _calculateRadius(innerRadius, 0);
  const _labelRadius = _calculateRadius(labelRadius, _outerRadius);

  const arcs = data?.map((item: any) => {
    const arc = shape
      .arc()
      .outerRadius(_outerRadius)
      .innerRadius(_innerRadius)
      .padAngle(0);

    item?.arc &&
      Object.entries(item.arc).forEach(([key, value]) => {
        if (typeof arc[key] === 'function') {
          if (typeof value === 'string') {
            //@ts-ignore
            arc[key]((value.split('%')[0] / 100) * _outerRadius);
          } else {
            arc[key](value);
          }
        }
      });
    return arc;
  });

  const label = data?.map((item: any, index: number) => {
    if (labelRadius) {
      return shape
        .arc()
        .outerRadius(_labelRadius)
        .innerRadius(_labelRadius)
        .padAngle(0);
    }
    return arcs[index];
  });

  const pieSlices = shape
    .pie()
    .value((d: any) => valueAccessor({item: d}))
    .sort(sort)
    .startAngle(startAngle)
    .endAngle(endAngle)(data);

  const slices = pieSlices.map((slice: any, index: number) => ({
    ...slice,
    pieCentroid: arcs[index].centroid(slice),
    labelCentroid: label[index].centroid(slice),
  }));

  const extraProps = {
    width,
    height,
    data,
    slices,
  };

  return (
    <View pointerEvents={'box-none'} style={style} testID={testID}>
      <View
        pointerEvents={'box-none'}
        style={{flex: 1}}
        onLayout={(event) => _onLayout(event)}>
        {height > 0 && width > 0 && (
          <Svg
            pointerEvents={Platform.OS === "android" ? 'box-none' : 'none'}
            style={{height, width}}>
            <G x={width / 2} y={height / 2}>
              {React.Children.map(children, (child) => {
                if (child && child.props.belowChart) {
                  return React.cloneElement(child, extraProps);
                }
                return null;
              })}
              {pieSlices.map((slice: any, index: number) => {
                const {key, svg} = data[index];
                return <Path key={key} {...svg} d={arcs[index](slice)} />;
              })}
              {React.Children.map(children, (child) => {
                if (child && !child.props.belowChart) {
                  return React.cloneElement(child, extraProps);
                }
                return null;
              })}
            </G>
          </Svg>
        )}
      </View>
    </View>
  );
};

export default PieChart;
