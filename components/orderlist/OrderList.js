'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrderList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

var OrderList = exports.OrderList = function (_Component) {
    _inherits(OrderList, _Component);

    function OrderList(props) {
        _classCallCheck(this, OrderList);

        var _this = _possibleConstructorReturn(this, (OrderList.__proto__ || Object.getPrototypeOf(OrderList)).call(this, props));

        _this.state = {
            selectedItems: []
        };
        _this.onDragOver = _this.onDragOver.bind(_this);
        _this.onDrop = _this.onDrop.bind(_this);
        _this.onDragLeave = _this.onDragLeave.bind(_this);
        _this.onDragStart = _this.onDragStart.bind(_this);
        _this.onDragEnd = _this.onDragEnd.bind(_this);
        _this.onItemTouchEnd = _this.onItemTouchEnd.bind(_this);
        _this.onListMouseMove = _this.onListMouseMove.bind(_this);
        _this.moveUp = _this.moveUp.bind(_this);
        _this.moveTop = _this.moveTop.bind(_this);
        _this.moveDown = _this.moveDown.bind(_this);
        _this.moveBottom = _this.moveBottom.bind(_this);
        return _this;
    }

    _createClass(OrderList, [{
        key: 'onItemClick',
        value: function onItemClick(event, item) {
            var metaKey = event.metaKey || event.ctrlKey;
            var selection = this.state.selectedItems;
            var index = this.findIndexInList(item, selection);
            var selected = index !== -1;

            if (selected && metaKey) {
                selection = selection.filter(function (val, i) {
                    return i !== index;
                });
            } else {
                selection = metaKey ? selection || [] : [];
                selection.push(item);
            }

            this.setState({ selectedItems: selection });
        }
    }, {
        key: 'onItemTouchEnd',
        value: function onItemTouchEnd(event) {
            this.itemTouched = true;
        }
    }, {
        key: 'isSelected',
        value: function isSelected(item) {
            return this.findIndexInList(item, this.state.selectedItems) !== -1;
        }
    }, {
        key: 'findIndexInList',
        value: function findIndexInList(item, list) {
            var index = -1;

            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i] === item) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        }
    }, {
        key: 'moveUp',
        value: function moveUp(event) {
            var selectedItems = this.state.selectedItems;

            if (selectedItems) {
                var value = [].concat(_toConsumableArray(this.props.value));

                for (var i = 0; i < selectedItems.length; i++) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = this.findIndexInList(selectedItem, value);

                    if (selectedItemIndex !== 0) {
                        var movedItem = value[selectedItemIndex];
                        var temp = value[selectedItemIndex - 1];
                        value[selectedItemIndex - 1] = movedItem;
                        value[selectedItemIndex] = temp;
                    } else {
                        break;
                    }
                }

                this.movedUp = true;

                if (this.props.onChange) {
                    this.props.onChange({
                        originalEvent: event,
                        value: value
                    });
                }
            }
        }
    }, {
        key: 'moveTop',
        value: function moveTop(event) {
            var selectedItems = this.state.selectedItems;

            if (selectedItems) {
                var value = [].concat(_toConsumableArray(this.props.value));

                for (var i = 0; i < selectedItems.length; i++) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = this.findIndexInList(selectedItem, value);

                    if (selectedItemIndex !== 0) {
                        var movedItem = value.splice(selectedItemIndex, 1)[0];
                        value.unshift(movedItem);
                        this.listContainer.scrollTop = 0;
                    } else {
                        break;
                    }
                }

                if (this.props.onChange) {
                    this.props.onChange({
                        originalEvent: event,
                        value: value
                    });
                }

                this.listContainer.scrollTop = 0;
            }
        }
    }, {
        key: 'moveDown',
        value: function moveDown(event) {
            var selectedItems = this.state.selectedItems;

            if (selectedItems) {
                var value = [].concat(_toConsumableArray(this.props.value));

                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = this.findIndexInList(selectedItem, value);

                    if (selectedItemIndex !== value.length - 1) {
                        var movedItem = value[selectedItemIndex];
                        var temp = value[selectedItemIndex + 1];
                        value[selectedItemIndex + 1] = movedItem;
                        value[selectedItemIndex] = temp;
                    } else {
                        break;
                    }
                }

                this.movedDown = true;

                if (this.props.onChange) {
                    this.props.onChange({
                        originalEvent: event,
                        value: value
                    });
                }
            }
        }
    }, {
        key: 'moveBottom',
        value: function moveBottom(event) {
            var selectedItems = this.state.selectedItems;

            if (selectedItems) {
                var value = [].concat(_toConsumableArray(this.props.value));

                for (var i = selectedItems.length - 1; i >= 0; i--) {
                    var selectedItem = selectedItems[i];
                    var selectedItemIndex = this.findIndexInList(selectedItem, value);

                    if (selectedItemIndex !== value.length - 1) {
                        var movedItem = value.splice(selectedItemIndex, 1)[0];
                        value.push(movedItem);
                    } else {
                        break;
                    }
                }

                if (this.props.onChange) {
                    this.props.onChange({
                        originalEvent: event,
                        value: value
                    });
                }

                this.listContainer.scrollTop = this.listContainer.scrollHeight;
            }
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart(event, index) {
            this.dragging = true;
            this.draggedItemIndex = index;
            if (this.props.dragdropScope) {
                event.dataTransfer.setData("text", this.props.dragdropScope);
            }
        }
    }, {
        key: 'onDragOver',
        value: function onDragOver(event, index) {
            if (this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
                this.dragOverItemIndex = index;
                _DomHandler2.default.addClass(event.target, 'ui-state-highlight');
                event.preventDefault();
            }
        }
    }, {
        key: 'onDragLeave',
        value: function onDragLeave(event, index) {
            this.dragOverItemIndex = null;
            _DomHandler2.default.removeClass(event.target, 'ui-state-highlight');
        }
    }, {
        key: 'onDrop',
        value: function onDrop(event, index) {
            var dropIndex = this.draggedItemIndex > index ? index : index === 0 ? 0 : index - 1;
            var value = [].concat(_toConsumableArray(this.props.value));
            _ObjectUtils2.default.reorderArray(value, this.draggedItemIndex, dropIndex);
            this.dragOverItemIndex = null;
            _DomHandler2.default.removeClass(event.target, 'ui-state-highlight');

            if (this.props.onChange) {
                this.props.onChange({
                    originalEvent: event,
                    value: value
                });
            }
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd(event) {
            this.dragging = false;
        }
    }, {
        key: 'onListMouseMove',
        value: function onListMouseMove(event) {
            if (this.dragging) {
                var offsetY = this.listContainer.getBoundingClientRect().top + document.body.scrollTop;
                var bottomDiff = offsetY + this.listContainer.clientHeight - event.pageY;
                var topDiff = event.pageY - offsetY;
                if (bottomDiff < 25 && bottomDiff > 0) this.listContainer.scrollTop += 15;else if (topDiff < 25 && topDiff > 0) this.listContainer.scrollTop -= 15;
            }
        }
    }, {
        key: 'updateScrollView',
        value: function updateScrollView() {
            if (this.movedUp || this.movedDown) {
                var listItems = this.listContainer.getElementsByClassName('ui-state-highlight');
                var listItem = void 0;

                if (this.movedUp) listItem = listItems[0];else listItem = listItems[listItems.length - 1];

                _DomHandler2.default.scrollInView(this.listContainer, listItem);
                this.movedUp = false;
                this.movedDown = false;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevProps.value !== this.props.value) {
                this.updateScrollView();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-orderlist ui-widget', this.props.className, {
                'ui-orderlist-responsive': this.props.responsive
            });

            var upButton = _react2.default.createElement(_Button.Button, { type: 'button', icon: 'fa-angle-up', onClick: this.moveUp });
            var topButton = _react2.default.createElement(_Button.Button, { type: 'button', icon: 'fa-angle-double-up', onClick: this.moveTop });
            var downButton = _react2.default.createElement(_Button.Button, { type: 'button', icon: 'fa-angle-down', onClick: this.moveDown });
            var bottomButton = _react2.default.createElement(_Button.Button, { type: 'button', icon: 'fa-angle-double-down', onClick: this.moveBottom });
            var controls = _react2.default.createElement(
                'div',
                { className: 'ui-orderlist-controls' },
                upButton,
                topButton,
                downButton,
                bottomButton
            );

            var listLength = this.props.value ? this.props.value.length : null;
            var header = this.props.header && _react2.default.createElement(
                'div',
                { className: 'ui-orderlist-caption ui-widget-header ui-corner-top' },
                this.props.header
            );
            var list = _react2.default.createElement(
                'ul',
                { ref: function ref(el) {
                        return _this2.listContainer = el;
                    }, className: 'ui-widget-content ui-orderlist-list ui-corner-bottom', style: this.props.listStyle, onDragOver: this.onListMouseMove },
                this.props.value && this.props.value.map(function (item, i) {
                    var listItemContent = _this2.props.itemTemplate ? _this2.props.itemTemplate(item) : item;
                    var listStyleClass = (0, _classnames2.default)('ui-orderlist-item', { 'ui-state-highlight': _this2.isSelected(item) });

                    return [_this2.props.dragdrop && _react2.default.createElement('li', { key: i + '_orderlistfirstdroppoint', className: 'ui-orderlist-droppoint', onDragOver: function onDragOver(e) {
                            return _this2.onDragOver(e, i);
                        }, onDrop: function onDrop(e) {
                            return _this2.onDrop(e, i);
                        }, onDragLeave: _this2.onDragLeave }), _react2.default.createElement(
                        'li',
                        { key: i + '_orderlistitem', className: listStyleClass, onClick: function onClick(e) {
                                return _this2.onItemClick(e, item);
                            }, draggable: _this2.props.dragdrop, onDragStart: function onDragStart(e) {
                                return _this2.onDragStart(e, i);
                            }, onDragEnd: _this2.onDragEnd, onTouchEnd: _this2.onItemTouchEnd },
                        listItemContent
                    ), _this2.props.dragdrop && listLength === i + 1 && _react2.default.createElement('li', { key: i + '_orderlistdroppoint', className: 'ui-orderlist-droppoint', onDragOver: function onDragOver(e) {
                            return _this2.onDragOver(e, i + 1);
                        }, onDrop: function onDrop(e) {
                            return _this2.onDrop(e, i + 1);
                        }, onDragLeave: _this2.onDragLeave })];
                })
            );

            var content = _react2.default.createElement(
                'div',
                { className: 'ui-orderlist-list-container' },
                header,
                list
            );

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style },
                controls,
                content
            );
        }
    }]);

    return OrderList;
}(_react.Component);

OrderList.defaultProps = {
    id: null,
    value: null,
    header: null,
    style: null,
    className: null,
    listStyle: null,
    responsive: false,
    dragdrop: false,
    dragdropScope: null,
    onChange: null,
    itemTemplate: null
};
OrderList.propsTypes = {
    id: _propTypes2.default.string,
    value: _propTypes2.default.array,
    header: _propTypes2.default.string,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    liststyle: _propTypes2.default.object,
    responsive: _propTypes2.default.bool,
    dragdrop: _propTypes2.default.func,
    dragdropScope: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    itemTemplate: _propTypes2.default.func
};