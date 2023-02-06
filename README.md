# React Native Chart Kit Chz

**Developed By [Chzapps India](https://chzapps.com)**

<!--<a><img src="https://iili.io/H1tndyQ.md.png" alt="H1" border="0"></a>
<a>-->

## Installation

```cli
yarn add react-native-svg
yarn add react-native-chart-kit-chz
```

## charts 
- [Line Chart](#line-chart)
- [Pie Chart](#pie-chart)
- [Funnel Chart](#funnel-chart)

### Line Chart

<a href=""><img src="https://iili.io/H1DTRfI.md.png" alt="H1DTRfI.md.png" border="0"></a>
<a href=""><img src="https://iili.io/H1DT5lt.md.png" alt="H1DT5lt.md.png" border="0"></a><br />

```js
import {LineChart} from "react-native-chart-kit-chz"
```

```js
<LineChart
  data={{
    labels: ["Jan", "Feb", "Mar", "April", "June", "July", "Aug"],
    datasets: [
      {
        data: [10.47, 25.6, 11.4, 19.5, 8.9, 30.9, 55.9],
        amount: [5093995050, 283893, 382389, 80909, 48908, 893022, 2839090],
        color: "#000531",
        currency: "USD",
        id: 1,
      },
    ],
  }}
  onPointPress={(d: any) => {
    console.log("chart_Data", d);
  }}
  selectedDotColor="#000"
  width={Dimensions.get("window").width}
  height={200}
  chartConfig={{
    decimalPlaces: 1,
    color: `#000531`,
    // fontFamily: "",
  }}
  bezier
  style={{
    marginVertical: 30,
  }}
/>;
```

### Pie Chart
<a><img height="200" src="https://iili.io/H1DAOox.png" alt="H1DAOox.png" border="0"></a>
<a><img height="200" src="https://iili.io/H1DAeMQ.png" alt="H1DAeMQ.png" border="0"></a>

**Note** : Label need to be created from your end [Example](/example/pie-label.md)

```js
import {PieChart} from "react-native-chart-kit-chz"
```

```js

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

   <PieChart
     style={{width: 320, height: 320}}
     items={chartData}
     innerRadius={50}
     outerRadius={65}
     padAngle={0}}
     />
```

## Funnel Chart

<a><img height="200" src="https://raw.githubusercontent.com/chzappsinc/react-native-funnel-chart/master/example/React%20Native%20Funnel%20chart.png" alt="H1DAOox.png" border="0"></a>
<a><img height="200" src="https://raw.githubusercontent.com/chzappsinc/react-native-funnel-chart/master/example/RN-FNNEL-CHART-TEST.png" alt="H1DAeMQ.png" border="0"></a>


```js
import {FunnelChart} from "react-native-chart-kit-chz"
```

```js

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
