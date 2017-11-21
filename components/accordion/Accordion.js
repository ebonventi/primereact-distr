'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Accordion = exports.AccordionTab = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccordionTab = exports.AccordionTab = function (_Component) {
    _inherits(AccordionTab, _Component);

    function AccordionTab() {
        _classCallCheck(this, AccordionTab);

        return _possibleConstructorReturn(this, (AccordionTab.__proto__ || Object.getPrototypeOf(AccordionTab)).apply(this, arguments));
    }

    return AccordionTab;
}(_react.Component);

AccordionTab.defaultProps = {
    header: null,
    disabled: false,
    headerStyle: null,
    headerClassName: null,
    contentStyle: null,
    contentClassName: null
};
AccordionTab.propTypes = {
    header: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    headerStyle: _propTypes2.default.object,
    headerClassName: _propTypes2.default.string,
    contentStyle: _propTypes2.default.object,
    contentClassName: _propTypes2.default.string
};

var Accordion = exports.Accordion = function (_Component2) {
    _inherits(Accordion, _Component2);

    function Accordion(props) {
        _classCallCheck(this, Accordion);

        var _this2 = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, props));

        _this2.state = {
            activeIndex: props.activeIndex
        };
        return _this2;
    }

    _createClass(Accordion, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                activeIndex: nextProps.activeIndex
            });
        }
    }, {
        key: 'onTabClick',
        value: function onTabClick(event, tab, i) {
            if (!tab.props.disabled) {
                var selected = this.isSelected(i);

                if (this.props.multiple) {
                    var indexes = this.state.activeIndex || [];
                    if (selected) indexes = indexes.filter(function (index) {
                        return index !== i;
                    });else indexes = [].concat(_toConsumableArray(indexes), [i]);

                    this.setState({ activeIndex: indexes });
                } else {
                    if (selected) this.setState({ activeIndex: null });else this.setState({ activeIndex: i });
                }

                var callback = selected ? this.props.onTabOpen : this.props.onTabClose;
                if (callback) {
                    callback({ originalEvent: event, index: i });
                }
            }

            event.preventDefault();
        }
    }, {
        key: 'isSelected',
        value: function isSelected(i) {
            return this.props.multiple ? this.state.activeIndex && this.state.activeIndex.indexOf(i) !== -1 : this.state.activeIndex === i;
        }
    }, {
        key: 'renderTabHeader',
        value: function renderTabHeader(tab, selected, index) {
            var _this3 = this;

            var tabHeaderClass = (0, _classnames2.default)(tab.props.headerClassName, 'ui-accordion-header ui-state-default ui-corner-all', { 'ui-state-active': selected, 'ui-state-disabled': tab.props.disabled });

            return _react2.default.createElement(
                'div',
                { className: tabHeaderClass, style: tab.props.headerStyle, onClick: function onClick(event) {
                        return _this3.onTabClick(event, tab, index);
                    } },
                _react2.default.createElement('span', { className: (0, _classnames2.default)('fa fa-fw', { 'fa-caret-right': !selected, 'fa-caret-down': selected }) }),
                _react2.default.createElement(
                    'a',
                    { href: '#' },
                    tab.props.header
                )
            );
        }
    }, {
        key: 'renderTabContent',
        value: function renderTabContent(tab, selected) {
            var tabContentWrapperClass = (0, _classnames2.default)(tab.props.contentClassName, 'ui-accordion-content-wrapper', { 'ui-helper-hidden': !selected });

            return _react2.default.createElement(
                'div',
                { className: tabContentWrapperClass, style: tab.props.contentStyle },
                _react2.default.createElement(
                    'div',
                    { className: 'ui-accordion-content ui-widget-content' },
                    tab.props.children
                )
            );
        }
    }, {
        key: 'renderTab',
        value: function renderTab(tab, index) {
            var selected = this.isSelected(index);
            var tabHeader = this.renderTabHeader(tab, selected, index);
            var tabContent = this.renderTabContent(tab, selected);

            return _react2.default.createElement(
                'div',
                { key: tab.props.header, className: 'ui-accordion-tab' },
                tabHeader,
                tabContent
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var tabs = _react2.default.Children.map(this.props.children, function (tab, index) {
                return _this4.renderTab(tab, index);
            });
            var className = (0, _classnames2.default)('ui-accordion ui-widget ui-helper-reset', this.props.className);

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                tabs
            );
        }
    }]);

    return Accordion;
}(_react.Component);

Accordion.defaultProps = {
    id: null,
    activeIndex: null,
    className: null,
    style: null,
    multiple: false,
    onTabOpen: null,
    onTabClose: null
};
Accordion.propTypes = {
    id: _propTypes2.default.string,
    activeIndex: _propTypes2.default.any,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    multiple: _propTypes2.default.bool,
    onTabOpen: _propTypes2.default.func,
    onTabClose: _propTypes2.default.func
};