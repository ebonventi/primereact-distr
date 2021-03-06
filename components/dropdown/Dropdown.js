'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DomHandler = require('../utils/DomHandler');

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _ObjectUtils = require('../utils/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownItem = require('./DropdownItem');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = exports.Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this.state = {
            filter: ''
        };

        _this.onClick = _this.onClick.bind(_this);
        _this.onInputFocus = _this.onInputFocus.bind(_this);
        _this.onInputBlur = _this.onInputBlur.bind(_this);
        _this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
        _this.onEditableInputClick = _this.onEditableInputClick.bind(_this);
        _this.onEditableInputChange = _this.onEditableInputChange.bind(_this);
        _this.onEditableInputFocus = _this.onEditableInputFocus.bind(_this);
        _this.onOptionClick = _this.onOptionClick.bind(_this);
        _this.onFilterInputChange = _this.onFilterInputChange.bind(_this);
        _this.onFilterInputKeyDown = _this.onFilterInputKeyDown.bind(_this);
        _this.panelClick = _this.panelClick.bind(_this);
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'onClick',
        value: function onClick(event) {
            var _this2 = this;

            if (this.props.disabled) {
                return;
            }

            if (this.documentClickListener) {
                this.selfClick = true;
            }

            if (!this.overlayClick && !this.editableInputClick) {
                this.focusInput.focus();

                if (this.panel.offsetParent) {
                    this.hide();
                } else {
                    this.show();

                    if (this.props.filter) {
                        setTimeout(function () {
                            _this2.filterInput.focus();
                        }, 200);
                    }
                }
            }

            if (this.editableInputClick) {
                this.expeditableInputClick = false;
            }
        }
    }, {
        key: 'panelClick',
        value: function panelClick() {
            this.overlayClick = true;
        }
    }, {
        key: 'onInputFocus',
        value: function onInputFocus(event) {
            _DomHandler2.default.addClass(this.container, 'ui-state-focus');
        }
    }, {
        key: 'onInputBlur',
        value: function onInputBlur(event) {
            _DomHandler2.default.removeClass(this.container, 'ui-state-focus');
        }
    }, {
        key: 'onInputKeyDown',
        value: function onInputKeyDown(event) {
            var selectedItemIndex = this.findOptionIndex(this.props.value);

            switch (event.which) {
                //down
                case 40:
                    if (!this.panel.offsetParent && event.altKey) {
                        this.show();
                    } else {
                        if (selectedItemIndex !== -1) {
                            var nextItemIndex = selectedItemIndex + 1;
                            if (nextItemIndex !== this.props.options.length) {
                                this.selectItem({
                                    originalEvent: event,
                                    option: this.props.options[nextItemIndex]
                                });
                            }
                        } else if (this.optionsToDisplay) {
                            this.selectItem({
                                originalEvent: event,
                                option: this.props.options[0]
                            });
                        }
                    }

                    event.preventDefault();
                    break;

                //up
                case 38:
                    if (selectedItemIndex > 0) {
                        var prevItemIndex = selectedItemIndex - 1;
                        this.selectItem({
                            originalEvent: event,
                            option: this.props.options[prevItemIndex]
                        });
                    }

                    event.preventDefault();
                    break;

                //space
                case 32:
                    if (!this.panel.offsetParent) {
                        this.show();
                        event.preventDefault();
                    }
                    break;

                //enter
                case 13:
                    this.hide();
                    this.unbindDocumentClickListener();
                    event.preventDefault();
                    break;

                //escape and tab
                case 27:
                case 9:
                    this.hide();
                    this.unbindDocumentClickListener();
                    break;

                default:
                    break;

            }
        }
    }, {
        key: 'onEditableInputClick',
        value: function onEditableInputClick(event) {
            this.editableInputClick = true;
            this.bindDocumentClickListener();
        }
    }, {
        key: 'onEditableInputChange',
        value: function onEditableInputChange(event) {
            this.props.onChange({
                originalEvent: event.originalEvent,
                value: event.target.value
            });
        }
    }, {
        key: 'onEditableInputFocus',
        value: function onEditableInputFocus(event) {
            _DomHandler2.default.addClass(this.container, 'ui-state-focus');
            this.hide();
        }
    }, {
        key: 'onOptionClick',
        value: function onOptionClick(event) {
            this.selectItem(event);
            this.focusInput.focus();
            this.hide();
            event.originalEvent.stopPropagation();
        }
    }, {
        key: 'onFilterInputChange',
        value: function onFilterInputChange(event) {
            this.setState({ filter: event.target.value });
        }
    }, {
        key: 'onFilterInputKeyDown',
        value: function onFilterInputKeyDown(event) {
            if (event.which === 13) {
                event.preventDefault();
            }
        }
    }, {
        key: 'selectItem',
        value: function selectItem(event) {
            var selectedOption = this.findOption(this.props.value);

            if (selectedOption !== event.option) {
                this.updateEditableLabel(event.option);
                this.props.onChange({
                    originalEvent: event.originalEvent,
                    value: this.props.optionLabel ? event.option : event.option.value
                });
            }
        }
    }, {
        key: 'findOptionIndex',
        value: function findOptionIndex(value) {
            var index = -1;
            if (this.props.options) {
                for (var i = 0; i < this.props.options.length; i++) {
                    var optionValue = this.props.optionLabel ? this.props.options[i] : this.props.options[i].value;
                    if (value === null && optionValue == null || _ObjectUtils2.default.equals(value, optionValue, this.props.dataKey)) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        }
    }, {
        key: 'findOption',
        value: function findOption(value) {
            var index = this.findOptionIndex(value);
            return index !== -1 ? this.props.options[index] : null;
        }
    }, {
        key: 'show',
        value: function show() {
            this.panel.style.zIndex = _DomHandler2.default.getZindex() + 1;
            this.panel.style.display = 'block';
            this.alignPanel();
            _DomHandler2.default.fadeIn(this.panel, 250);
            this.bindDocumentClickListener();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.panel.style.display = 'none';
            this.unbindDocumentClickListener();
            this.clearClickState();
        }
    }, {
        key: 'alignPanel',
        value: function alignPanel() {
            if (this.props.appendTo) _DomHandler2.default.absolutePosition(this.panel, this.container);else _DomHandler2.default.relativePosition(this.panel, this.container);
        }
    }, {
        key: 'bindDocumentClickListener',
        value: function bindDocumentClickListener() {
            var _this3 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function () {
                    if (!_this3.selfClick && !_this3.overlayClick) {
                        _this3.hide();
                    }

                    _this3.clearClickState();
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
        key: 'clearClickState',
        value: function clearClickState() {
            this.selfClick = false;
            this.editableInputClick = false;
            this.overlayClick = false;
        }
    }, {
        key: 'updateEditableLabel',
        value: function updateEditableLabel(option) {
            if (this.editableInput) {
                this.editableInput.value = option ? this.getOptionLabel(option) : this.props.value || '';
            }
        }
    }, {
        key: 'filter',
        value: function filter(option) {
            var filterValue = this.state.filter.trim().toLowerCase();
            var optionLabel = this.getOptionLabel(option);

            return optionLabel.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
        }
    }, {
        key: 'hasFilter',
        value: function hasFilter() {
            return this.state.filter && this.state.filter.trim().length > 0;
        }
    }, {
        key: 'renderHiddenSelect',
        value: function renderHiddenSelect() {
            var _this4 = this;

            if (this.props.autoWidth) {
                var options = this.props.options && this.props.options.map(function (option, i) {
                    return _react2.default.createElement(
                        'option',
                        { key: _this4.getOptionLabel(option), value: option.value },
                        _this4.getOptionLabel(option)
                    );
                });

                return _react2.default.createElement(
                    'div',
                    { className: 'ui-helper-hidden-accessible' },
                    _react2.default.createElement(
                        'select',
                        { ref: function ref(el) {
                                return _this4.nativeSelect = el;
                            }, required: this.props.required, tabIndex: '-1', 'aria-hidden': 'true' },
                        options
                    )
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'renderKeyboardHelper',
        value: function renderKeyboardHelper() {
            var _this5 = this;

            return _react2.default.createElement(
                'div',
                { className: 'ui-helper-hidden-accessible' },
                _react2.default.createElement('input', { ref: function ref(el) {
                        return _this5.focusInput = el;
                    }, id: this.props.inputId, type: 'text', role: 'listbox',
                    onFocus: this.onInputFocus, onBlur: this.onInputBlur, onKeyDown: this.onInputKeyDown,
                    disabled: this.props.disabled, tabIndex: this.props.tabIndex, autoFocus: this.props.autoFocus })
            );
        }
    }, {
        key: 'renderLabel',
        value: function renderLabel(label) {
            var _this6 = this;

            if (this.props.editable) {
                var value = label || this.props.value || '';

                return _react2.default.createElement('input', { ref: function ref(el) {
                        return _this6.editableInput = el;
                    }, type: 'text', defaultValue: value, className: 'ui-dropdown-label ui-inputtext ui-corner-all', disabled: this.props.disabled, placeholder: this.props.placeholder,
                    onClick: this.onEditableInputClick, onInput: this.onEditableInputChange, onFocus: this.onEditableInputFocus, onBlur: this.onInputBlur });
            } else {
                var className = (0, _classnames2.default)('ui-dropdown-label ui-inputtext ui-corner-all', {
                    'ui-placeholder': label === null && this.props.placeholder,
                    'ui-dropdown-label-empty': label === null && !this.props.placeholder });

                return _react2.default.createElement(
                    'label',
                    { className: className },
                    label || this.props.placeholder || 'empty'
                );
            }
        }
    }, {
        key: 'renderDropdownIcon',
        value: function renderDropdownIcon() {
            return _react2.default.createElement(
                'div',
                { className: 'ui-dropdown-trigger ui-state-default ui-corner-right' },
                _react2.default.createElement('span', { className: 'fa fa-fw fa-caret-down ui-clickable' })
            );
        }
    }, {
        key: 'renderPanel',
        value: function renderPanel(selectedOption) {
            var _this7 = this;

            var className = (0, _classnames2.default)('ui-dropdown-panel ui-widget-content ui-corner-all ui-helper-hidden ui-shadow', this.props.panelClassName);
            var items = this.props.options;
            var filter = this.renderFilter();

            if (this.hasFilter()) {
                items = items && items.filter(function (option) {
                    return _this7.filter(option);
                });
            }

            items = items && items.map(function (option, index) {
                var optionLabel = _this7.getOptionLabel(option);
                return _react2.default.createElement(_DropdownItem.DropdownItem, { key: optionLabel, label: optionLabel, option: option, template: _this7.props.itemTemplate, selected: selectedOption === option,
                    onClick: _this7.onOptionClick });
            });

            return _react2.default.createElement(
                'div',
                { ref: function ref(el) {
                        return _this7.panel = el;
                    }, className: className, style: this.props.panelStyle, onClick: this.panelClick },
                filter,
                _react2.default.createElement(
                    'div',
                    { className: 'ui-dropdown-items-wrapper', style: { maxHeight: this.props.scrollHeight || 'auto' } },
                    _react2.default.createElement(
                        'ul',
                        { className: 'ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset' },
                        items
                    )
                )
            );
        }
    }, {
        key: 'renderFilter',
        value: function renderFilter() {
            var _this8 = this;

            if (this.props.filter) {
                return _react2.default.createElement(
                    'div',
                    { className: 'ui-dropdown-filter-container' },
                    _react2.default.createElement('input', { ref: function ref(el) {
                            return _this8.filterInput = el;
                        }, type: 'text', autoComplete: 'off', className: 'ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all', placeholder: this.props.filterPlaceholder,
                        onKeyDown: this.onFilterKeyDown, onChange: this.onFilterInputChange }),
                    _react2.default.createElement('span', { className: 'fa fa-search' })
                );
            } else {
                return null;
            }
        }
    }, {
        key: 'getOptionLabel',
        value: function getOptionLabel(option) {
            return this.props.optionLabel ? _ObjectUtils2.default.resolveFieldData(option, this.props.optionLabel) : option.label;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.autoWidth) {
                if (!this.props.style || !this.props.style['width'] && !this.props.style['min-width']) {
                    this.container.style.width = this.nativeSelect.offsetWidth + 30 + 'px';
                }
            }

            if (this.props.appendTo) {
                if (this.props.appendTo === 'body') document.body.appendChild(this.panel);else _DomHandler2.default.appendChild(this.panel, this.props.appendTo);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentClickListener();

            if (this.props.appendTo) {
                this.container.appendChild(this.panel);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.props.filter) {
                this.alignPanel();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var className = (0, _classnames2.default)('ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix', this.props.className, { 'ui-state-disabled': this.props.disabled });
            var selectedOption = this.findOption(this.props.value);
            var label = selectedOption ? this.getOptionLabel(selectedOption) : null;

            var hiddenSelect = this.renderHiddenSelect();
            var keyboardHelper = this.renderKeyboardHelper();
            var labelElement = this.renderLabel(label);
            var dropdownIcon = this.renderDropdownIcon();
            var panel = this.renderPanel(selectedOption);

            return _react2.default.createElement(
                'div',
                { id: this.props.id, ref: function ref(el) {
                        return _this9.container = el;
                    }, className: className, style: this.props.style, onClick: this.onClick,
                    onMouseDown: this.props.onMouseDown, onContextMenu: this.props.onContextMenu },
                hiddenSelect,
                keyboardHelper,
                labelElement,
                dropdownIcon,
                panel
            );
        }
    }]);

    return Dropdown;
}(_react.Component);

Dropdown.defaultProps = {
    id: null,
    value: null,
    options: null,
    optionLabel: null,
    itemTemplate: null,
    style: null,
    className: null,
    autoWidth: true,
    scrollHeight: '200px',
    filter: false,
    filterplaceholder: null,
    editable: false,
    placeholder: null,
    required: false,
    disabled: false,
    appendTo: null,
    tabIndex: null,
    autoFocus: false,
    panelClassName: null,
    panelStyle: null,
    dataKey: null,
    inputId: null,
    onChange: null,
    onMouseDown: null,
    onContextMenu: null
};
Dropdown.propTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.any,
    options: _propTypes2.default.array,
    optionLabel: _propTypes2.default.string,
    itemTemplate: _propTypes2.default.func,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    autoWidth: _propTypes2.default.bool,
    scrollHeight: _propTypes2.default.string,
    filter: _propTypes2.default.bool,
    filterplaceholder: _propTypes2.default.string,
    editable: _propTypes2.default.bool,
    placeholder: _propTypes2.default.string,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    appendTo: _propTypes2.default.any,
    tabIndex: _propTypes2.default.number,
    autoFocus: _propTypes2.default.bool,
    lazy: _propTypes2.default.bool,
    panelClassName: _propTypes2.default.string,
    panelstyle: _propTypes2.default.object,
    dataKey: _propTypes2.default.string,
    inputId: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    onMouseDown: _propTypes2.default.func,
    onContextMenu: _propTypes2.default.func
};