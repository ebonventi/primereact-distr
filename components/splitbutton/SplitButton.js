'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SplitButton = exports.SplitButtonItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('../button/Button');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplitButtonItem = exports.SplitButtonItem = function (_Component) {
    _inherits(SplitButtonItem, _Component);

    function SplitButtonItem(props) {
        _classCallCheck(this, SplitButtonItem);

        var _this = _possibleConstructorReturn(this, (SplitButtonItem.__proto__ || Object.getPrototypeOf(SplitButtonItem)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(SplitButtonItem, [{
        key: 'onClick',
        value: function onClick(e) {
            if (this.props.menuitem.command) {
                this.props.menuitem.command({ originalEvent: e, item: this.props.menuitem });
            }
            e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-menuitem-link ui-corner-all', { 'ui-state-disabled': this.props.menuitem.disabled });
            var icon = this.props.menuitem.icon ? _react2.default.createElement('span', { className: (0, _classnames2.default)('ui-menuitem-icon fa fa-fw', this.props.menuitem.icon) }) : null;
            var label = _react2.default.createElement(
                'span',
                { className: 'ui-menuitem-text' },
                this.props.menuitem.label
            );

            return _react2.default.createElement(
                'li',
                { className: 'ui-menuitem ui-widget ui-corner-all', role: 'menuitem' },
                _react2.default.createElement(
                    'a',
                    { href: this.props.menuitem.url || '#', className: className, target: this.props.menuitem.target, onClick: this.onClick },
                    icon,
                    label
                )
            );
        }
    }]);

    return SplitButtonItem;
}(_react.Component);

SplitButtonItem.defaultProps = {
    menuitem: null
};
SplitButtonItem.propsTypes = {
    menuitem: _propTypes2.default.any
};

var SplitButton = exports.SplitButton = function (_Component2) {
    _inherits(SplitButton, _Component2);

    function SplitButton(props) {
        _classCallCheck(this, SplitButton);

        var _this2 = _possibleConstructorReturn(this, (SplitButton.__proto__ || Object.getPrototypeOf(SplitButton)).call(this, props));

        _this2.onDropdownButtonClick = _this2.onDropdownButtonClick.bind(_this2);
        return _this2;
    }

    _createClass(SplitButton, [{
        key: 'onDropdownButtonClick',
        value: function onDropdownButtonClick(event) {
            if (this.documentClickListener) {
                this.dropdownClick = true;
            }

            if (this.panelEl.offsetParent) this.hide();else this.show();
        }
    }, {
        key: 'show',
        value: function show() {
            this.panelEl.style.zIndex = _DomHandler2.default.getZindex();
            _DomHandler2.default.relativePosition(this.panelEl, this.containerEl);
            _DomHandler2.default.fadeIn(this.panelEl, 250);
            this.panelEl.style.display = 'block';
            this.bindDocumentListener();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.panelEl.style.display = 'none';
            this.unbindDocumentListener();
        }
    }, {
        key: 'bindDocumentListener',
        value: function bindDocumentListener() {
            var _this3 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function () {
                    if (_this3.dropdownClick) _this3.dropdownClick = false;else _this3.hide();
                };

                document.addEventListener('click', this.documentClickListener);
            }
        }
    }, {
        key: 'unbindDocumentListener',
        value: function unbindDocumentListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentListener();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var className = (0, _classnames2.default)('ui-splitbutton ui-buttonset ui-widget', this.props.className, { 'ui-state-disabled': this.props.disabled });
            var menuClassName = (0, _classnames2.default)('ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow', this.props.menuClassName);

            if (this.props.model) {
                var items = this.props.model.map(function (menuitem, index) {
                    return _react2.default.createElement(SplitButtonItem, { menuitem: menuitem, key: index });
                });
            }

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                        _this4.containerEl = el;
                    } },
                _react2.default.createElement(_Button.Button, { type: 'button', icon: this.props.icon, label: this.props.label, onClick: this.props.onClick, disabled: this.props.disabled, cornerStyleClass: 'ui-corner-left', tabIndex: this.props.tabIndex }),
                _react2.default.createElement(_Button.Button, { type: 'button', className: 'ui-splitbutton-menubutton', icon: 'fa-caret-down', onClick: this.onDropdownButtonClick, disabled: this.props.disabled, cornerStyleClass: 'ui-corner-right' }),
                _react2.default.createElement(
                    'div',
                    { className: menuClassName, style: this.props.menuStyle, ref: function ref(el) {
                            _this4.panelEl = el;
                        } },
                    _react2.default.createElement(
                        'ul',
                        { className: 'ui-menu-list ui-helper-reset' },
                        items
                    )
                )
            );
        }
    }]);

    return SplitButton;
}(_react.Component);

SplitButton.defaultProps = {
    id: null,
    label: null,
    icon: null,
    model: null,
    disabled: null,
    style: null,
    className: null,
    menuStyle: null,
    menuClassName: null,
    tabIndex: null,
    onClick: null
};
SplitButton.propsTypes = {
    id: _propTypes2.default.string,
    label: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    model: _propTypes2.default.array,
    disabled: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    menustyle: _propTypes2.default.object,
    menuClassName: _propTypes2.default.string,
    tabIndex: _propTypes2.default.string,
    onClick: _propTypes2.default.func
};