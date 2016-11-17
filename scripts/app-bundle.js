define('models/events/baseEvent',["require", "exports"], function (require, exports) {
    "use strict";
    var BaseEvent = (function () {
        function BaseEvent(id) {
            this.id = id;
            this.occuredOn = new Date();
        }
        return BaseEvent;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BaseEvent;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('models/events/todoItemCompletedChangedEvent',["require", "exports", './baseEvent'], function (require, exports, baseEvent_1) {
    "use strict";
    var TodoItemCompletedChangedEvent = (function (_super) {
        __extends(TodoItemCompletedChangedEvent, _super);
        function TodoItemCompletedChangedEvent(id, completed) {
            _super.call(this, id);
            this.completed = completed;
        }
        return TodoItemCompletedChangedEvent;
    }(baseEvent_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TodoItemCompletedChangedEvent;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('models/events/todoItemTitleChangedEvent',["require", "exports", './baseEvent'], function (require, exports, baseEvent_1) {
    "use strict";
    var TodoItemTitleChangedEvent = (function (_super) {
        __extends(TodoItemTitleChangedEvent, _super);
        function TodoItemTitleChangedEvent(id, title) {
            _super.call(this, id);
            this.title = title;
        }
        return TodoItemTitleChangedEvent;
    }(baseEvent_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TodoItemTitleChangedEvent;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('models/events/createTodoItemEvent',["require", "exports", './baseEvent'], function (require, exports, baseEvent_1) {
    "use strict";
    var CreateTodoItemEvent = (function (_super) {
        __extends(CreateTodoItemEvent, _super);
        function CreateTodoItemEvent(id, title) {
            _super.call(this, id);
            this.title = title;
        }
        return CreateTodoItemEvent;
    }(baseEvent_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CreateTodoItemEvent;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('models/TodoItem',["require", "exports", 'aurelia-event-aggregator', 'aurelia-framework', './events/todoItemCompletedChangedEvent', './events/todoItemTitleChangedEvent', './events/createTodoItemEvent'], function (require, exports, aurelia_event_aggregator_1, aurelia_framework_1, todoItemCompletedChangedEvent_1, todoItemTitleChangedEvent_1, createTodoItemEvent_1) {
    "use strict";
    var TodoItem = (function () {
        function TodoItem(ea, title, completed, id) {
            if (completed === void 0) { completed = false; }
            if (id === void 0) { id = null; }
            this.ea = ea;
            this.title = title;
            this.oldTitle = '';
            this.editing = false;
            this.innerCompleted = completed;
            if (!id) {
                this.innerId = uniqueID();
                this.ea.publish('todo.created', new createTodoItemEvent_1.default(this.id, this.title));
            }
            else {
                this.innerId = id;
            }
        }
        Object.defineProperty(TodoItem.prototype, "id", {
            get: function () {
                return this.innerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TodoItem.prototype, "completed", {
            get: function () {
                return this.innerCompleted;
            },
            set: function (value) {
                if (value === this.innerCompleted) {
                    return;
                }
                this.innerCompleted = value;
                this.ea.publish('todo.completed', new todoItemCompletedChangedEvent_1.default(this.innerId, this.innerCompleted));
            },
            enumerable: true,
            configurable: true
        });
        TodoItem.prototype.editTitle = function () {
            this.editing = !this.editing;
            if (this.editing) {
                this.oldTitle = this.title;
            }
        };
        TodoItem.prototype.commitTitleChange = function () {
            this.oldTitle = '';
            this.editing = false;
            this.ea.publish('todo.title', new todoItemTitleChangedEvent_1.default(this.id, this.title));
        };
        TodoItem.prototype.rollbackTitleChange = function () {
            this.title = this.oldTitle;
            this.oldTitle = '';
            this.editing = false;
        };
        TodoItem = __decorate([
            aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator), 
            __metadata('design:paramtypes', [aurelia_event_aggregator_1.EventAggregator, String, Object, Object])
        ], TodoItem);
        return TodoItem;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TodoItem;
    function uniqueID() {
        function chr4() {
            return Math.random().toString(16).slice(-4);
        }
        return chr4() + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() +
            '-' + chr4() + chr4() + chr4();
    }
});

define('models/StoredTodoItem',["require", "exports"], function (require, exports) {
    "use strict";
    var StoredTodoItem = (function () {
        function StoredTodoItem() {
            this.id = '';
            this.title = '';
            this.completed = false;
        }
        return StoredTodoItem;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = StoredTodoItem;
});

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define('models/events/deleteTodoItemEvent',["require", "exports", './baseEvent'], function (require, exports, baseEvent_1) {
    "use strict";
    var DeleteTodoItemEvent = (function (_super) {
        __extends(DeleteTodoItemEvent, _super);
        function DeleteTodoItemEvent(id) {
            _super.call(this, id);
        }
        return DeleteTodoItemEvent;
    }(baseEvent_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DeleteTodoItemEvent;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('services/storageService',["require", "exports", 'aurelia-framework', 'aurelia-event-aggregator', './../models/TodoItem', './../models/StoredTodoItem'], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, TodoItem_1, StoredTodoItem_1) {
    "use strict";
    var StorageService = (function () {
        function StorageService(ea, todoItemFactory) {
            this.todoItemFactory = todoItemFactory;
            var todos = this.getStoredTodos();
            if (!todos) {
                setObject('todoItems', []);
            }
            ea.subscribe('todo.created', this.handleCreateEvent.bind(this));
            ea.subscribe('todo.delete', this.handleDeleteEvent.bind(this));
            ea.subscribe('todo.completed', this.handleCompletedEvent.bind(this));
            ea.subscribe('todo.title', this.handleTitleChangedEvent.bind(this));
        }
        StorageService.prototype.handleCreateEvent = function (event) {
            var todos = this.getStoredTodos();
            if (!todos) {
                return;
            }
            var itemToStore = new StoredTodoItem_1.default();
            itemToStore.id = event.id;
            itemToStore.title = event.title;
            todos.push(itemToStore);
            setObject('todoItems', todos);
        };
        StorageService.prototype.handleDeleteEvent = function (event) {
            var todos = this.getStoredTodos();
            if (!todos) {
                return;
            }
            var todoItem = todos.find(function (item) { return item.id === event.id; });
            todos.splice(todos.indexOf(todoItem), 1);
            setObject('todoItems', todos);
        };
        StorageService.prototype.handleCompletedEvent = function (event) {
            var todos = this.getStoredTodos();
            if (!todos) {
                return;
            }
            var todoItem = todos.find(function (item) { return item.id === event.id; });
            todoItem.completed = event.completed;
            setObject('todoItems', todos);
        };
        StorageService.prototype.handleTitleChangedEvent = function (event) {
            var todos = this.getStoredTodos();
            if (!todos) {
                return;
            }
            var todoItem = todos.find(function (item) { return item.id === event.id; });
            todoItem.title = event.title;
            setObject('todoItems', todos);
        };
        StorageService.prototype.getStoredTodos = function () {
            return getObject('todoItems');
        };
        StorageService.prototype.getTodoList = function () {
            var _this = this;
            return this.getStoredTodos().map(function (item) { return _this.todoItemFactory(item.title, item.completed, item.id); });
        };
        StorageService = __decorate([
            aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator, aurelia_framework_1.Factory.of(TodoItem_1.default)), 
            __metadata('design:paramtypes', [aurelia_event_aggregator_1.EventAggregator, Object])
        ], StorageService);
        return StorageService;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = StorageService;
    function setObject(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    function getObject(key) {
        var value = localStorage.getItem(key);
        return value && JSON.parse(value);
    }
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('models/TodoItems',["require", "exports", 'aurelia-framework', 'aurelia-event-aggregator', './../services/storageService', './TodoItem', './events/deleteTodoItemEvent'], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, storageService_1, TodoItem_1, deleteTodoItemEvent_1) {
    "use strict";
    var TodoItems = (function () {
        function TodoItems(ea, todoItemFactory, storageService) {
            this.ea = ea;
            this.todoItemFactory = todoItemFactory;
            this.all = [];
            this.all = storageService.getTodoList();
        }
        Object.defineProperty(TodoItems.prototype, "completed", {
            get: function () {
                return this.all.filter(function (todo) { return todo.completed; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TodoItems.prototype, "active", {
            get: function () {
                return this.all.filter(function (todo) { return !todo.completed; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TodoItems.prototype, "allCompleted", {
            get: function () {
                return this.completed.length == this.all.length;
            },
            set: function (value) {
                this.all.forEach(function (todo) { return todo.completed = value; });
            },
            enumerable: true,
            configurable: true
        });
        TodoItems.prototype.add = function (text) {
            text = text.trim();
            if (text.length === 0) {
                return;
            }
            var newTodoItem = this.todoItemFactory(text);
            this.all.push(newTodoItem);
        };
        TodoItems.prototype.delete = function (todo) {
            this.all.splice(this.all.indexOf(todo), 1);
            this.ea.publish('todo.delete', new deleteTodoItemEvent_1.default(todo.id));
        };
        TodoItems.prototype.deleteAllCompleted = function () {
            var _this = this;
            this.completed.forEach(function (item) { return _this.delete(item); });
        };
        TodoItems = __decorate([
            aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator, aurelia_framework_1.Factory.of(TodoItem_1.default), storageService_1.default), 
            __metadata('design:paramtypes', [aurelia_event_aggregator_1.EventAggregator, Object, storageService_1.default])
        ], TodoItems);
        return TodoItems;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TodoItems;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", 'aurelia-framework', './models/TodoItems'], function (require, exports, aurelia_framework_1, TodoItems_1) {
    "use strict";
    var App = (function () {
        function App(todoItems) {
            this.todoItems = todoItems;
            this.newTodoText = '';
        }
        App.prototype.addTodoItem = function () {
            this.todoItems.add(this.newTodoText);
            this.newTodoText = '';
        };
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Aurelia - TodoMVC';
            config.map([
                { route: ['', 'all'], name: 'all', moduleId: 'todos', nav: true, title: 'All' },
                { route: 'active', name: 'active', moduleId: 'todos', nav: true, title: 'Active' },
                { route: 'completed', name: 'completed', moduleId: 'todos', nav: true, title: 'Completed' }
            ]);
            this.router = router;
        };
        App = __decorate([
            aurelia_framework_1.inject(TodoItems_1.default), 
            __metadata('design:paramtypes', [TodoItems_1.default])
        ], App);
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('todos',["require", "exports", 'aurelia-router'], function (require, exports, aurelia_router_1) {
    "use strict";
    var TodoView = (function () {
        function TodoView() {
            this.stateName = 'all';
        }
        TodoView.prototype.determineActivationStrategy = function () {
            return aurelia_router_1.activationStrategy.replace;
        };
        TodoView.prototype.activate = function (params, navigationInstruction) {
            this.stateName = navigationInstruction.name;
        };
        TodoView.prototype.keyUp = function (todo, keyCode) {
            keyCode = keyCode.toLowerCase();
            if (keyCode === 'enter') {
                todo.commitTitleChange();
            }
            else if (keyCode === 'escape') {
                todo.rollbackTitleChange();
            }
        };
        return TodoView;
    }());
    exports.TodoView = TodoView;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources([
            './value-converters/statevalueconverter',
            './value-converters/pluralizevalueconveter'
        ]);
    }
    exports.configure = configure;
});

define('resources/value-converters/pluralizevalueconveter',["require", "exports"], function (require, exports) {
    "use strict";
    var PluralizeValueConverter = (function () {
        function PluralizeValueConverter() {
        }
        PluralizeValueConverter.prototype.toView = function (count, single, multiple) {
            return (count === 1) ? single : multiple;
        };
        return PluralizeValueConverter;
    }());
    exports.PluralizeValueConverter = PluralizeValueConverter;
});

define('resources/value-converters/statevalueconverter',["require", "exports"], function (require, exports) {
    "use strict";
    var StateValueConverter = (function () {
        function StateValueConverter() {
        }
        StateValueConverter.prototype.toView = function (todos, state) {
            switch (state) {
                case 'completed':
                    return todos.filter(function (todo) { return todo.completed; });
                case 'active':
                    return todos.filter(function (todo) { return !todo.completed; });
                default:
                    return todos;
            }
        };
        return StateValueConverter;
    }());
    exports.StateValueConverter = StateValueConverter;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./info-footer.html\"></require>\n\n\t\t<section class=\"todoapp\">\n\t\t\t\n      <header class=\"header\">\n\t\t\t\t<h1>todos</h1>\n        <form submit.delegate=\"addTodoItem()\">\n          <input value.bind=\"newTodoText\" class=\"new-todo\" placeholder=\"What needs to be done?\" autofocus>\n        </form>\n\t\t\t</header>\n      \n      <router-view></router-view>\n\t\t\t\n      <footer show.bind=\"todoItems.all.length\" class=\"footer\">\n\t\t\t\t\n        <span class=\"todo-count\">\n          <strong>${todoItems.active.length}</strong> \n          ${todoItems.active.length | pluralize:'item':'items'} left\n        </span>\n        \n        <ul class=\"filters\">\n          <li repeat.for=\"row of router.navigation\">\n            <a href.bind=\"row.href\" class=\"${row.isActive ? 'selected' : ''}\">${row.title}</a>\n          </li>\n        </ul>\n\t\t\t\t\n        <button \n          show.bind=\"todoItems.completed.length\" \n          click.delegate=\"todoItems.deleteAllCompleted()\" \n          class=\"clear-completed\">Clear completed</button>\n          \n\t\t\t</footer>\n\n\t\t</section>\n\n  <info-footer></info-footer>\n\n  <script src=\"node_modules/todomvc-common/base.js\"></script>\n  <script src=\"js/app.js\"></script>\n</template>\n"; });
define('text!info-footer.html', ['module'], function(module) { module.exports = "<template>\n  <footer class=\"info\">\n    <p>Double-click to edit a todo</p>\n    <p>Template by <a href=\"http://sindresorhus.com\">Sindre Sorhus</a></p>\n    <p>Created by <a href=\"https://github.com/eriklieben\">Erik Lieben</a></p>\n    <p>Part of <a href=\"http://todomvc.com\">TodoMVC</a></p>\n  </footer>\n</template>\n"; });
define('text!todos.html', ['module'], function(module) { module.exports = "<template>\n  <section if.bind=\"todoItems.all.length\" class=\"main\">\n    <input class=\"toggle-all\" type=\"checkbox\" checked.bind=\"todoItems.allCompleted\">\n    <label for=\"toggle-all\">Mark all as complete</label>\n    <ul class=\"todo-list\">\n      <li repeat.for=\"todo of todoItems.all | state:stateName\" class=\"${todo.completed ? 'completed' : ''} ${todo.editing ? 'editing' : ''}\">\n        <div class=\"view\">\n          <input class=\"toggle\" type=\"checkbox\" checked.bind=\"todo.completed\">\n          <label dblclick.delegate=\"todo.editTitle()\">${todo.title}</label>\n          <button class=\"destroy\" click.delegate=\"todoItems.delete(todo)\"></button>\n        </div>\n        <input class=\"edit\" focus.bind=\"todo.editing\" keyup.delegate=\"keyUp(todo, $event.code)\" value.bind=\"todo.title\">        \n      </li>\n    </ul>\n  </section>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map