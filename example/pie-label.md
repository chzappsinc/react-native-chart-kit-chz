## Pie Charts with Label

**Label.tsx**

```tsx
import React from 'react';
import {G, Text as SvgText} from 'react-native-svg';

interface LabelsProps {
  slices: {
    pieCentroid: string;
    labelCentroid: string;
    data: any;
  }[];
}

const Labels = (props: Partial<LabelsProps>) => {
  const {slices} = props as LabelsProps;
  const length = slices.length;

  //Dynamic Value
  const FONT_SIZE = length > 7 ? 10 : 11;
  const TEXT_Y = 2;
  const TEXT_X = 2;

  return (
    <>
      {slices.map((slice, index) => {
        const {labelCentroid, data} = slice;
        return (
          <G key={index}>
            <G x={labelCentroid[0]} y={labelCentroid[1]}>
              <SvgText
                key={index}
                x={TEXT_X}
                y={TEXT_Y}
                fill={data.svg.fill}
                textAnchor={'middle'}
                rotation={90}
                alignmentBaseline={'middle'}
                fontSize={FONT_SIZE}
                fontWeight="800">
                {data.label}
              </SvgText>
            </G>
          </G>
        );
      })}
    </>
  );
};

export default Labels;

```

**PieChart.tsx**

```tsx
import React from 'react';
import Labels from './Label';
import {PieChart} from 'react-native-chart-kit-chz';
import {View} from 'react-native';

const DataChart = () => {
  const chartData = [
    {
      key: 1,
      value: 100,
      svg: {fill: '#000'},
      arc: {cornerRadius: 0},
      label: 'Cplex',
    },
    {
      key: 2,
      value: 178,
      svg: {fill: '#902'},
      arc: {cornerRadius: 0},
      label: 'Jsum',
    },
  ];
  return (
    <View>
      <PieChart
        style={{width: 320, height: 320}}
        items={chartData}
        innerRadius={0}
        outerRadius={65}
        padAngle={0}
        labelRadius={90}>
        <Labels />
      </PieChart>
    </View>
  );
};

export default DataChart;

```
