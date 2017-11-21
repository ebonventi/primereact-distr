'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColorPicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = exports.ColorPicker = function (_Component) {
    _inherits(ColorPicker, _Component);

    function ColorPicker(props) {
        _classCallCheck(this, ColorPicker);

        var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, props));

        _this.selfClick = false;
        _this.colorDragging = false;
        _this.hueDragging = false;
        _this.defaultColor = 'ff0000';

        _this.state = { panelVisible: false };
        return _this;
    }

    _createClass(ColorPicker, [{
        key: 'onHueMousedown',
        value: function onHueMousedown(event) {
            if (this.props.disabled) {
                return;
            }

            this.bindDocumentMousemoveListener();
            this.bindDocumentMouseupListener();

            this.hueDragging = true;
            this.pickHue(event);
        }
    }, {
        key: 'pickHue',
        value: function pickHue(event) {
            var top = this.hueView.getBoundingClientRect().top + document.body.scrollTop;
            this.value = this.validateHSB({
                h: Math.floor(360 * (150 - Math.max(0, Math.min(150, event.pageY - top))) / 150),
                s: 100,
                b: 100
            });

            this.updateColorSelector();
            this.updateUI();
            this.updateModel();
        }
    }, {
        key: 'onColorMousedown',
        value: function onColorMousedown(event) {
            if (this.props.disabled) {
                return;
            }

            this.bindDocumentMousemoveListener();
            this.bindDocumentMouseupListener();

            this.colorDragging = true;
            this.pickColor(event);
        }
    }, {
        key: 'pickColor',
        value: function pickColor(event) {
            var rect = this.colorSelector.getBoundingClientRect();
            var top = rect.top + document.body.scrollTop;
            var left = rect.left + document.body.scrollLeft;
            var saturation = Math.floor(100 * Math.max(0, Math.min(150, event.pageX - left)) / 150);
            var brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, event.pageY - top))) / 150);
            this.value = this.validateHSB({
                h: this.value.h,
                s: saturation,
                b: brightness
            });

            this.updateUI();
            this.updateModel();
        }
    }, {
        key: 'updateModel',
        value: function updateModel() {
            switch (this.props.format) {
                case 'hex':
                    this.onModelChange(this.HSBtoHEX(this.value));
                    break;

                case 'rgb':
                    this.onModelChange(this.HSBtoRGB(this.value));
                    break;

                case 'hsb':
                    this.onModelChange(this.value);
                    break;

                default:
                    break;
            }
        }
    }, {
        key: 'writeValue',
        value: function writeValue(value) {
            if (value) {
                switch (this.props.format) {
                    case 'hex':
                        this.value = this.HEXtoHSB(value);
                        break;

                    case 'rgb':
                        this.value = this.RGBtoHSB(value);
                        break;

                    case 'hsb':
                        this.value = value;
                        break;

                    default:
                        break;
                }
            } else {
                this.value = this.HEXtoHSB(this.defaultColor);
            }

            this.updateColorSelector();
            this.updateUI();
        }
    }, {
        key: 'onModelChange',
        value: function onModelChange(value) {
            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: value
                });
            }
        }
    }, {
        key: 'updateColorSelector',
        value: function updateColorSelector() {
            this.colorSelector.style.backgroundColor = '#' + this.HSBtoHEX(this.value);
        }
    }, {
        key: 'updateUI',
        value: function updateUI() {
            this.colorHandle.style.left = Math.floor(150 * this.value.s / 100) + 'px';
            this.colorHandle.style.top = Math.floor(150 * (100 - this.value.b) / 100) + 'px';
            this.hueHandle.style.top = Math.floor(150 - 150 * this.value.h / 360) + 'px';

            if (this.input) {
                this.input.style.backgroundColor = '#' + this.HSBtoHEX(this.value);
            }
        }
    }, {
        key: 'show',
        value: function show() {
            var zIndex = _DomHandler2.default.getZindex() + 1;
            this.panel.style.zIndex = String(zIndex);
            this.setState({ panelVisible: true });
            this.shown = true;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({ panelVisible: false });
            this.unbindDocumentClickListener();
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            this.alignPanel();
            this.bindDocumentClickListener();
        }
    }, {
        key: 'alignPanel',
        value: function alignPanel() {
            if (this.appendTo) _DomHandler2.default.absolutePosition(this.panel, this.input);else _DomHandler2.default.relativePosition(this.panel, this.input);
        }
    }, {
        key: 'onInputClick',
        value: function onInputClick() {
            this.selfClick = true;
            this.togglePanel();
        }
    }, {
        key: 'togglePanel',
        value: function togglePanel() {
            if (!this.state.panelVisible) this.show();else this.hide();
        }
    }, {
        key: 'onInputKeydown',
        value: function onInputKeydown(event) {
            switch (event.which) {
                //space
                case 32:
                    this.togglePanel();
                    event.preventDefault();
                    break;

                //escape and tab
                case 27:
                case 9:
                    this.hide();
                    break;

                default:
                    break;
            }
        }
    }, {
        key: 'onPanelClick',
        value: function onPanelClick() {
            this.selfClick = true;
        }
    }, {
        key: 'bindDocumentClickListener',
        value: function bindDocumentClickListener() {
            if (!this.documentClickListener) {
                this.documentClickListener = this.docClickListener.bind(this);
                document.addEventListener('click', this.documentClickListener);
            }
        }
    }, {
        key: 'docClickListener',
        value: function docClickListener() {
            if (!this.selfClick) {
                this.setState({ panelVisible: false });
                this.unbindDocumentClickListener();
            }

            this.selfClick = false;
        }
    }, {
        key: 'unbindDocumentClickListener',
        value: function unbindDocumentClickListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        }
    }, {
        key: 'bindDocumentMousemoveListener',
        value: function bindDocumentMousemoveListener() {
            if (!this.documentMousemoveListener) {
                this.documentMousemoveListener = this.docMouseMoveListener.bind(this);
                document.addEventListener('mousemove', this.documentMousemoveListener);
            }
        }
    }, {
        key: 'docMouseMoveListener',
        value: function docMouseMoveListener() {
            if (this.colorDragging) {
                this.pickColor(event);
            }

            if (this.hueDragging) {
                this.pickHue(event);
            }
        }
    }, {
        key: 'unbindDocumentMousemoveListener',
        value: function unbindDocumentMousemoveListener() {
            if (this.documentMousemoveListener) {
                document.removeEventListener('mousemove', this.documentMousemoveListener);
                this.documentMousemoveListener = null;
            }
        }
    }, {
        key: 'bindDocumentMouseupListener',
        value: function bindDocumentMouseupListener() {
            if (!this.documentMouseupListener) {
                this.documentMouseupListener = this.docMouseUpListener.bind(this);
                document.addEventListener('mouseup', this.documentMouseupListener);
            }
        }
    }, {
        key: 'docMouseUpListener',
        value: function docMouseUpListener() {
            this.colorDragging = false;
            this.hueDragging = false;
            this.unbindDocumentMousemoveListener();
            this.unbindDocumentMouseupListener();
        }
    }, {
        key: 'unbindDocumentMouseupListener',
        value: function unbindDocumentMouseupListener() {
            if (this.documentMouseupListener) {
                document.removeEventListener('mouseup', this.documentMouseupListener);
                this.documentMouseupListener = null;
            }
        }
    }, {
        key: 'validateHSB',
        value: function validateHSB(hsb) {
            return {
                h: Math.min(360, Math.max(0, hsb.h)),
                s: Math.min(100, Math.max(0, hsb.s)),
                b: Math.min(100, Math.max(0, hsb.b))
            };
        }
    }, {
        key: 'validateRGB',
        value: function validateRGB(rgb) {
            return {
                r: Math.min(255, Math.max(0, rgb.r)),
                g: Math.min(255, Math.max(0, rgb.g)),
                b: Math.min(255, Math.max(0, rgb.b))
            };
        }
    }, {
        key: 'validateHEX',
        value: function validateHEX(hex) {
            var len = 6 - hex.length;
            if (len > 0) {
                var o = [];
                for (var i = 0; i < len; i++) {
                    o.push('0');
                }
                o.push(hex);
                hex = o.join('');
            }
            return hex;
        }
    }, {
        key: 'HEXtoRGB',
        value: function HEXtoRGB(hex) {
            var hexValue = parseInt(hex.indexOf('#') > -1 ? hex.substring(1) : hex, 16);
            return { r: hexValue >> 16, g: (hexValue & 0x00FF00) >> 8, b: hexValue & 0x0000FF };
        }
    }, {
        key: 'HEXtoHSB',
        value: function HEXtoHSB(hex) {
            return this.RGBtoHSB(this.HEXtoRGB(hex));
        }
    }, {
        key: 'RGBtoHSB',
        value: function RGBtoHSB(rgb) {
            var hsb = {
                h: 0,
                s: 0,
                b: 0
            };
            var min = Math.min(rgb.r, rgb.g, rgb.b);
            var max = Math.max(rgb.r, rgb.g, rgb.b);
            var delta = max - min;
            hsb.b = max;
            if (max !== 0) {}
            hsb.s = max !== 0 ? 255 * delta / max : 0;
            if (hsb.s !== 0) {
                if (rgb.r === max) {
                    hsb.h = (rgb.g - rgb.b) / delta;
                } else if (rgb.g === max) {
                    hsb.h = 2 + (rgb.b - rgb.r) / delta;
                } else {
                    hsb.h = 4 + (rgb.r - rgb.g) / delta;
                }
            } else {
                hsb.h = -1;
            }
            hsb.h *= 60;
            if (hsb.h < 0) {
                hsb.h += 360;
            }
            hsb.s *= 100 / 255;
            hsb.b *= 100 / 255;
            return hsb;
        }
    }, {
        key: 'HSBtoRGB',
        value: function HSBtoRGB(hsb) {
            var rgb = {
                r: null, g: null, b: null
            };
            var h = Math.round(hsb.h);
            var s = Math.round(hsb.s * 255 / 100);
            var v = Math.round(hsb.b * 255 / 100);
            if (s === 0) {
                rgb = {
                    r: v,
                    g: v,
                    b: v
                };
            } else {
                var t1 = v;
                var t2 = (255 - s) * v / 255;
                var t3 = (t1 - t2) * (h % 60) / 60;
                if (h === 360) h = 0;
                if (h < 60) {
                    rgb.r = t1;rgb.b = t2;rgb.g = t2 + t3;
                } else if (h < 120) {
                    rgb.g = t1;rgb.b = t2;rgb.r = t1 - t3;
                } else if (h < 180) {
                    rgb.g = t1;rgb.r = t2;rgb.b = t2 + t3;
                } else if (h < 240) {
                    rgb.b = t1;rgb.r = t2;rgb.g = t1 - t3;
                } else if (h < 300) {
                    rgb.b = t1;rgb.g = t2;rgb.r = t2 + t3;
                } else if (h < 360) {
                    rgb.r = t1;rgb.g = t2;rgb.b = t1 - t3;
                } else {
                    rgb.r = 0;rgb.g = 0;rgb.b = 0;
                }
            }
            return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
        }
    }, {
        key: 'RGBtoHEX',
        value: function RGBtoHEX(rgb) {
            var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];

            for (var key in hex) {
                if (hex[key].length === 1) {
                    hex[key] = '0' + hex[key];
                }
            }

            return hex.join('');
        }
    }, {
        key: 'HSBtoHEX',
        value: function HSBtoHEX(hsb) {
            return this.RGBtoHEX(this.HSBtoRGB(hsb));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.writeValue(this.props.value);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.shown) {
                this.onShow();
                this.shown = false;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentClickListener();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-colorpicker ui-widget', this.props.className, {
                'ui-colorpicker-overlay': !this.props.inline,
                'ui-colorpicker-dragging': this.colorDragging || this.hueDragging
            });

            if (!this.props.inline) {
                var inputClass = (0, _classnames2.default)('ui-colorpicker-preview ui-inputtext ui-state-default ui-corner-all', {
                    'ui-state-disabled': this.props.disabled
                }),
                    input = _react2.default.createElement('input', { ref: function ref(el) {
                        return _this2.input = _reactDom2.default.findDOMNode(el);
                    }, type: 'text', className: inputClass, readOnly: 'readonly', id: this.props.inputId, tabIndex: this.props.tabindex, disabled: this.props.disabled,
                    onClick: this.onInputClick.bind(this), onKeyDown: this.onInputKeydown.bind(this) });
            }

            var colorSelector = _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this2.colorSelector = _reactDom2.default.findDOMNode(el);
                    }, className: 'ui-colorpicker-color-selector', onMouseDown: this.onColorMousedown.bind(this) },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-colorpicker-color' },
                    _react2.default.createElement('div', { ref: function ref(el) {
                            return _this2.colorHandle = _reactDom2.default.findDOMNode(el);
                        }, className: 'ui-colorpicker-color-handle' })
                )
            ),
                hue = _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this2.hueView = _reactDom2.default.findDOMNode(el);
                    }, className: 'ui-colorpicker-hue', onMouseDown: this.onHueMousedown.bind(this) },
                _react2.default.createElement('div', { ref: function ref(el) {
                        return _this2.hueHandle = _reactDom2.default.findDOMNode(el);
                    }, className: 'ui-colorpicker-hue-handle' })
            );

            var panelClass = (0, _classnames2.default)('ui-colorpicker-panel ui-corner-all', {
                'ui-colorpicker-overlay-panel ui-shadow': !this.props.inline,
                'ui-state-disabled': this.props.disabled
            }),
                panel = _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this2.panel = _reactDom2.default.findDOMNode(el);
                    }, className: panelClass, onClick: this.onPanelClick.bind(this), style: { 'display': this.props.inline ? 'block' : this.state.panelVisible ? 'block' : 'none' } },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-colorpicker-content' },
                    colorSelector,
                    hue
                )
            );

            return _react2.default.createElement(
                'div',
                { id: this.props.id, style: this.props.style, className: className },
                input,
                panel
            );
        }
    }]);

    return ColorPicker;
}(_react.Component);

ColorPicker.defaultProps = {
    id: null,
    value: null,
    style: null,
    className: null,
    inline: false,
    format: "hex",
    appendTo: null,
    disabled: false,
    tabindex: null,
    inputId: null,
    onChange: null
};
ColorPicker.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    inline: _propTypes2.default.bool,
    format: _propTypes2.default.string,
    appendTo: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    tabindex: _propTypes2.default.string,
    inputId: _propTypes2.default.string,
    onChange: _propTypes2.default.func
};