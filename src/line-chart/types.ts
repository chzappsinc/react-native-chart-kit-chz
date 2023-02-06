import {ViewStyle} from 'react-native';

export interface LineChartProps {
  onPointPress: (data: {}) => void;
  selectedDotColor: string;
  chartConfig: {
    decimalPlaces: 1;
    color: string;
    fontFamily: string;
  };
  bezier: boolean;
  fontFamilyBold?: string;
  fontFamily?: string;
  data: {
    labels: Array<String>;
    datasets: Array<datasets>;
  };
  width: number;
  height: number;
  style?: ViewStyle;
  withShadow?: boolean;
  withDots?: boolean;
}

interface datasets {
  data: Array<number>;
  amount: Array<number>;
  color: string;
  currency: string;
  id: number;
}
interface dataSet {}
