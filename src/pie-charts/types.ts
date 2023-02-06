import {ViewStyle} from 'react-native';

export interface PieChartProps {
  /**
     * * items to pass in PieChart, label is required only if you are passing label props
     * @example 
     * [{
        key: 1,
        value: 15,
        svg: {fill: '#000'},
        label: '15%',
      }... + Other Data]
    */
  items: Array<PieChartData | SpeedometerData>;
  /**
   * innerRadius -
   * * If innerRadius is zero, the chart is a pie chart; otherwise, it is a donut chart.
   * * If you use a donut chart, innerRadius will help you in reducing the chart size inside.
   * @example
   * innerRadius={0} => PieChart
   * innerRadius={20 ...or any number >=5} => DonutChart
   */
  innerRadius: number;
  /**
   * outerRadius -
   * * outerRadius will help you in reducing the chart size from top to bottom.
   * @example
   * outerRadius={10}
   */
  outerRadius: number;
  /**
   * labelRadius  -
   * * labelRadius will help you in giving proper space to label
   *
   * _For outside label, labelRadius must be greater then outerRadius_
   * @example
   * labelRadius={10} and outerRadius={8} => //Label will stay outside
   */
  labelRadius: number;
  /**
   * style ViewStyle  -
   * * This will help you to style the background of peiChart
   * @example
   * style={{height:180,width:180}}
   */
  style: ViewStyle;
  sort?: () => void;
  valueAccessor?: () => void;
  children?: any;
  startAngle?: number;
  endAngle?: number;
  padAngle?: any;
  testID?: string;
}

interface PieChartData {
  key: number;
  /**
   * value : based on this value, chart will be created
   * _if there is 2 values 80 and 20 then 20% chart space will be used by value 20 and 80% by value 80_
   * @example
   * value:{80}
   */
  value: number;
  /**
   * svg that need to pass for svg props
   * @example
   * svg :{
   * fill:"#000"
   * }
   *
   */
  svg: {fill: string};
  /**
   * label need to pass only if it contains label children
   * @example labe:{value + "%"} => "10%"
   * */
  label?: string;
}

interface SpeedometerData {
  key: number;
  /**
   * value : based on this value, chart will be created
   * _if there is 2 values 80 and 20 then 20% chart space will be used by value 20 and 80% by value 80_
   * @example
   * value:{80}
   */
  value: number;
  /**
   * svg that need to pass for svg props
   * @example
   * svg :{
   * fill:"#000"
   * }
   *
   */
  svg: {fill: string};
}
