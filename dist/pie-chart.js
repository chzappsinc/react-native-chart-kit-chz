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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
//@ts-ignore
var shape = require("d3-shape");
var PieChart = function (props) {var _a = (0, react_1.useState)({height: 0,width: 0,
    }), dimensions = _a[0], setDimensions = _a[1];
    var _b = props.items, items = _b === void 0 ? [] : _b, _c = props.innerRadius, innerRadius = _c === void 0 ? 0 : _c, _d = props.outerRadius, outerRadius = _d === void 0 ? 0 : _d, _e = props.labelRadius, labelRadius = _e === void 0 ? 0 : _e, _f = props.style, style = _f === void 0 ? {
        height: 0,
        width: 0,
    } : _f, _g = props.valueAccessor, valueAccessor = _g === void 0 ? function (_a) {
        var item = _a.item;
        return item.value;
    } : _g, children = props.children, _h = props.startAngle, startAngle = _h === void 0 ? 0 : _h, _j = props.endAngle, endAngle = _j === void 0 ? Math.PI * 2 : _j, testID = props.testID, _k = props.sort, sort = _k === void 0 ? function (a, b) { return b.value - a.value; } : _k;
    var data = items;
    var _onLayout = function (event) {
        var _a = event.nativeEvent.layout, height = _a.height, width = _a.width;
        setDimensions({ height: height, width: width });
    };
    var _calculateRadius = function (arg, defaultVal) {
        if (typeof arg === 'string') {
            //@ts-ignore
            return (arg.split('%')[0] / 100) * max;
        }
        else if (arg) {
            return arg;
        }
        else {
            return defaultVal;
        }
    };
    var height = dimensions.height, width = dimensions.width;
    var maxRadius = Math.min(width, height) / 2;
    var _outerRadius = _calculateRadius(outerRadius, maxRadius);
    var _innerRadius = _calculateRadius(innerRadius, 0);
    var _labelRadius = _calculateRadius(labelRadius, _outerRadius);
    var arcs = data === null || data === void 0 ? void 0 : data.map(function (item) {
        var arc = shape
            .arc()
            .outerRadius(_outerRadius)
            .innerRadius(_innerRadius)
            .padAngle(0);
        (item === null || item === void 0 ? void 0 : item.arc) &&
            Object.entries(item.arc).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (typeof arc[key] === 'function') {
                    if (typeof value === 'string') {
                        //@ts-ignore
                        arc[key]((value.split('%')[0] / 100) * _outerRadius);
                    }
                    else {
                        arc[key](value);
                    }
                }
            });
        return arc;
    });
    var label = data === null || data === void 0 ? void 0 : data.map(function (item, index) {
        if (labelRadius) {
            return shape
                .arc()
                .outerRadius(_labelRadius)
                .innerRadius(_labelRadius)
                .padAngle(0);
        }
        return arcs[index];
    });
    var pieSlices = shape
        .pie()
        .value(function (d) { return valueAccessor({ item: d }); })
        .sort(sort)
        .startAngle(startAngle)
        .endAngle(endAngle)(data);
    var slices = pieSlices.map(function (slice, index) { return (__assign(__assign({}, slice), { pieCentroid: arcs[index].centroid(slice), labelCentroid: label[index].centroid(slice) })); });
    var extraProps = {
        width: width,
        height: height,
        data: data,
        slices: slices,
    };
    return pointerEvents = { 'box-none':  };
    style = { style: style };
    testID = { testID: testID } >
        pointerEvents;
    {
        'box-none';
    }
    style = {};
    {
        flex: 1;
    }
};
onLayout = {}(event);
_onLayout(event);
 >
    { height: height } > 0 && width > 0 && pointerEvents;
{
    react_native_1.Platform.OS === "android" ? 'box-none' : 'none';
}
style = {};
{
    height, width;
}
 >
    x;
{
    width / 2;
}
y = { height: height } / 2;
 >
    { React: react_1.default, : .Children.map(children, function (child) {
            if (child && child.props.belowChart) {
                return react_1.default.cloneElement(child, extraProps);
            }
            return null;
        }) };
{
    pieSlices.map.apply(pieSlices, __spreadArray([function (slice, index) {
            var _a = data[index], key = _a.key, svg = _a.svg;
            return key;
            {
                key;
            }
            { }
        }], svg, false));
}
d = { arcs: arcs } /  > ;
{
    react_1.default.Children.map(children, function (child) {
        if (child && !child.props.belowChart) {
            return react_1.default.cloneElement(child, extraProps);
        }
        return null;
    });
}
/G>
    < /Svg>;
/View>
    < /View>;
;
;
exports.default = PieChart;
