## React Native Chart Kit Updated!

<a><img src="https://iili.io/H1tndyQ.md.png" alt="H1" border="0"></a>
<a>
<img src="https://raw.githubusercontent.com/chzappsinc/react-native-funnel-chart/master/example/React%20Native%20Funnel%20chart.png" alt="H2" />
</a>

`yarn add react-native-svg`

### Line Chart

<a href="https://freeimage.host/i/H1X1I9f"><img src="https://iili.io/H1X1I9f.md.png" alt="H1X1I9f.md.png" border="0"></a>

```js
{
  /*@ts-ignore*/
}
<LineChart
  data={{
    labels: ["Jan", "Feb", "Mar", "April", "June", "July", "Aug"],
    datasets: [
      {
        data: [10.47, 25.6, 11.4, 19.5, 8.9, 30.9, 55.9],
        amount: [5093995050, 283893, 382389, 80909, 48908, 893022, 2839090],
        color: "#AA9157",
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
    color: () => `#E94023`,
    // fontFamily: "",
  }}
  bezier
  style={{
    marginVertical: 30,
  }}
/>;
```
