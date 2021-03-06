'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutoComplete = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _InputText = require('../inputtext/InputText');

var _Button = require('../button/Button');

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoComplete = exports.AutoComplete = function (_Component) {
    _inherits(AutoComplete, _Component);

    function AutoComplete(props) {
        _classCallCheck(this, AutoComplete);

        var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this, props));

        _this.onInputChange = _this.onInputChange.bind(_this);
        _this.onInputFocus = _this.onInputFocus.bind(_this);
        _this.onInputBlur = _this.onInputBlur.bind(_this);
        _this.onInputClick = _this.onInputClick.bind(_this);
        _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
        _this.onDropdownClick = _this.onDropdownClick.bind(_this);
        _this.onMultiContainerClick = _this.onMultiContainerClick.bind(_this);
        _this.onMultiInputFocus = _this.onMultiInputFocus.bind(_this);
        _this.onMultiInputBlur = _this.onMultiInputBlur.bind(_this);
        return _this;
    }

    _createClass(AutoComplete, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            if (this.manualModelChange) {
                this.manualModelChange = false;
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'onInputChange',
        value: function onInputChange(event) {
            var _this2 = this;

            //Cancel the search request if user types within the timeout
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            var query = event.target.value.trim();
            if (!this.props.multiple) {
                this.manualModelChange = true;
                this.updateModel(event, query);
            }

            if (query.length === 0) {
                this.hidePanel();
                if (this.props.onClear) {
                    this.props.onClear(event);
                }
            } else {
                if (query.length >= this.props.minLength) {
                    this.timeout = setTimeout(function () {
                        _this2.search(event, query);
                    }, this.props.delay);
                } else {
                    this.hidePanel();
                }
            }
        }
    }, {
        key: 'onInputClick',
        value: function onInputClick(event) {
            if (this.documentClickListener) {
                this.inputClick = true;
            }

            if (this.props.onClick) {
                this.props.onClick(event);
            }
        }
    }, {
        key: 'search',
        value: function search(event, query) {
            //allow empty string but not undefined or null
            if (query === undefined || query === null) {
                return;
            }

            if (this.props.completeMethod) {
                this.props.completeMethod({
                    originalEvent: event,
                    query: query
                });
            }
        }
    }, {
        key: 'selectItem',
        value: function selectItem(event, option) {
            if (this.props.multiple) {
                this.inputEl.value = '';
                if (!this.isSelected(option)) {
                    var newValue = this.props.value ? [].concat(_toConsumableArray(this.props.value), [option]) : [option];
                    this.updateModel(event, newValue);
                }
            } else {
                this.inputEl.value = this.props.field ? _ObjectUtils2.default.resolveFieldData(option, this.props.field) : option;
                this.updateModel(event, option);
            }

            if (this.props.onSelect) {
                this.props.onSelect({
                    originalEvent: event,
                    value: option
                });
            }

            this.inputEl.focus();
        }
    }, {
        key: 'updateModel',
        value: function updateModel(event, value) {
            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: value
                });
            }
        }
    }, {
        key: 'showPanel',
        value: function showPanel() {
            if (this.focus) {
                this.alignPanel();

                if (!this.panel.offsetParent) {
                    this.panel.style.zIndex = _DomHandler2.default.getZindex();
                    this.panel.style.display = "block";
                    _DomHandler2.default.fadeIn(this.panel, 200);
                    this.bindDocumentClickListener();
                }
            }
        }
    }, {
        key: 'alignPanel',
        value: function alignPanel() {
            var target = this.props.multiple ? this.multiContainer : this.inputEl;

            if (this.props.appendTo) _DomHandler2.default.absolutePosition(this.panel, target);else _DomHandler2.default.relativePosition(this.panel, target);
        }
    }, {
        key: 'hidePanel',
        value: function hidePanel() {
            this.panel.style.display = 'none';
            this.unbindDocumentClickListener();
        }
    }, {
        key: 'onDropdownClick',
        value: function onDropdownClick(event) {
            this.inputEl.focus();
            this.dropdownClick = true;

            if (this.props.dropdownMode === 'blank') this.search(event, '');else if (this.props.dropdownMode === 'current') this.search(event, this.inputEl.value);

            if (this.props.onDropdownClick) {
                this.props.onDropdownClick({
                    originalEvent: event,
                    query: this.inputEl.value
                });
            }
        }
    }, {
        key: 'removeItem',
        value: function removeItem(event, index) {
            var removedValue = this.props.value[index];
            var newValue = this.props.value.filter(function (val, i) {
                return index !== i;
            });
            this.updateModel(event, newValue);

            if (this.props.onUnselect) {
                this.props.onUnselect({
                    originalEvent: event,
                    value: removedValue
                });
            }
        }
    }, {
        key: 'onInputKeyDown',
        value: function onInputKeyDown(event) {
            if (this.isPanelVisible()) {
                var highlightItem = _DomHandler2.default.findSingle(this.panel, 'li.ui-state-highlight');

                switch (event.which) {
                    //down
                    case 40:
                        if (highlightItem) {
                            var nextElement = highlightItem.nextElementSibling;
                            if (nextElement) {
                                _DomHandler2.default.addClass(nextElement, 'ui-state-highlight');
                                _DomHandler2.default.removeClass(highlightItem, 'ui-state-highlight');
                                _DomHandler2.default.scrollInView(this.panel, nextElement);
                            }
                        } else {
                            _DomHandler2.default.addClass(this.panel.firstChild.firstChild, 'ui-state-highlight');
                        }

                        event.preventDefault();
                        break;

                    //up
                    case 38:
                        if (highlightItem) {
                            var previousElement = highlightItem.previousElementSibling;
                            if (previousElement) {
                                _DomHandler2.default.addClass(previousElement, 'ui-state-highlight');
                                _DomHandler2.default.removeClass(highlightItem, 'ui-state-highlight');
                                _DomHandler2.default.scrollInView(this.panel, previousElement);
                            }
                        }

                        event.preventDefault();
                        break;

                    //enter,tab
                    case 13:
                        if (highlightItem) {
                            this.selectItem(event, this.props.suggestions[_DomHandler2.default.index(highlightItem)]);
                            this.hidePanel();
                        }

                        event.preventDefault();
                        break;

                    //escape
                    case 27:
                        this.hidePanel();
                        event.preventDefault();
                        break;

                    //tab
                    case 9:
                        if (highlightItem) {
                            this.selectItem(event, this.props.suggestions[_DomHandler2.default.index(highlightItem)]);
                        }

                        this.hidePanel();
                        break;

                    default:
                        break;
                }
            }

            if (this.props.multiple) {
                switch (event.which) {
                    //backspace
                    case 8:
                        if (this.props.value && this.props.value.length && !this.inputEl.value) {
                            var removedValue = this.props.value[this.props.value.length - 1];
                            var newValue = this.props.value.slice(0, -1);

                            if (this.props.onUnselect) {
                                this.props.onUnselect({
                                    originalEvent: event,
                                    value: removedValue
                                });
                            }

                            this.updateModel(event, newValue);
                        }
                        break;

                    default:
                        break;
                }
            }
        }
    }, {
        key: 'onInputFocus',
        value: function onInputFocus(event) {
            this.focus = true;

            if (this.props.onFocus) {
                this.props.onFocus(event);
            }
        }
    }, {
        key: 'onInputBlur',
        value: function onInputBlur(event) {
            this.focus = false;

            if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }
    }, {
        key: 'onMultiContainerClick',
        value: function onMultiContainerClick(event) {
            this.inputEl.focus();
            if (this.documentClickListener) {
                this.inputClick = true;
            }

            if (this.props.onClick) {
                this.props.onClick(event);
            }
        }
    }, {
        key: 'onMultiInputFocus',
        value: function onMultiInputFocus(event) {
            this.onInputFocus(event);
            _DomHandler2.default.addClass(this.multiContainer, 'ui-state-focus');
        }
    }, {
        key: 'onMultiInputBlur',
        value: function onMultiInputBlur(event) {
            this.onInputBlur(event);
            _DomHandler2.default.removeClass(this.multiContainer, 'ui-state-focus');
        }
    }, {
        key: 'isSelected',
        value: function isSelected(val) {
            var selected = false;
            if (this.props.value && this.props.value.length) {
                for (var i = 0; i < this.props.value.length; i++) {
                    if (_ObjectUtils2.default.equals(this.props.value[i], val)) {
                        selected = true;
                        break;
                    }
                }
            }

            return selected;
        }
    }, {
        key: 'findOptionIndex',
        value: function findOptionIndex(option) {
            var index = -1;
            if (this.suggestions) {
                for (var i = 0; i < this.suggestions.length; i++) {
                    if (_ObjectUtils2.default.equals(option, this.suggestions[i])) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.appendTo) {
                if (this.props.appendTo === 'body') document.body.appendChild(this.panel);else _DomHandler2.default.appendChild(this.panel, this.props.appendTo);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.suggestions && this.props.suggestions.length) {
                this.showPanel();
            } else {
                this.hidePanel();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentClickListener();
        }
    }, {
        key: 'renderSimpleAutoComplete',
        value: function renderSimpleAutoComplete() {
            var _this3 = this;

            var inputClassName = (0, _classnames2.default)('ui-autocomplete-input', this.props.inputClassName, {
                'ui-autocomplete-dd-input': this.props.dropdown
            });

            return _react2.default.createElement(_InputText.InputText, { ref: function ref(el) {
                    return _this3.inputEl = _reactDom2.default.findDOMNode(el);
                }, type: 'text', className: inputClassName, style: this.props.inputStyle, autoComplete: 'off',
                readOnly: this.props.readonly, disabled: this.props.disabled, placeholder: this.props.placeholder, size: this.props.size,
                maxLength: this.props.maxlength, tabIndex: this.props.tabindex,
                onBlur: this.onInputBlur, onFocus: this.onInputFocus, onChange: this.onInputChange,
                onMouseDown: this.props.onMouseDown, onKeyUp: this.props.onKeyUp, onKeyDown: this.onInputKeyDown,
                onKeyPress: this.props.onKeyPress, onContextMenu: this.props.onContextMenu,
                onClick: this.onInputClick, onDoubleClick: this.props.onDblClick });
        }
    }, {
        key: 'renderChips',
        value: function renderChips() {
            var _this4 = this;

            if (this.props.value && this.props.value.length) {
                return this.props.value.map(function (val, index) {
                    var tokenContent = _this4.props.selectedItemTemplate ? _this4.props.selectedItemTemplate(val) : _react2.default.createElement(
                        'span',
                        { className: 'ui-autocomplete-token-label' },
                        _this4.props.field ? _ObjectUtils2.default.resolveFieldData(val, _this4.props.field) : val
                    );

                    return _react2.default.createElement(
                        'li',
                        { key: index + 'multi-item', className: 'ui-autocomplete-token ui-state-highlight ui-corner-all' },
                        _react2.default.createElement('span', { className: 'ui-autocomplete-token-icon fa fa-fw fa-close', onClick: function onClick(e) {
                                return _this4.removeItem(e, index);
                            } }),
                        tokenContent
                    );
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'renderMultiInput',
        value: function renderMultiInput() {
            var _this5 = this;

            return _react2.default.createElement(
                'li',
                { className: 'ui-autocomplete-input-token' },
                _react2.default.createElement('input', { ref: function ref(el) {
                        _this5.inputEl = _reactDom2.default.findDOMNode(el);
                    }, type: 'text', disabled: this.props.disabled, placeholder: this.props.placeholder,
                    autoComplete: 'off', tabIndex: this.props.tabindex, onChange: this.onInputChange,
                    onKeyUp: this.props.onKeyUp, onKeyDown: this.onInputKeyDown, onKeyPress: this.props.onKeyPress,
                    onFocus: this.onMultiInputFocus, onBlur: this.onMultiInputBlur })
            );
        }
    }, {
        key: 'renderMultipleAutoComplete',
        value: function renderMultipleAutoComplete() {
            var _this6 = this;

            var multiContainerClass = (0, _classnames2.default)("ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all", {
                'ui-state-disabled': this.props.disabled
            });
            var tokens = this.renderChips();
            var input = this.renderMultiInput();

            return _react2.default.createElement(
                'ul',
                { ref: function ref(el) {
                        _this6.multiContainer = el;
                    }, className: multiContainerClass, onContextMenu: this.props.onContextMenu, onMouseDown: this.props.onMouseDown,
                    onClick: this.onMultiContainerClick, onDoubleClick: this.props.onDblClick },
                tokens,
                input
            );
        }
    }, {
        key: 'renderDropdown',
        value: function renderDropdown() {
            return _react2.default.createElement(_Button.Button, { type: 'button', icon: 'fa-fw fa-caret-down', className: 'ui-autocomplete-dropdown', disabled: this.props.disabled, onClick: this.onDropdownClick });
        }
    }, {
        key: 'renderPanel',
        value: function renderPanel() {
            var _this7 = this;

            var items = void 0;

            if (this.props.suggestions) {
                items = this.props.suggestions.map(function (suggestion, index) {
                    var itemContent = _this7.props.itemTemplate ? _this7.props.itemTemplate(suggestion) : _this7.props.field ? _ObjectUtils2.default.resolveFieldData(suggestion, _this7.props.field) : suggestion;

                    return _react2.default.createElement(
                        'li',
                        { key: index + '_item', className: 'ui-autocomplete-list-item ui-corner-all', onClick: function onClick(e) {
                                return _this7.selectItem(e, suggestion);
                            } },
                        itemContent
                    );
                });
            }

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this7.panel = el;
                    }, className: 'ui-autocomplete-panel ui-widget-content ui-corner-all ui-shadow', style: { maxHeight: this.props.scrollHeight } },
                _react2.default.createElement(
                    'ul',
                    { className: 'ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset' },
                    items
                )
            );
        }
    }, {
        key: 'bindDocumentClickListener',
        value: function bindDocumentClickListener() {
            var _this8 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function (event) {
                    if (event.which === 3) {
                        return;
                    }

                    if (!_this8.inputClick && !_this8.dropdownClick) {
                        _this8.hidePanel();
                    }

                    _this8.inputClick = false;
                    _this8.dropdownClick = false;
                };

                document.addEventListener('click', this.documentClickListener);
            }
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
        key: 'isPanelVisible',
        value: function isPanelVisible() {
            return this.panel.offsetParent != null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var input = void 0,
                dropdown = void 0;
            var panel = this.renderPanel();
            var className = (0, _classnames2.default)('ui-autocomplete ui-widget', this.props.className, {
                'ui-autocomplete-dd': this.props.dropdown,
                'ui-autocomplete-multiple': this.props.multiple
            });

            if (this.props.multiple) input = this.renderMultipleAutoComplete();else input = this.renderSimpleAutoComplete();

            if (this.props.dropdown) {
                dropdown = this.renderDropdown();
            }

            return _react2.default.createElement(
                'span',
                { ref: function ref(el) {
                        return _this9.container = el;
                    }, id: this.props.id, style: this.props.style, className: className },
                input,
                dropdown,
                panel
            );
        }
    }]);

    return AutoComplete;
}(_react.Component);

AutoComplete.defaultProps = {
    id: null,
    value: null,
    suggestions: null,
    field: null,
    scrollHeight: '200px',
    dropdown: false,
    dropdownMode: 'blank',
    multiple: false,
    minLength: 1,
    delay: 300,
    style: null,
    className: null,
    inputStyle: null,
    inputClassName: null,
    placeholder: null,
    readonly: false,
    disabled: false,
    maxlength: null,
    size: null,
    appendTo: null,
    tabindex: null,
    completeMethod: null,
    itemTemplate: null,
    selectedItemTemplate: null,
    onChange: null,
    onFocus: null,
    onBlur: null,
    onSelect: null,
    onUnselect: null,
    onDropdownClick: null,
    onClick: null,
    onDblClick: null,
    onMouseDown: null,
    onKeyUp: null,
    onKeyPress: null,
    onContextMenu: null,
    onClear: null
};
AutoComplete.propTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    suggestions: _propTypes2.default.array,
    field: _propTypes2.default.string,
    scrollHeight: _propTypes2.default.string,
    dropdown: _propTypes2.default.bool,
    dropdownMode: _propTypes2.default.string,
    multiple: _propTypes2.default.bool,
    minLength: _propTypes2.default.number,
    delay: _propTypes2.default.number,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    inputStyle: _propTypes2.default.object,
    inputClassName: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    readonly: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    maxlength: _propTypes2.default.number,
    size: _propTypes2.default.number,
    appendTo: _propTypes2.default.any,
    tabindex: _propTypes2.default.number,
    completeMethod: _propTypes2.default.func,
    itemTemplate: _propTypes2.default.func,
    selectedItemTemplate: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onUnselect: _propTypes2.default.func,
    onDropdownClick: _propTypes2.default.func,
    onClick: _propTypes2.default.func,
    onDblClick: _propTypes2.default.func,
    onMouseDown: _propTypes2.default.func,
    onKeyUp: _propTypes2.default.func,
    onKeyPress: _propTypes2.default.func,
    onContextMenu: _propTypes2.default.func,
    onClear: _propTypes2.default.func
};