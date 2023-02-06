# React Native Funnel Chart

**Note :  This Library is under BETA and does not support in landscape mode (BUG)**

<img src="https://raw.githubusercontent.com/chzappsinc/react-native-funnel-chart/master/example/React%20Native%20Funnel%20chart.png" style="border-radius:30px;"/>

<img src="https://raw.githubusercontent.com/chzappsinc/react-native-funnel-chart/master/example/RN-FNNEL-CHART-TEST.png" style="border-radius:30px;"/>

## Installation

```bash

yarn add react-native-funnel-chart

npm i react-native-funnel-chart

```

## Props

| Props | Type     | Description                |
| :-------- | :------- | :------------------------- |
| **data** | `Array` | **Required**. Array of Data |
| **backgroundColor** | `String` | Background Color Hex |
| **height** | `Number` | Height of the chart, > 150  |
| **lineColor** | `String` | Color the Line and Dot after Label  |
| **space** | `Number` | Space Between Data  |
| **fontSize** | `Number` | Font Size of Label Text |
| **textColor** | `String` | Label Text Color |
| **fontFamily** | `String` | Label Text FontFamily |

## Example

```js
import FunnelChart from 'react-native-funnel-chart';

 const demo_data = [
  {
    label: 'Unique Website Visits',
    value: '13589',
    color: '#9b46ff40',
  },
  {
    label: 'Programme Details Section Visits',
    value: '8855',
    color: '#9b46ff80',
  },
  {
    label: 'Attempts to Register',
    value: '8453',
    color: '#9b46ff60',
  },
  {
    label: 'Successful Registrations',
    value: '10586',
    color: '#9b46ff',
  },
];


 <FunnelChart
          animated
          data={demo_data}
          backgroundColor={'#000'}
          height={200}
          lineColor={'#fff'}
          space={3}
          fontSize={12}
          textColor={'#fff'}
        />

```
## Supported By
<div>
<a href="https://chzapps.com"><img src="https://raw.githubusercontent.com/chzappsinc/react-native-funnel-chart/master/example/chzapps.png" heigth="100" width="100"/></a>


<a href="https://www.lookingsoft.com"><img src="https://raw.githubusercontent.com/chzappsinc/react-native-funnel-chart/master/example/lk_soft.png" heigth="100" width="100"/></a>
 </div>
