"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_svg_1 = require("react-native-svg");
var LineChart = function (props) {
    var onPointPress = props.onPointPress, selectedDotColor = props.selectedDotColor, chartConfig = props.chartConfig, bezier = props.bezier, fontFamilyBold = props.fontFamilyBold, fontFamily = props.fontFamily, height = props.height, width = props.width, data = props.data, _a = props.withShadow, withShadow = _a === void 0 ? true : _a, _b = props.withDots, withDots = _b === void 0 ? true : _b, _c = props.style, style = _c === void 0 ? {
        backgroundColor: "#fff"
    } : _c;
    var initialStateValue = {
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
        length: 0
    };
    var _d = (0, react_1.useState)(initialStateValue), value = _d[0], setValue = _d[1];
    //Calculate Scale
    var calcScaler = function (data) { return Math.max.apply(Math, data) - Math.min.apply(Math, data) || 1; };
    //Render Horizontal Lines
    var renderHorizontalLines = function (config) {
        var count = config.count, width = config.width, height = config.height, paddingTop = config.paddingTop, paddingRight = config.paddingRight;
        return __spreadArray([], new Array(count), true).map(function (_, i) {
            return (<react_native_svg_1.Line key={Math.random()} x1={paddingRight} y1={(height / 4) * i + paddingTop} x2={width} y2={(height / 4) * i + paddingTop} stroke={"#DDE0E9"} strokeWidth={1}/>);
        });
    };
    //Render Horizontal Labels
    var renderHorizontalLabels = function (config) {
        var count = config.count, data = config.data, height = config.height, paddingTop = config.paddingTop, paddingRight = config.paddingRight, _a = config.yLabelsOffset, yLabelsOffset = _a === void 0 ? 12 : _a;
        var decimalPlaces = (chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.decimalPlaces) !== undefined ? chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.decimalPlaces : 2;
        return __spreadArray([], new Array(count), true).map(function (_, i) {
            return (
            // @ts-ignore
            <react_native_svg_1.Text key={Math.random()} x={paddingRight - yLabelsOffset} textAnchor="end" y={(height * 3) / 4 - ((height - paddingTop) / count) * i + 12} fontSize={12} fontFamily={chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.fontFamily} fill={"#738794"}>
          {count === 1
                    ? data[0].toFixed(decimalPlaces)
                    : ((calcScaler(data) / (count - 1)) * i + Math.min.apply(Math, data)).toFixed(decimalPlaces)}
        </react_native_svg_1.Text>);
        });
    };
    //Render Vertical Labels
    var renderVerticalLabels = function (config) {
        var _a = config.labels, labels = _a === void 0 ? [] : _a, width = config.width, height = config.height, paddingRight = config.paddingRight, paddingTop = config.paddingTop, _b = config.horizontalOffset, horizontalOffset = _b === void 0 ? 0 : _b;
        var fontSize = 12;
        return labels.map(function (label, i) {
            return (
            //@ts-ignore
            <react_native_svg_1.Text key={Math.random()} x={((width - paddingRight) / labels.length) * i +
                    paddingRight +
                    horizontalOffset} y={(height * 3) / 4 + paddingTop + fontSize * 2} fontSize={fontSize} fontFamily={chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.fontFamily} fill={"#738794"} alignmentBaseline={"middle"} textAnchor="middle">
          {label}
        </react_native_svg_1.Text>);
        });
    };
    // Render Vertical Lines
    var renderVerticalLines = function (config) {
        var data = config.data, width = config.width, height = config.height, paddingTop = config.paddingTop, paddingRight = config.paddingRight, current = config.current;
        return __spreadArray([], new Array(data.length), true).map(function (_, i) {
            return (
            //@ts-ignore
            <react_native_svg_1.G key={Math.random()}>
          {current === i && (<react_native_svg_1.Line key={Math.random()} x1={Math.floor(((width - paddingRight) / data.length) * i + paddingRight)} y1={0} x2={Math.floor(((width - paddingRight) / data.length) * i + paddingRight)} y2={height - height / 4 + paddingTop} stroke={chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.color} strokeWidth={1.5}/>)}
        </react_native_svg_1.G>);
        });
    };
    //Render Defs
    var renderDefs = function (config) {
        var width = config.width, height = config.height, _a = config.backgroundGradientFrom, backgroundGradientFrom = _a === void 0 ? "#fff" : _a, _b = config.backgroundGradientTo, backgroundGradientTo = _b === void 0 ? "#fff" : _b;
        return (<react_native_svg_1.Defs>
        {/*@ts-ignore*/}
        <react_native_svg_1.LinearGradient id="backgroundGradient" x1="0" y1={height} x2={width} y2={0}>
          <react_native_svg_1.Stop offset="0" stopColor={backgroundGradientFrom}/>
          <react_native_svg_1.Stop offset="1" stopColor={backgroundGradientTo}/>
        </react_native_svg_1.LinearGradient>
        {/*@ts-ignore*/}
        <react_native_svg_1.LinearGradient id="fillShadowGradient" x1={0} y1={0} x2={0} y2={height}>
          <react_native_svg_1.Stop offset="0" stopColor={chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.color} stopOpacity="0.1"/>
          <react_native_svg_1.Stop offset="1" stopColor={chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.color} stopOpacity="0"/>
        </react_native_svg_1.LinearGradient>
      </react_native_svg_1.Defs>);
    };
    //Render Dots
    var renderDots = function (config) {
        var data = config.data, width = config.width, height = config.height, paddingTop = config.paddingTop, paddingRight = config.paddingRight;
        var output = [];
        data.map(function (dataset, index) {
            dataset.data.map(function (x, i) {
                var cx = paddingRight + (i * (width - paddingRight)) / dataset.data.length;
                var cy = (height / 4) *
                    3 *
                    (1 - (x - Math.min.apply(Math, dataset.data)) / calcScaler(dataset.data)) +
                    paddingTop;
                var returnData = {
                    amount: dataset === null || dataset === void 0 ? void 0 : dataset.amount[i],
                    percentage: dataset === null || dataset === void 0 ? void 0 : dataset.data[i],
                    currency: dataset === null || dataset === void 0 ? void 0 : dataset.currency,
                    x: cx,
                    y: cy,
                    index: index,
                    color: dataset === null || dataset === void 0 ? void 0 : dataset.color
                };
                var onPress = function () {
                    onPointPress(returnData);
                    setValue({
                        currentDot: i,
                        cy: cy,
                        percentage: dataset === null || dataset === void 0 ? void 0 : dataset.data[i],
                        cx: cx,
                        show: true,
                        amount: dataset === null || dataset === void 0 ? void 0 : dataset.amount[i],
                        currency: dataset === null || dataset === void 0 ? void 0 : dataset.currency,
                        index: i,
                        color: dataset === null || dataset === void 0 ? void 0 : dataset.color,
                        id: dataset === null || dataset === void 0 ? void 0 : dataset.id,
                        length: data === null || data === void 0 ? void 0 : data.length
                    });
                };
                output.push(
                // @ts-ignore
                <react_native_svg_1.G key={Math.random()}>
            <react_native_svg_1.Circle onPress={onPress} onResponderMove={onPress} onPressIn={onPress} key={Math.random()} cx={cx} cy={cy} r="7" fill={(value === null || value === void 0 ? void 0 : value.currentDot) === i && (value === null || value === void 0 ? void 0 : value.id) === (dataset === null || dataset === void 0 ? void 0 : dataset.id)
                        ? selectedDotColor
                        : dataset === null || dataset === void 0 ? void 0 : dataset.color} stroke={"#fff"} strokeWidth={3}/>
          </react_native_svg_1.G>);
            });
        });
        return output;
    };
    //Render Shadow
    var renderShadow = function (config) {
        if (bezier) {
            return renderBezierShadow(config);
        }
        var width = config.width, height = config.height, paddingRight = config.paddingRight, paddingTop = config.paddingTop;
        var output = [];
        config.data.map(function (dataset, index) {
            output.push(
            // @ts-ignore
            <react_native_svg_1.Polygon key={index} points={dataset.data
                    .map(function (x, i) {
                    return paddingRight +
                        (i * (width - paddingRight)) / dataset.data.length +
                        "," +
                        ((height / 4) *
                            3 *
                            (1 -
                                (x - Math.min.apply(Math, dataset.data)) /
                                    calcScaler(dataset.data)) +
                            paddingTop);
                })
                    .join(" ") +
                    " ".concat(paddingRight +
                        ((width - paddingRight) / dataset.data.length) *
                            (dataset.data.length - 1), ",").concat((height / 4) * 3 + paddingTop, " ").concat(paddingRight, ",").concat((height / 4) * 3 + paddingTop)} fill="url(#fillShadowGradient)" strokeWidth={0}/>);
        });
        return output;
    };
    //Render Line
    var renderLine = function (config) {
        if (bezier) {
            return renderBezierLine(config);
        }
        var width = config.width, height = config.height, paddingRight = config.paddingRight, paddingTop = config.paddingTop, data = config.data;
        var output = [];
        data.map(function (dataset, index) {
            var points = dataset.data.map(function (x, i) {
                return paddingRight +
                    (i * (width - paddingRight)) / dataset.data.length +
                    "," +
                    ((height / 4) *
                        3 *
                        (1 - (x - Math.min.apply(Math, dataset.data)) / calcScaler(dataset.data)) +
                        paddingTop);
            });
            output.push(
            //@ts-ignore
            <react_native_svg_1.Polyline key={index} points={points.join(" ")} fill="none" stroke={chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.color} strokeWidth={3}/>);
        });
        return output;
    };
    //Line Points Bezier
    var getBezierLinePoints = function (dataset, config) {
        var width = config.width, height = config.height, paddingRight = config.paddingRight, paddingTop = config.paddingTop, data = config.data;
        if (dataset.data.length === 0) {
            return "M0,0";
        }
        var x = function (i) {
            return Math.floor(paddingRight + (i * (width - paddingRight)) / dataset.data.length);
        };
        var y = function (i) {
            return Math.floor((height / 4) *
                3 *
                (1 -
                    (dataset.data[i] - Math.min.apply(Math, dataset.data)) /
                        calcScaler(dataset.data)) +
                paddingTop);
        };
        return ["M".concat(x(0), ",").concat(y(0))]
            .concat(dataset.data.slice(0, -1).map(function (_, i) {
            var x_mid = (x(i) + x(i + 1)) / 2;
            var y_mid = (y(i) + y(i + 1)) / 2;
            var cp_x1 = (x_mid + x(i)) / 2;
            var cp_x2 = (x_mid + x(i + 1)) / 2;
            return ("Q ".concat(cp_x1, ", ").concat(y(i), ", ").concat(x_mid, ", ").concat(y_mid) +
                "Q ".concat(cp_x2, ", ").concat(y(i + 1), ", ").concat(x(i + 1), ", ").concat(y(i + 1)));
        }))
            .join(" ");
    };
    //Render Bezier Lines
    var renderBezierLine = function (config) {
        var output = [];
        config.data.map(function (dataset, index) {
            var result = getBezierLinePoints(dataset, config);
            output.push(
            //@ts-ignore
            <react_native_svg_1.Path key={index} d={result} fill="none" stroke={dataset === null || dataset === void 0 ? void 0 : dataset.color} strokeWidth={2.5}/>);
        });
        return output;
    };
    //Render Bezier Shadow
    var renderBezierShadow = function (config) {
        var width = config.width, height = config.height, paddingRight = config.paddingRight, paddingTop = config.paddingTop, data = config.data;
        var output = [];
        data.map(function (dataset, index) {
            var d = getBezierLinePoints(dataset, config) +
                " L".concat(paddingRight +
                    ((width - paddingRight) / dataset.data.length) *
                        (dataset.data.length - 1), ",").concat((height / 4) * 3 + paddingTop, " L").concat(paddingRight, ",").concat((height / 4) * 3 + paddingTop, " Z");
            output.push(
            //@ts-ignore
            <react_native_svg_1.Path key={index} d={d} fill={(dataset === null || dataset === void 0 ? void 0 : dataset.color) + 20} strokeWidth={0}/>);
        });
        return output;
    };
    var formatter = new Intl.NumberFormat("en-US", {
        currency: "USD"
    });
    var paddingTop = 16;
    var paddingRight = 60;
    var reqIn = [5, 6];
    var _e = data.labels, labels = _e === void 0 ? [] : _e;
    var _f = style.borderRadius, borderRadius = _f === void 0 ? 0 : _f;
    var config = {
        width: width,
        height: height
    };
    return (<react_native_1.View style={style}>
      <react_native_svg_1.Svg onPress={function () {
            setValue(initialStateValue);
        }} height={height} width={width + 50}>
        {/* @ts-ignore */}
        <react_native_svg_1.G>
          {renderDefs(__assign(__assign({}, config), chartConfig))}
          <react_native_svg_1.Rect width="100%" height={height} rx={borderRadius} ry={borderRadius} fill="url(#backgroundGradient)"/>
          {renderHorizontalLines(__assign(__assign({}, config), { count: 4, paddingTop: paddingTop, paddingRight: paddingRight }))}
          {renderHorizontalLabels(__assign(__assign({}, config), { count: Math.min.apply(Math, data.datasets[0].data) === Math.max.apply(Math, data.datasets[0].data)
                ? 1
                : 4, data: data.datasets[0].data, paddingTop: paddingTop, paddingRight: paddingRight }))}
          {renderVerticalLines(__assign(__assign({}, config), { data: data.datasets[0].data, paddingTop: paddingTop, paddingRight: paddingRight, current: value === null || value === void 0 ? void 0 : value.currentDot, cy: value === null || value === void 0 ? void 0 : value.cy }))}
          {renderVerticalLabels(__assign(__assign({}, config), { labels: labels, paddingRight: paddingRight, paddingTop: paddingTop }))}
          {renderLine(__assign(__assign({}, config), { paddingRight: paddingRight, paddingTop: paddingTop, data: data.datasets }))}
          {withShadow &&
            renderShadow(__assign(__assign({}, config), { data: data.datasets, paddingRight: paddingRight, paddingTop: paddingTop }))}
          {withDots &&
            renderDots(__assign(__assign({}, config), { data: data.datasets, paddingTop: paddingTop, paddingRight: paddingRight }))}
        </react_native_svg_1.G>
        {(value === null || value === void 0 ? void 0 : value.show) && (<react_native_1.Animated.View testID={"LineChartToolTip"} style={{
                transform: [
                    {
                        translateX: reqIn.includes(value === null || value === void 0 ? void 0 : value.index)
                            ? (value === null || value === void 0 ? void 0 : value.cx) - 80
                            : (value === null || value === void 0 ? void 0 : value.cx) + 11
                    },
                    { translateY: (value === null || value === void 0 ? void 0 : value.cy) - 10 },
                ],
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#DDE0E9",
                padding: 8,
                borderRadius: 10,
                maxWidth: "30%",
                alignItems: "center",
                alignSelf: "baseline",
                borderBottomWidth: (value === null || value === void 0 ? void 0 : value.length) > 1 ? 2 : 1,
                borderBottomColor: (value === null || value === void 0 ? void 0 : value.length) > 1 ? value === null || value === void 0 ? void 0 : value.color : "#DDE0E9"
            }}>
            <react_native_1.Text style={{
                fontSize: 14,
                fontWeight: "700",
                fontFamily: fontFamilyBold
            }}>
              {value === null || value === void 0 ? void 0 : value.percentage}%
            </react_native_1.Text>
            <react_native_1.Text style={{
                color: "#738794",
                fontSize: 11,
                fontFamily: fontFamily,
                textAlign: "center"
            }}>
              {value === null || value === void 0 ? void 0 : value.currency} {formatter.format(value === null || value === void 0 ? void 0 : value.amount)}
            </react_native_1.Text>
          </react_native_1.Animated.View>)}
      </react_native_svg_1.Svg>
    </react_native_1.View>);
};
exports["default"] = LineChart;
