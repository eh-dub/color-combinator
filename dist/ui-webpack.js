/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/bundle.js":
/*!**************************!*\
  !*** ./public/bundle.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function validate_store(store, name) {
        if (!store || typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(component, store, callback) {
        const unsub = store.subscribe(callback);
        component.$$.on_destroy.push(unsub.unsubscribe
            ? () => unsub.unsubscribe()
            : unsub);
    }
    function create_slot(definition, ctx, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.ctx, definition[1](fn ? fn(ctx) : {})))
            : ctx.$$scope.ctx;
    }
    function get_slot_changes(definition, ctx, changed, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.changed || {}, definition[1](fn ? fn(changed) : {})))
            : ctx.$$scope.changed || {};
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.shift()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            while (render_callbacks.length) {
                const callback = render_callbacks.pop();
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_render);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_render.forEach(add_render_callback);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_render } = component.$$;
        fragment.m(target, anchor);
        // onMount happens after the initial afterUpdate. Because
        // afterUpdate callbacks happen in reverse order (inner first)
        // we schedule onMount callbacks before afterUpdate callbacks
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_render.forEach(add_render_callback);
    }
    function destroy(component, detaching) {
        if (component.$$) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal$$1, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal: not_equal$$1,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_render: [],
            after_render: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal$$1($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_render);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                $$.fragment.l(children(options.target));
            }
            else {
                $$.fragment.c();
            }
            if (options.intro && component.$$.fragment.i)
                component.$$.fragment.i();
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy(this, true);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (!stop) {
                    return; // not ready
                }
                subscribers.forEach((s) => s[1]());
                subscribers.forEach((s) => s[0](value));
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                }
            };
        }
        return { set, update, subscribe };
    }

    /* src/Counter.svelte generated by Svelte v3.4.4 */

    const file = "src/Counter.svelte";

    function create_fragment(ctx) {
    	var div1, t0, t1, div0, t2, t3, button0, t5, button1, current, dispose;

    	const default_slot_1 = ctx.$$slots.default;
    	const default_slot = create_slot(default_slot_1, ctx, null);

    	return {
    		c: function create() {
    			div1 = element("div");

    			if (!default_slot) {
    				t0 = text("Default Counter");
    			}

    			if (default_slot) default_slot.c();
    			t1 = space();
    			div0 = element("div");
    			t2 = text(ctx.value);
    			t3 = space();
    			button0 = element("button");
    			button0.textContent = "+";
    			t5 = space();
    			button1 = element("button");
    			button1.textContent = "-";

    			add_location(button0, file, 4, 4, 61);
    			add_location(button1, file, 5, 4, 117);
    			add_location(div0, file, 2, 2, 39);
    			add_location(div1, file, 0, 0, 0);

    			dispose = [
    				listen(button0, "click", ctx.click_handler),
    				listen(button1, "click", ctx.click_handler_1)
    			];
    		},

    		l: function claim(nodes) {
    			if (default_slot) default_slot.l(div1_nodes);
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div1, anchor);

    			if (!default_slot) {
    				append(div1, t0);
    			}

    			else {
    				default_slot.m(div1, null);
    			}

    			append(div1, t1);
    			append(div1, div0);
    			append(div0, t2);
    			append(div0, t3);
    			append(div0, button0);
    			append(div0, t5);
    			append(div0, button1);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (default_slot && default_slot.p && changed.$$scope) {
    				default_slot.p(get_slot_changes(default_slot_1, ctx, changed, null), get_slot_context(default_slot_1, ctx, null));
    			}

    			if (!current || changed.value) {
    				set_data(t2, ctx.value);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			if (default_slot && default_slot.i) default_slot.i(local);
    			current = true;
    		},

    		o: function outro(local) {
    			if (default_slot && default_slot.o) default_slot.o(local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div1);
    			}

    			if (default_slot) default_slot.d(detaching);
    			run_all(dispose);
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { value = 0, step = 1 } = $$props;

    	const writable_props = ['value', 'step'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Counter> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	function click_handler() {
    		const $$result = (value += step);
    		$$invalidate('value', value);
    		return $$result;
    	}

    	function click_handler_1() {
    		const $$result = (value -= step);
    		$$invalidate('value', value);
    		return $$result;
    	}

    	$$self.$set = $$props => {
    		if ('value' in $$props) $$invalidate('value', value = $$props.value);
    		if ('step' in $$props) $$invalidate('step', step = $$props.step);
    		if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
    	};

    	return {
    		value,
    		step,
    		click_handler,
    		click_handler_1,
    		$$slots,
    		$$scope
    	};
    }

    class Counter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["value", "step"]);
    	}

    	get value() {
    		throw new Error("<Counter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Counter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get step() {
    		throw new Error("<Counter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<Counter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.4.4 */

    const file$1 = "src/App.svelte";

    // (5:2) <Counter value={1}>
    function create_default_slot_1(ctx) {
    	var t;

    	return {
    		c: function create() {
    			t = text("Counter 1");
    		},

    		m: function mount(target, anchor) {
    			insert(target, t, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(t);
    			}
    		}
    	};
    }

    // (6:2) <Counter value={$count} step={3}>
    function create_default_slot(ctx) {
    	var t;

    	return {
    		c: function create() {
    			t = text("Counter 2");
    		},

    		m: function mount(target, anchor) {
    			insert(target, t, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(t);
    			}
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	var div, h1, t0, t1, t2, t3, p, t4, t5, current;

    	var counter0 = new Counter({ $$inline: true });

    	var counter1 = new Counter({
    		props: {
    		value: 1,
    		$$slots: { default: [create_default_slot_1] },
    		$$scope: { ctx }
    	},
    		$$inline: true
    	});

    	var counter2 = new Counter({
    		props: {
    		value: ctx.$count,
    		step: 3,
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	},
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			t0 = text("Hello ");
    			t1 = text(ctx.name);
    			t2 = text("!");
    			t3 = space();
    			p = element("p");
    			counter0.$$.fragment.c();
    			t4 = space();
    			counter1.$$.fragment.c();
    			t5 = space();
    			counter2.$$.fragment.c();
    			h1.className = "svelte-1ucbz36";
    			add_location(h1, file$1, 1, 0, 6);
    			add_location(p, file$1, 2, 0, 29);
    			add_location(div, file$1, 0, 0, 0);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, h1);
    			append(h1, t0);
    			append(h1, t1);
    			append(h1, t2);
    			append(div, t3);
    			append(div, p);
    			mount_component(counter0, p, null);
    			append(p, t4);
    			mount_component(counter1, p, null);
    			append(p, t5);
    			mount_component(counter2, p, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (!current || changed.name) {
    				set_data(t1, ctx.name);
    			}

    			var counter1_changes = {};
    			if (changed.$$scope) counter1_changes.$$scope = { changed, ctx };
    			counter1.$set(counter1_changes);

    			var counter2_changes = {};
    			if (changed.$count) counter2_changes.value = ctx.$count;
    			if (changed.$$scope) counter2_changes.$$scope = { changed, ctx };
    			counter2.$set(counter2_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			counter0.$$.fragment.i(local);

    			counter1.$$.fragment.i(local);

    			counter2.$$.fragment.i(local);

    			current = true;
    		},

    		o: function outro(local) {
    			counter0.$$.fragment.o(local);
    			counter1.$$.fragment.o(local);
    			counter2.$$.fragment.o(local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}

    			counter0.$destroy();

    			counter1.$destroy();

    			counter2.$destroy();
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $count;

    	
    const count = writable(100); validate_store(count, 'count'); subscribe($$self, count, $$value => { $count = $$value; $$invalidate('$count', $count); });
    let { name } = $$props;
    onMount(() => {
        console.log("App mounted");
    });

    	const writable_props = ['name'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    	};

    	return { count, name, $count };
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, ["name"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.name === undefined && !('name' in props)) {
    			console.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
        target: document.body,
        props: {
            name: "world"
        }
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2J1bmRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTs7QUFFQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsS0FBSztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix5REFBeUQ7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsa0NBQWtDLHFDQUFxQztBQUM5RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLCtDQUErQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0U7QUFDaEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLEdBQUc7QUFDbEIsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxzQkFBc0I7O0FBRWhDO0FBQ0E7QUFDQSwySEFBMkgsSUFBSTtBQUMvSCxNQUFNOztBQUVOLFVBQVUsYUFBYSxXQUFXOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSw2QkFBNkIsRUFBRTtBQUMvQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCLE9BQU8sT0FBTyxFQUFFO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlDQUFpQyxpQkFBaUI7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixtQ0FBbUM7QUFDbkQsZ0JBQWdCO0FBQ2hCLE1BQU07QUFDTjtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUNBQWlDO0FBQ2pELGdCQUFnQjtBQUNoQixNQUFNO0FBQ047QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3REFBd0Q7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxnQ0FBZ0MsZ0NBQWdDLHNDQUFzQyxrQkFBa0IsZ0NBQWdDLEVBQUU7QUFDMUosU0FBUyxPQUFPO0FBQ2hCO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSx1SEFBdUgsSUFBSTtBQUMzSCxNQUFNOztBQUVOO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBLENBQUM7QUFDRCIsImZpbGUiOiJ1aS13ZWJwYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wdWJsaWMvYnVuZGxlLmpzXCIpO1xuIiwidmFyIGFwcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgZnVuY3Rpb24gbm9vcCgpIHsgfVxuICAgIGZ1bmN0aW9uIGFzc2lnbih0YXIsIHNyYykge1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gc3JjKVxuICAgICAgICAgICAgdGFyW2tdID0gc3JjW2tdO1xuICAgICAgICByZXR1cm4gdGFyO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRfbG9jYXRpb24oZWxlbWVudCwgZmlsZSwgbGluZSwgY29sdW1uLCBjaGFyKSB7XG4gICAgICAgIGVsZW1lbnQuX19zdmVsdGVfbWV0YSA9IHtcbiAgICAgICAgICAgIGxvYzogeyBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBydW4oZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGJsYW5rX29iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJ1bl9hbGwoZm5zKSB7XG4gICAgICAgIGZucy5mb3JFYWNoKHJ1bik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHRoaW5nKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09ICdmdW5jdGlvbic7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNhZmVfbm90X2VxdWFsKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgIT0gYSA/IGIgPT0gYiA6IGEgIT09IGIgfHwgKChhICYmIHR5cGVvZiBhID09PSAnb2JqZWN0JykgfHwgdHlwZW9mIGEgPT09ICdmdW5jdGlvbicpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZV9zdG9yZShzdG9yZSwgbmFtZSkge1xuICAgICAgICBpZiAoIXN0b3JlIHx8IHR5cGVvZiBzdG9yZS5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7bmFtZX0nIGlzIG5vdCBhIHN0b3JlIHdpdGggYSAnc3Vic2NyaWJlJyBtZXRob2RgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUoY29tcG9uZW50LCBzdG9yZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgdW5zdWIgPSBzdG9yZS5zdWJzY3JpYmUoY2FsbGJhY2spO1xuICAgICAgICBjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHVuc3ViLnVuc3Vic2NyaWJlXG4gICAgICAgICAgICA/ICgpID0+IHVuc3ViLnVuc3Vic2NyaWJlKClcbiAgICAgICAgICAgIDogdW5zdWIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVfc2xvdChkZWZpbml0aW9uLCBjdHgsIGZuKSB7XG4gICAgICAgIGlmIChkZWZpbml0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBzbG90X2N0eCA9IGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCBmbik7XG4gICAgICAgICAgICByZXR1cm4gZGVmaW5pdGlvblswXShzbG90X2N0eCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0X3Nsb3RfY29udGV4dChkZWZpbml0aW9uLCBjdHgsIGZuKSB7XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uWzFdXG4gICAgICAgICAgICA/IGFzc2lnbih7fSwgYXNzaWduKGN0eC4kJHNjb3BlLmN0eCwgZGVmaW5pdGlvblsxXShmbiA/IGZuKGN0eCkgOiB7fSkpKVxuICAgICAgICAgICAgOiBjdHguJCRzY29wZS5jdHg7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldF9zbG90X2NoYW5nZXMoZGVmaW5pdGlvbiwgY3R4LCBjaGFuZ2VkLCBmbikge1xuICAgICAgICByZXR1cm4gZGVmaW5pdGlvblsxXVxuICAgICAgICAgICAgPyBhc3NpZ24oe30sIGFzc2lnbihjdHguJCRzY29wZS5jaGFuZ2VkIHx8IHt9LCBkZWZpbml0aW9uWzFdKGZuID8gZm4oY2hhbmdlZCkgOiB7fSkpKVxuICAgICAgICAgICAgOiBjdHguJCRzY29wZS5jaGFuZ2VkIHx8IHt9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZCh0YXJnZXQsIG5vZGUpIHtcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbnNlcnQodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZShub2RlLCBhbmNob3IgfHwgbnVsbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRldGFjaChub2RlKSB7XG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZWxlbWVudChuYW1lKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0ZXh0KGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGRhdGEpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzcGFjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRleHQoJyAnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbGlzdGVuKG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGlsZHJlbihlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2Rlcyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldF9kYXRhKHRleHQsIGRhdGEpIHtcbiAgICAgICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICAgICAgaWYgKHRleHQuZGF0YSAhPT0gZGF0YSlcbiAgICAgICAgICAgIHRleHQuZGF0YSA9IGRhdGE7XG4gICAgfVxuXG4gICAgbGV0IGN1cnJlbnRfY29tcG9uZW50O1xuICAgIGZ1bmN0aW9uIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgY3VycmVudF9jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldF9jdXJyZW50X2NvbXBvbmVudCgpIHtcbiAgICAgICAgaWYgKCFjdXJyZW50X2NvbXBvbmVudClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRnVuY3Rpb24gY2FsbGVkIG91dHNpZGUgY29tcG9uZW50IGluaXRpYWxpemF0aW9uYCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50X2NvbXBvbmVudDtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VudChmbikge1xuICAgICAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9tb3VudC5wdXNoKGZuKTtcbiAgICB9XG5cbiAgICBjb25zdCBkaXJ0eV9jb21wb25lbnRzID0gW107XG4gICAgY29uc3QgcmVzb2x2ZWRfcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGxldCB1cGRhdGVfc2NoZWR1bGVkID0gZmFsc2U7XG4gICAgY29uc3QgYmluZGluZ19jYWxsYmFja3MgPSBbXTtcbiAgICBjb25zdCByZW5kZXJfY2FsbGJhY2tzID0gW107XG4gICAgY29uc3QgZmx1c2hfY2FsbGJhY2tzID0gW107XG4gICAgZnVuY3Rpb24gc2NoZWR1bGVfdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXVwZGF0ZV9zY2hlZHVsZWQpIHtcbiAgICAgICAgICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVzb2x2ZWRfcHJvbWlzZS50aGVuKGZsdXNoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRfcmVuZGVyX2NhbGxiYWNrKGZuKSB7XG4gICAgICAgIHJlbmRlcl9jYWxsYmFja3MucHVzaChmbik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgICAgICBjb25zdCBzZWVuX2NhbGxiYWNrcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgLy8gZmlyc3QsIGNhbGwgYmVmb3JlVXBkYXRlIGZ1bmN0aW9uc1xuICAgICAgICAgICAgLy8gYW5kIHVwZGF0ZSBjb21wb25lbnRzXG4gICAgICAgICAgICB3aGlsZSAoZGlydHlfY29tcG9uZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSBkaXJ0eV9jb21wb25lbnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlKGNvbXBvbmVudC4kJCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoYmluZGluZ19jYWxsYmFja3MubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGJpbmRpbmdfY2FsbGJhY2tzLnNoaWZ0KCkoKTtcbiAgICAgICAgICAgIC8vIHRoZW4sIG9uY2UgY29tcG9uZW50cyBhcmUgdXBkYXRlZCwgY2FsbFxuICAgICAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxuICAgICAgICAgICAgLy8gc3Vic2VxdWVudCB1cGRhdGVzLi4uXG4gICAgICAgICAgICB3aGlsZSAocmVuZGVyX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3MucG9wKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWVuX2NhbGxiYWNrcy5oYXMoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIC4uLnNvIGd1YXJkIGFnYWluc3QgaW5maW5pdGUgbG9vcHNcbiAgICAgICAgICAgICAgICAgICAgc2Vlbl9jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGRpcnR5X2NvbXBvbmVudHMubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZsdXNoX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlKCQkKSB7XG4gICAgICAgIGlmICgkJC5mcmFnbWVudCkge1xuICAgICAgICAgICAgJCQudXBkYXRlKCQkLmRpcnR5KTtcbiAgICAgICAgICAgIHJ1bl9hbGwoJCQuYmVmb3JlX3JlbmRlcik7XG4gICAgICAgICAgICAkJC5mcmFnbWVudC5wKCQkLmRpcnR5LCAkJC5jdHgpO1xuICAgICAgICAgICAgJCQuZGlydHkgPSBudWxsO1xuICAgICAgICAgICAgJCQuYWZ0ZXJfcmVuZGVyLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgdGFyZ2V0LCBhbmNob3IpIHtcbiAgICAgICAgY29uc3QgeyBmcmFnbWVudCwgb25fbW91bnQsIG9uX2Rlc3Ryb3ksIGFmdGVyX3JlbmRlciB9ID0gY29tcG9uZW50LiQkO1xuICAgICAgICBmcmFnbWVudC5tKHRhcmdldCwgYW5jaG9yKTtcbiAgICAgICAgLy8gb25Nb3VudCBoYXBwZW5zIGFmdGVyIHRoZSBpbml0aWFsIGFmdGVyVXBkYXRlLiBCZWNhdXNlXG4gICAgICAgIC8vIGFmdGVyVXBkYXRlIGNhbGxiYWNrcyBoYXBwZW4gaW4gcmV2ZXJzZSBvcmRlciAoaW5uZXIgZmlyc3QpXG4gICAgICAgIC8vIHdlIHNjaGVkdWxlIG9uTW91bnQgY2FsbGJhY2tzIGJlZm9yZSBhZnRlclVwZGF0ZSBjYWxsYmFja3NcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdfb25fZGVzdHJveSA9IG9uX21vdW50Lm1hcChydW4pLmZpbHRlcihpc19mdW5jdGlvbik7XG4gICAgICAgICAgICBpZiAob25fZGVzdHJveSkge1xuICAgICAgICAgICAgICAgIG9uX2Rlc3Ryb3kucHVzaCguLi5uZXdfb25fZGVzdHJveSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFZGdlIGNhc2UgLSBjb21wb25lbnQgd2FzIGRlc3Ryb3llZCBpbW1lZGlhdGVseSxcbiAgICAgICAgICAgICAgICAvLyBtb3N0IGxpa2VseSBhcyBhIHJlc3VsdCBvZiBhIGJpbmRpbmcgaW5pdGlhbGlzaW5nXG4gICAgICAgICAgICAgICAgcnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb25lbnQuJCQub25fbW91bnQgPSBbXTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFmdGVyX3JlbmRlci5mb3JFYWNoKGFkZF9yZW5kZXJfY2FsbGJhY2spO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZXN0cm95KGNvbXBvbmVudCwgZGV0YWNoaW5nKSB7XG4gICAgICAgIGlmIChjb21wb25lbnQuJCQpIHtcbiAgICAgICAgICAgIHJ1bl9hbGwoY29tcG9uZW50LiQkLm9uX2Rlc3Ryb3kpO1xuICAgICAgICAgICAgY29tcG9uZW50LiQkLmZyYWdtZW50LmQoZGV0YWNoaW5nKTtcbiAgICAgICAgICAgIC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cbiAgICAgICAgICAgIC8vIHByZXNlcnZlIGZpbmFsIHN0YXRlPylcbiAgICAgICAgICAgIGNvbXBvbmVudC4kJC5vbl9kZXN0cm95ID0gY29tcG9uZW50LiQkLmZyYWdtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGNvbXBvbmVudC4kJC5jdHggPSB7fTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwga2V5KSB7XG4gICAgICAgIGlmICghY29tcG9uZW50LiQkLmRpcnR5KSB7XG4gICAgICAgICAgICBkaXJ0eV9jb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgICAgIHNjaGVkdWxlX3VwZGF0ZSgpO1xuICAgICAgICAgICAgY29tcG9uZW50LiQkLmRpcnR5ID0gYmxhbmtfb2JqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50LiQkLmRpcnR5W2tleV0gPSB0cnVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbml0KGNvbXBvbmVudCwgb3B0aW9ucywgaW5zdGFuY2UsIGNyZWF0ZV9mcmFnbWVudCwgbm90X2VxdWFsJCQxLCBwcm9wX25hbWVzKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudF9jb21wb25lbnQgPSBjdXJyZW50X2NvbXBvbmVudDtcbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IHByb3BzID0gb3B0aW9ucy5wcm9wcyB8fCB7fTtcbiAgICAgICAgY29uc3QgJCQgPSBjb21wb25lbnQuJCQgPSB7XG4gICAgICAgICAgICBmcmFnbWVudDogbnVsbCxcbiAgICAgICAgICAgIGN0eDogbnVsbCxcbiAgICAgICAgICAgIC8vIHN0YXRlXG4gICAgICAgICAgICBwcm9wczogcHJvcF9uYW1lcyxcbiAgICAgICAgICAgIHVwZGF0ZTogbm9vcCxcbiAgICAgICAgICAgIG5vdF9lcXVhbDogbm90X2VxdWFsJCQxLFxuICAgICAgICAgICAgYm91bmQ6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICAgICAgLy8gbGlmZWN5Y2xlXG4gICAgICAgICAgICBvbl9tb3VudDogW10sXG4gICAgICAgICAgICBvbl9kZXN0cm95OiBbXSxcbiAgICAgICAgICAgIGJlZm9yZV9yZW5kZXI6IFtdLFxuICAgICAgICAgICAgYWZ0ZXJfcmVuZGVyOiBbXSxcbiAgICAgICAgICAgIGNvbnRleHQ6IG5ldyBNYXAocGFyZW50X2NvbXBvbmVudCA/IHBhcmVudF9jb21wb25lbnQuJCQuY29udGV4dCA6IFtdKSxcbiAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgICAgIGRpcnR5OiBudWxsXG4gICAgICAgIH07XG4gICAgICAgIGxldCByZWFkeSA9IGZhbHNlO1xuICAgICAgICAkJC5jdHggPSBpbnN0YW5jZVxuICAgICAgICAgICAgPyBpbnN0YW5jZShjb21wb25lbnQsIHByb3BzLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICgkJC5jdHggJiYgbm90X2VxdWFsJCQxKCQkLmN0eFtrZXldLCAkJC5jdHhba2V5XSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJCQuYm91bmRba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgICAgICQkLmJvdW5kW2tleV0odmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhZHkpXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWtlX2RpcnR5KGNvbXBvbmVudCwga2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgOiBwcm9wcztcbiAgICAgICAgJCQudXBkYXRlKCk7XG4gICAgICAgIHJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgcnVuX2FsbCgkJC5iZWZvcmVfcmVuZGVyKTtcbiAgICAgICAgJCQuZnJhZ21lbnQgPSBjcmVhdGVfZnJhZ21lbnQoJCQuY3R4KTtcbiAgICAgICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5oeWRyYXRlKSB7XG4gICAgICAgICAgICAgICAgJCQuZnJhZ21lbnQubChjaGlsZHJlbihvcHRpb25zLnRhcmdldCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJCQuZnJhZ21lbnQuYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaW50cm8gJiYgY29tcG9uZW50LiQkLmZyYWdtZW50LmkpXG4gICAgICAgICAgICAgICAgY29tcG9uZW50LiQkLmZyYWdtZW50LmkoKTtcbiAgICAgICAgICAgIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIG9wdGlvbnMudGFyZ2V0LCBvcHRpb25zLmFuY2hvcik7XG4gICAgICAgICAgICBmbHVzaCgpO1xuICAgICAgICB9XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbiAgICB9XG4gICAgY2xhc3MgU3ZlbHRlQ29tcG9uZW50IHtcbiAgICAgICAgJGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBkZXN0cm95KHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgICAgIH1cbiAgICAgICAgJG9uKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgICRzZXQoKSB7XG4gICAgICAgICAgICAvLyBvdmVycmlkZGVuIGJ5IGluc3RhbmNlLCBpZiBpdCBoYXMgcHJvcHNcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGFzcyBTdmVsdGVDb21wb25lbnREZXYgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMgfHwgKCFvcHRpb25zLnRhcmdldCAmJiAhb3B0aW9ucy4kJGlubGluZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCd0YXJnZXQnIGlzIGEgcmVxdWlyZWQgb3B0aW9uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICB9XG4gICAgICAgICRkZXN0cm95KCkge1xuICAgICAgICAgICAgc3VwZXIuJGRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuJGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb21wb25lbnQgd2FzIGFscmVhZHkgZGVzdHJveWVkYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGBXcml0YWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgYm90aCB1cGRhdGluZyBhbmQgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gICAgICogQHBhcmFtIHsqPX12YWx1ZSBpbml0aWFsIHZhbHVlXG4gICAgICogQHBhcmFtIHtTdGFydFN0b3BOb3RpZmllcj19c3RhcnQgc3RhcnQgYW5kIHN0b3Agbm90aWZpY2F0aW9ucyBmb3Igc3Vic2NyaXB0aW9uc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHdyaXRhYmxlKHZhbHVlLCBzdGFydCA9IG5vb3ApIHtcbiAgICAgICAgbGV0IHN0b3A7XG4gICAgICAgIGNvbnN0IHN1YnNjcmliZXJzID0gW107XG4gICAgICAgIGZ1bmN0aW9uIHNldChuZXdfdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChzYWZlX25vdF9lcXVhbCh2YWx1ZSwgbmV3X3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbmV3X3ZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghc3RvcCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vIG5vdCByZWFkeVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVycy5mb3JFYWNoKChzKSA9PiBzWzFdKCkpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goKHMpID0+IHNbMF0odmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiB1cGRhdGUoZm4pIHtcbiAgICAgICAgICAgIHNldChmbih2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHN1YnNjcmliZShydW4sIGludmFsaWRhdGUgPSBub29wKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJzY3JpYmVyID0gW3J1biwgaW52YWxpZGF0ZV07XG4gICAgICAgICAgICBzdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHN0b3AgPSBzdGFydChzZXQpIHx8IG5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBydW4odmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHN1YnNjcmliZXJzLmluZGV4T2Yoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHNldCwgdXBkYXRlLCBzdWJzY3JpYmUgfTtcbiAgICB9XG5cbiAgICAvKiBzcmMvQ291bnRlci5zdmVsdGUgZ2VuZXJhdGVkIGJ5IFN2ZWx0ZSB2My40LjQgKi9cblxuICAgIGNvbnN0IGZpbGUgPSBcInNyYy9Db3VudGVyLnN2ZWx0ZVwiO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlX2ZyYWdtZW50KGN0eCkge1xuICAgIFx0dmFyIGRpdjEsIHQwLCB0MSwgZGl2MCwgdDIsIHQzLCBidXR0b24wLCB0NSwgYnV0dG9uMSwgY3VycmVudCwgZGlzcG9zZTtcblxuICAgIFx0Y29uc3QgZGVmYXVsdF9zbG90XzEgPSBjdHguJCRzbG90cy5kZWZhdWx0O1xuICAgIFx0Y29uc3QgZGVmYXVsdF9zbG90ID0gY3JlYXRlX3Nsb3QoZGVmYXVsdF9zbG90XzEsIGN0eCwgbnVsbCk7XG5cbiAgICBcdHJldHVybiB7XG4gICAgXHRcdGM6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICBcdFx0XHRkaXYxID0gZWxlbWVudChcImRpdlwiKTtcblxuICAgIFx0XHRcdGlmICghZGVmYXVsdF9zbG90KSB7XG4gICAgXHRcdFx0XHR0MCA9IHRleHQoXCJEZWZhdWx0IENvdW50ZXJcIik7XG4gICAgXHRcdFx0fVxuXG4gICAgXHRcdFx0aWYgKGRlZmF1bHRfc2xvdCkgZGVmYXVsdF9zbG90LmMoKTtcbiAgICBcdFx0XHR0MSA9IHNwYWNlKCk7XG4gICAgXHRcdFx0ZGl2MCA9IGVsZW1lbnQoXCJkaXZcIik7XG4gICAgXHRcdFx0dDIgPSB0ZXh0KGN0eC52YWx1ZSk7XG4gICAgXHRcdFx0dDMgPSBzcGFjZSgpO1xuICAgIFx0XHRcdGJ1dHRvbjAgPSBlbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIFx0XHRcdGJ1dHRvbjAudGV4dENvbnRlbnQgPSBcIitcIjtcbiAgICBcdFx0XHR0NSA9IHNwYWNlKCk7XG4gICAgXHRcdFx0YnV0dG9uMSA9IGVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgXHRcdFx0YnV0dG9uMS50ZXh0Q29udGVudCA9IFwiLVwiO1xuXG4gICAgXHRcdFx0YWRkX2xvY2F0aW9uKGJ1dHRvbjAsIGZpbGUsIDQsIDQsIDYxKTtcbiAgICBcdFx0XHRhZGRfbG9jYXRpb24oYnV0dG9uMSwgZmlsZSwgNSwgNCwgMTE3KTtcbiAgICBcdFx0XHRhZGRfbG9jYXRpb24oZGl2MCwgZmlsZSwgMiwgMiwgMzkpO1xuICAgIFx0XHRcdGFkZF9sb2NhdGlvbihkaXYxLCBmaWxlLCAwLCAwLCAwKTtcblxuICAgIFx0XHRcdGRpc3Bvc2UgPSBbXG4gICAgXHRcdFx0XHRsaXN0ZW4oYnV0dG9uMCwgXCJjbGlja1wiLCBjdHguY2xpY2tfaGFuZGxlciksXG4gICAgXHRcdFx0XHRsaXN0ZW4oYnV0dG9uMSwgXCJjbGlja1wiLCBjdHguY2xpY2tfaGFuZGxlcl8xKVxuICAgIFx0XHRcdF07XG4gICAgXHRcdH0sXG5cbiAgICBcdFx0bDogZnVuY3Rpb24gY2xhaW0obm9kZXMpIHtcbiAgICBcdFx0XHRpZiAoZGVmYXVsdF9zbG90KSBkZWZhdWx0X3Nsb3QubChkaXYxX25vZGVzKTtcbiAgICBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zLmh5ZHJhdGUgb25seSB3b3JrcyBpZiB0aGUgY29tcG9uZW50IHdhcyBjb21waWxlZCB3aXRoIHRoZSBgaHlkcmF0YWJsZTogdHJ1ZWAgb3B0aW9uXCIpO1xuICAgIFx0XHR9LFxuXG4gICAgXHRcdG06IGZ1bmN0aW9uIG1vdW50KHRhcmdldCwgYW5jaG9yKSB7XG4gICAgXHRcdFx0aW5zZXJ0KHRhcmdldCwgZGl2MSwgYW5jaG9yKTtcblxuICAgIFx0XHRcdGlmICghZGVmYXVsdF9zbG90KSB7XG4gICAgXHRcdFx0XHRhcHBlbmQoZGl2MSwgdDApO1xuICAgIFx0XHRcdH1cblxuICAgIFx0XHRcdGVsc2Uge1xuICAgIFx0XHRcdFx0ZGVmYXVsdF9zbG90Lm0oZGl2MSwgbnVsbCk7XG4gICAgXHRcdFx0fVxuXG4gICAgXHRcdFx0YXBwZW5kKGRpdjEsIHQxKTtcbiAgICBcdFx0XHRhcHBlbmQoZGl2MSwgZGl2MCk7XG4gICAgXHRcdFx0YXBwZW5kKGRpdjAsIHQyKTtcbiAgICBcdFx0XHRhcHBlbmQoZGl2MCwgdDMpO1xuICAgIFx0XHRcdGFwcGVuZChkaXYwLCBidXR0b24wKTtcbiAgICBcdFx0XHRhcHBlbmQoZGl2MCwgdDUpO1xuICAgIFx0XHRcdGFwcGVuZChkaXYwLCBidXR0b24xKTtcbiAgICBcdFx0XHRjdXJyZW50ID0gdHJ1ZTtcbiAgICBcdFx0fSxcblxuICAgIFx0XHRwOiBmdW5jdGlvbiB1cGRhdGUoY2hhbmdlZCwgY3R4KSB7XG4gICAgXHRcdFx0aWYgKGRlZmF1bHRfc2xvdCAmJiBkZWZhdWx0X3Nsb3QucCAmJiBjaGFuZ2VkLiQkc2NvcGUpIHtcbiAgICBcdFx0XHRcdGRlZmF1bHRfc2xvdC5wKGdldF9zbG90X2NoYW5nZXMoZGVmYXVsdF9zbG90XzEsIGN0eCwgY2hhbmdlZCwgbnVsbCksIGdldF9zbG90X2NvbnRleHQoZGVmYXVsdF9zbG90XzEsIGN0eCwgbnVsbCkpO1xuICAgIFx0XHRcdH1cblxuICAgIFx0XHRcdGlmICghY3VycmVudCB8fCBjaGFuZ2VkLnZhbHVlKSB7XG4gICAgXHRcdFx0XHRzZXRfZGF0YSh0MiwgY3R4LnZhbHVlKTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdH0sXG5cbiAgICBcdFx0aTogZnVuY3Rpb24gaW50cm8obG9jYWwpIHtcbiAgICBcdFx0XHRpZiAoY3VycmVudCkgcmV0dXJuO1xuICAgIFx0XHRcdGlmIChkZWZhdWx0X3Nsb3QgJiYgZGVmYXVsdF9zbG90LmkpIGRlZmF1bHRfc2xvdC5pKGxvY2FsKTtcbiAgICBcdFx0XHRjdXJyZW50ID0gdHJ1ZTtcbiAgICBcdFx0fSxcblxuICAgIFx0XHRvOiBmdW5jdGlvbiBvdXRybyhsb2NhbCkge1xuICAgIFx0XHRcdGlmIChkZWZhdWx0X3Nsb3QgJiYgZGVmYXVsdF9zbG90Lm8pIGRlZmF1bHRfc2xvdC5vKGxvY2FsKTtcbiAgICBcdFx0XHRjdXJyZW50ID0gZmFsc2U7XG4gICAgXHRcdH0sXG5cbiAgICBcdFx0ZDogZnVuY3Rpb24gZGVzdHJveShkZXRhY2hpbmcpIHtcbiAgICBcdFx0XHRpZiAoZGV0YWNoaW5nKSB7XG4gICAgXHRcdFx0XHRkZXRhY2goZGl2MSk7XG4gICAgXHRcdFx0fVxuXG4gICAgXHRcdFx0aWYgKGRlZmF1bHRfc2xvdCkgZGVmYXVsdF9zbG90LmQoZGV0YWNoaW5nKTtcbiAgICBcdFx0XHRydW5fYWxsKGRpc3Bvc2UpO1xuICAgIFx0XHR9XG4gICAgXHR9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbmNlKCQkc2VsZiwgJCRwcm9wcywgJCRpbnZhbGlkYXRlKSB7XG4gICAgXHRsZXQgeyB2YWx1ZSA9IDAsIHN0ZXAgPSAxIH0gPSAkJHByb3BzO1xuXG4gICAgXHRjb25zdCB3cml0YWJsZV9wcm9wcyA9IFsndmFsdWUnLCAnc3RlcCddO1xuICAgIFx0T2JqZWN0LmtleXMoJCRwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xuICAgIFx0XHRpZiAoIXdyaXRhYmxlX3Byb3BzLmluY2x1ZGVzKGtleSkgJiYgIWtleS5zdGFydHNXaXRoKCckJCcpKSBjb25zb2xlLndhcm4oYDxDb3VudGVyPiB3YXMgY3JlYXRlZCB3aXRoIHVua25vd24gcHJvcCAnJHtrZXl9J2ApO1xuICAgIFx0fSk7XG5cbiAgICBcdGxldCB7ICQkc2xvdHMgPSB7fSwgJCRzY29wZSB9ID0gJCRwcm9wcztcblxuICAgIFx0ZnVuY3Rpb24gY2xpY2tfaGFuZGxlcigpIHtcbiAgICBcdFx0Y29uc3QgJCRyZXN1bHQgPSAodmFsdWUgKz0gc3RlcCk7XG4gICAgXHRcdCQkaW52YWxpZGF0ZSgndmFsdWUnLCB2YWx1ZSk7XG4gICAgXHRcdHJldHVybiAkJHJlc3VsdDtcbiAgICBcdH1cblxuICAgIFx0ZnVuY3Rpb24gY2xpY2tfaGFuZGxlcl8xKCkge1xuICAgIFx0XHRjb25zdCAkJHJlc3VsdCA9ICh2YWx1ZSAtPSBzdGVwKTtcbiAgICBcdFx0JCRpbnZhbGlkYXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICBcdFx0cmV0dXJuICQkcmVzdWx0O1xuICAgIFx0fVxuXG4gICAgXHQkJHNlbGYuJHNldCA9ICQkcHJvcHMgPT4ge1xuICAgIFx0XHRpZiAoJ3ZhbHVlJyBpbiAkJHByb3BzKSAkJGludmFsaWRhdGUoJ3ZhbHVlJywgdmFsdWUgPSAkJHByb3BzLnZhbHVlKTtcbiAgICBcdFx0aWYgKCdzdGVwJyBpbiAkJHByb3BzKSAkJGludmFsaWRhdGUoJ3N0ZXAnLCBzdGVwID0gJCRwcm9wcy5zdGVwKTtcbiAgICBcdFx0aWYgKCckJHNjb3BlJyBpbiAkJHByb3BzKSAkJGludmFsaWRhdGUoJyQkc2NvcGUnLCAkJHNjb3BlID0gJCRwcm9wcy4kJHNjb3BlKTtcbiAgICBcdH07XG5cbiAgICBcdHJldHVybiB7XG4gICAgXHRcdHZhbHVlLFxuICAgIFx0XHRzdGVwLFxuICAgIFx0XHRjbGlja19oYW5kbGVyLFxuICAgIFx0XHRjbGlja19oYW5kbGVyXzEsXG4gICAgXHRcdCQkc2xvdHMsXG4gICAgXHRcdCQkc2NvcGVcbiAgICBcdH07XG4gICAgfVxuXG4gICAgY2xhc3MgQ291bnRlciBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudERldiB7XG4gICAgXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgXHRcdHN1cGVyKG9wdGlvbnMpO1xuICAgIFx0XHRpbml0KHRoaXMsIG9wdGlvbnMsIGluc3RhbmNlLCBjcmVhdGVfZnJhZ21lbnQsIHNhZmVfbm90X2VxdWFsLCBbXCJ2YWx1ZVwiLCBcInN0ZXBcIl0pO1xuICAgIFx0fVxuXG4gICAgXHRnZXQgdmFsdWUoKSB7XG4gICAgXHRcdHRocm93IG5ldyBFcnJvcihcIjxDb3VudGVyPjogUHJvcHMgY2Fubm90IGJlIHJlYWQgZGlyZWN0bHkgZnJvbSB0aGUgY29tcG9uZW50IGluc3RhbmNlIHVubGVzcyBjb21waWxpbmcgd2l0aCAnYWNjZXNzb3JzOiB0cnVlJyBvciAnPHN2ZWx0ZTpvcHRpb25zIGFjY2Vzc29ycy8+J1wiKTtcbiAgICBcdH1cblxuICAgIFx0c2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgXHRcdHRocm93IG5ldyBFcnJvcihcIjxDb3VudGVyPjogUHJvcHMgY2Fubm90IGJlIHNldCBkaXJlY3RseSBvbiB0aGUgY29tcG9uZW50IGluc3RhbmNlIHVubGVzcyBjb21waWxpbmcgd2l0aCAnYWNjZXNzb3JzOiB0cnVlJyBvciAnPHN2ZWx0ZTpvcHRpb25zIGFjY2Vzc29ycy8+J1wiKTtcbiAgICBcdH1cblxuICAgIFx0Z2V0IHN0ZXAoKSB7XG4gICAgXHRcdHRocm93IG5ldyBFcnJvcihcIjxDb3VudGVyPjogUHJvcHMgY2Fubm90IGJlIHJlYWQgZGlyZWN0bHkgZnJvbSB0aGUgY29tcG9uZW50IGluc3RhbmNlIHVubGVzcyBjb21waWxpbmcgd2l0aCAnYWNjZXNzb3JzOiB0cnVlJyBvciAnPHN2ZWx0ZTpvcHRpb25zIGFjY2Vzc29ycy8+J1wiKTtcbiAgICBcdH1cblxuICAgIFx0c2V0IHN0ZXAodmFsdWUpIHtcbiAgICBcdFx0dGhyb3cgbmV3IEVycm9yKFwiPENvdW50ZXI+OiBQcm9wcyBjYW5ub3QgYmUgc2V0IGRpcmVjdGx5IG9uIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgdW5sZXNzIGNvbXBpbGluZyB3aXRoICdhY2Nlc3NvcnM6IHRydWUnIG9yICc8c3ZlbHRlOm9wdGlvbnMgYWNjZXNzb3JzLz4nXCIpO1xuICAgIFx0fVxuICAgIH1cblxuICAgIC8qIHNyYy9BcHAuc3ZlbHRlIGdlbmVyYXRlZCBieSBTdmVsdGUgdjMuNC40ICovXG5cbiAgICBjb25zdCBmaWxlJDEgPSBcInNyYy9BcHAuc3ZlbHRlXCI7XG5cbiAgICAvLyAoNToyKSA8Q291bnRlciB2YWx1ZT17MX0+XG4gICAgZnVuY3Rpb24gY3JlYXRlX2RlZmF1bHRfc2xvdF8xKGN0eCkge1xuICAgIFx0dmFyIHQ7XG5cbiAgICBcdHJldHVybiB7XG4gICAgXHRcdGM6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICBcdFx0XHR0ID0gdGV4dChcIkNvdW50ZXIgMVwiKTtcbiAgICBcdFx0fSxcblxuICAgIFx0XHRtOiBmdW5jdGlvbiBtb3VudCh0YXJnZXQsIGFuY2hvcikge1xuICAgIFx0XHRcdGluc2VydCh0YXJnZXQsIHQsIGFuY2hvcik7XG4gICAgXHRcdH0sXG5cbiAgICBcdFx0ZDogZnVuY3Rpb24gZGVzdHJveShkZXRhY2hpbmcpIHtcbiAgICBcdFx0XHRpZiAoZGV0YWNoaW5nKSB7XG4gICAgXHRcdFx0XHRkZXRhY2godCk7XG4gICAgXHRcdFx0fVxuICAgIFx0XHR9XG4gICAgXHR9O1xuICAgIH1cblxuICAgIC8vICg2OjIpIDxDb3VudGVyIHZhbHVlPXskY291bnR9IHN0ZXA9ezN9PlxuICAgIGZ1bmN0aW9uIGNyZWF0ZV9kZWZhdWx0X3Nsb3QoY3R4KSB7XG4gICAgXHR2YXIgdDtcblxuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0YzogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIFx0XHRcdHQgPSB0ZXh0KFwiQ291bnRlciAyXCIpO1xuICAgIFx0XHR9LFxuXG4gICAgXHRcdG06IGZ1bmN0aW9uIG1vdW50KHRhcmdldCwgYW5jaG9yKSB7XG4gICAgXHRcdFx0aW5zZXJ0KHRhcmdldCwgdCwgYW5jaG9yKTtcbiAgICBcdFx0fSxcblxuICAgIFx0XHRkOiBmdW5jdGlvbiBkZXN0cm95KGRldGFjaGluZykge1xuICAgIFx0XHRcdGlmIChkZXRhY2hpbmcpIHtcbiAgICBcdFx0XHRcdGRldGFjaCh0KTtcbiAgICBcdFx0XHR9XG4gICAgXHRcdH1cbiAgICBcdH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlX2ZyYWdtZW50JDEoY3R4KSB7XG4gICAgXHR2YXIgZGl2LCBoMSwgdDAsIHQxLCB0MiwgdDMsIHAsIHQ0LCB0NSwgY3VycmVudDtcblxuICAgIFx0dmFyIGNvdW50ZXIwID0gbmV3IENvdW50ZXIoeyAkJGlubGluZTogdHJ1ZSB9KTtcblxuICAgIFx0dmFyIGNvdW50ZXIxID0gbmV3IENvdW50ZXIoe1xuICAgIFx0XHRwcm9wczoge1xuICAgIFx0XHR2YWx1ZTogMSxcbiAgICBcdFx0JCRzbG90czogeyBkZWZhdWx0OiBbY3JlYXRlX2RlZmF1bHRfc2xvdF8xXSB9LFxuICAgIFx0XHQkJHNjb3BlOiB7IGN0eCB9XG4gICAgXHR9LFxuICAgIFx0XHQkJGlubGluZTogdHJ1ZVxuICAgIFx0fSk7XG5cbiAgICBcdHZhciBjb3VudGVyMiA9IG5ldyBDb3VudGVyKHtcbiAgICBcdFx0cHJvcHM6IHtcbiAgICBcdFx0dmFsdWU6IGN0eC4kY291bnQsXG4gICAgXHRcdHN0ZXA6IDMsXG4gICAgXHRcdCQkc2xvdHM6IHsgZGVmYXVsdDogW2NyZWF0ZV9kZWZhdWx0X3Nsb3RdIH0sXG4gICAgXHRcdCQkc2NvcGU6IHsgY3R4IH1cbiAgICBcdH0sXG4gICAgXHRcdCQkaW5saW5lOiB0cnVlXG4gICAgXHR9KTtcblxuICAgIFx0cmV0dXJuIHtcbiAgICBcdFx0YzogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIFx0XHRcdGRpdiA9IGVsZW1lbnQoXCJkaXZcIik7XG4gICAgXHRcdFx0aDEgPSBlbGVtZW50KFwiaDFcIik7XG4gICAgXHRcdFx0dDAgPSB0ZXh0KFwiSGVsbG8gXCIpO1xuICAgIFx0XHRcdHQxID0gdGV4dChjdHgubmFtZSk7XG4gICAgXHRcdFx0dDIgPSB0ZXh0KFwiIVwiKTtcbiAgICBcdFx0XHR0MyA9IHNwYWNlKCk7XG4gICAgXHRcdFx0cCA9IGVsZW1lbnQoXCJwXCIpO1xuICAgIFx0XHRcdGNvdW50ZXIwLiQkLmZyYWdtZW50LmMoKTtcbiAgICBcdFx0XHR0NCA9IHNwYWNlKCk7XG4gICAgXHRcdFx0Y291bnRlcjEuJCQuZnJhZ21lbnQuYygpO1xuICAgIFx0XHRcdHQ1ID0gc3BhY2UoKTtcbiAgICBcdFx0XHRjb3VudGVyMi4kJC5mcmFnbWVudC5jKCk7XG4gICAgXHRcdFx0aDEuY2xhc3NOYW1lID0gXCJzdmVsdGUtMXVjYnozNlwiO1xuICAgIFx0XHRcdGFkZF9sb2NhdGlvbihoMSwgZmlsZSQxLCAxLCAwLCA2KTtcbiAgICBcdFx0XHRhZGRfbG9jYXRpb24ocCwgZmlsZSQxLCAyLCAwLCAyOSk7XG4gICAgXHRcdFx0YWRkX2xvY2F0aW9uKGRpdiwgZmlsZSQxLCAwLCAwLCAwKTtcbiAgICBcdFx0fSxcblxuICAgIFx0XHRsOiBmdW5jdGlvbiBjbGFpbShub2Rlcykge1xuICAgIFx0XHRcdHRocm93IG5ldyBFcnJvcihcIm9wdGlvbnMuaHlkcmF0ZSBvbmx5IHdvcmtzIGlmIHRoZSBjb21wb25lbnQgd2FzIGNvbXBpbGVkIHdpdGggdGhlIGBoeWRyYXRhYmxlOiB0cnVlYCBvcHRpb25cIik7XG4gICAgXHRcdH0sXG5cbiAgICBcdFx0bTogZnVuY3Rpb24gbW91bnQodGFyZ2V0LCBhbmNob3IpIHtcbiAgICBcdFx0XHRpbnNlcnQodGFyZ2V0LCBkaXYsIGFuY2hvcik7XG4gICAgXHRcdFx0YXBwZW5kKGRpdiwgaDEpO1xuICAgIFx0XHRcdGFwcGVuZChoMSwgdDApO1xuICAgIFx0XHRcdGFwcGVuZChoMSwgdDEpO1xuICAgIFx0XHRcdGFwcGVuZChoMSwgdDIpO1xuICAgIFx0XHRcdGFwcGVuZChkaXYsIHQzKTtcbiAgICBcdFx0XHRhcHBlbmQoZGl2LCBwKTtcbiAgICBcdFx0XHRtb3VudF9jb21wb25lbnQoY291bnRlcjAsIHAsIG51bGwpO1xuICAgIFx0XHRcdGFwcGVuZChwLCB0NCk7XG4gICAgXHRcdFx0bW91bnRfY29tcG9uZW50KGNvdW50ZXIxLCBwLCBudWxsKTtcbiAgICBcdFx0XHRhcHBlbmQocCwgdDUpO1xuICAgIFx0XHRcdG1vdW50X2NvbXBvbmVudChjb3VudGVyMiwgcCwgbnVsbCk7XG4gICAgXHRcdFx0Y3VycmVudCA9IHRydWU7XG4gICAgXHRcdH0sXG5cbiAgICBcdFx0cDogZnVuY3Rpb24gdXBkYXRlKGNoYW5nZWQsIGN0eCkge1xuICAgIFx0XHRcdGlmICghY3VycmVudCB8fCBjaGFuZ2VkLm5hbWUpIHtcbiAgICBcdFx0XHRcdHNldF9kYXRhKHQxLCBjdHgubmFtZSk7XG4gICAgXHRcdFx0fVxuXG4gICAgXHRcdFx0dmFyIGNvdW50ZXIxX2NoYW5nZXMgPSB7fTtcbiAgICBcdFx0XHRpZiAoY2hhbmdlZC4kJHNjb3BlKSBjb3VudGVyMV9jaGFuZ2VzLiQkc2NvcGUgPSB7IGNoYW5nZWQsIGN0eCB9O1xuICAgIFx0XHRcdGNvdW50ZXIxLiRzZXQoY291bnRlcjFfY2hhbmdlcyk7XG5cbiAgICBcdFx0XHR2YXIgY291bnRlcjJfY2hhbmdlcyA9IHt9O1xuICAgIFx0XHRcdGlmIChjaGFuZ2VkLiRjb3VudCkgY291bnRlcjJfY2hhbmdlcy52YWx1ZSA9IGN0eC4kY291bnQ7XG4gICAgXHRcdFx0aWYgKGNoYW5nZWQuJCRzY29wZSkgY291bnRlcjJfY2hhbmdlcy4kJHNjb3BlID0geyBjaGFuZ2VkLCBjdHggfTtcbiAgICBcdFx0XHRjb3VudGVyMi4kc2V0KGNvdW50ZXIyX2NoYW5nZXMpO1xuICAgIFx0XHR9LFxuXG4gICAgXHRcdGk6IGZ1bmN0aW9uIGludHJvKGxvY2FsKSB7XG4gICAgXHRcdFx0aWYgKGN1cnJlbnQpIHJldHVybjtcbiAgICBcdFx0XHRjb3VudGVyMC4kJC5mcmFnbWVudC5pKGxvY2FsKTtcblxuICAgIFx0XHRcdGNvdW50ZXIxLiQkLmZyYWdtZW50LmkobG9jYWwpO1xuXG4gICAgXHRcdFx0Y291bnRlcjIuJCQuZnJhZ21lbnQuaShsb2NhbCk7XG5cbiAgICBcdFx0XHRjdXJyZW50ID0gdHJ1ZTtcbiAgICBcdFx0fSxcblxuICAgIFx0XHRvOiBmdW5jdGlvbiBvdXRybyhsb2NhbCkge1xuICAgIFx0XHRcdGNvdW50ZXIwLiQkLmZyYWdtZW50Lm8obG9jYWwpO1xuICAgIFx0XHRcdGNvdW50ZXIxLiQkLmZyYWdtZW50Lm8obG9jYWwpO1xuICAgIFx0XHRcdGNvdW50ZXIyLiQkLmZyYWdtZW50Lm8obG9jYWwpO1xuICAgIFx0XHRcdGN1cnJlbnQgPSBmYWxzZTtcbiAgICBcdFx0fSxcblxuICAgIFx0XHRkOiBmdW5jdGlvbiBkZXN0cm95KGRldGFjaGluZykge1xuICAgIFx0XHRcdGlmIChkZXRhY2hpbmcpIHtcbiAgICBcdFx0XHRcdGRldGFjaChkaXYpO1xuICAgIFx0XHRcdH1cblxuICAgIFx0XHRcdGNvdW50ZXIwLiRkZXN0cm95KCk7XG5cbiAgICBcdFx0XHRjb3VudGVyMS4kZGVzdHJveSgpO1xuXG4gICAgXHRcdFx0Y291bnRlcjIuJGRlc3Ryb3koKTtcbiAgICBcdFx0fVxuICAgIFx0fTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YW5jZSQxKCQkc2VsZiwgJCRwcm9wcywgJCRpbnZhbGlkYXRlKSB7XG4gICAgXHRsZXQgJGNvdW50O1xuXG4gICAgXHRcbiAgICBjb25zdCBjb3VudCA9IHdyaXRhYmxlKDEwMCk7IHZhbGlkYXRlX3N0b3JlKGNvdW50LCAnY291bnQnKTsgc3Vic2NyaWJlKCQkc2VsZiwgY291bnQsICQkdmFsdWUgPT4geyAkY291bnQgPSAkJHZhbHVlOyAkJGludmFsaWRhdGUoJyRjb3VudCcsICRjb3VudCk7IH0pO1xuICAgIGxldCB7IG5hbWUgfSA9ICQkcHJvcHM7XG4gICAgb25Nb3VudCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXBwIG1vdW50ZWRcIik7XG4gICAgfSk7XG5cbiAgICBcdGNvbnN0IHdyaXRhYmxlX3Byb3BzID0gWyduYW1lJ107XG4gICAgXHRPYmplY3Qua2V5cygkJHByb3BzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgXHRcdGlmICghd3JpdGFibGVfcHJvcHMuaW5jbHVkZXMoa2V5KSAmJiAha2V5LnN0YXJ0c1dpdGgoJyQkJykpIGNvbnNvbGUud2FybihgPEFwcD4gd2FzIGNyZWF0ZWQgd2l0aCB1bmtub3duIHByb3AgJyR7a2V5fSdgKTtcbiAgICBcdH0pO1xuXG4gICAgXHQkJHNlbGYuJHNldCA9ICQkcHJvcHMgPT4ge1xuICAgIFx0XHRpZiAoJ25hbWUnIGluICQkcHJvcHMpICQkaW52YWxpZGF0ZSgnbmFtZScsIG5hbWUgPSAkJHByb3BzLm5hbWUpO1xuICAgIFx0fTtcblxuICAgIFx0cmV0dXJuIHsgY291bnQsIG5hbWUsICRjb3VudCB9O1xuICAgIH1cblxuICAgIGNsYXNzIEFwcCBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudERldiB7XG4gICAgXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgXHRcdHN1cGVyKG9wdGlvbnMpO1xuICAgIFx0XHRpbml0KHRoaXMsIG9wdGlvbnMsIGluc3RhbmNlJDEsIGNyZWF0ZV9mcmFnbWVudCQxLCBzYWZlX25vdF9lcXVhbCwgW1wibmFtZVwiXSk7XG5cbiAgICBcdFx0Y29uc3QgeyBjdHggfSA9IHRoaXMuJCQ7XG4gICAgXHRcdGNvbnN0IHByb3BzID0gb3B0aW9ucy5wcm9wcyB8fCB7fTtcbiAgICBcdFx0aWYgKGN0eC5uYW1lID09PSB1bmRlZmluZWQgJiYgISgnbmFtZScgaW4gcHJvcHMpKSB7XG4gICAgXHRcdFx0Y29uc29sZS53YXJuKFwiPEFwcD4gd2FzIGNyZWF0ZWQgd2l0aG91dCBleHBlY3RlZCBwcm9wICduYW1lJ1wiKTtcbiAgICBcdFx0fVxuICAgIFx0fVxuXG4gICAgXHRnZXQgbmFtZSgpIHtcbiAgICBcdFx0dGhyb3cgbmV3IEVycm9yKFwiPEFwcD46IFByb3BzIGNhbm5vdCBiZSByZWFkIGRpcmVjdGx5IGZyb20gdGhlIGNvbXBvbmVudCBpbnN0YW5jZSB1bmxlc3MgY29tcGlsaW5nIHdpdGggJ2FjY2Vzc29yczogdHJ1ZScgb3IgJzxzdmVsdGU6b3B0aW9ucyBhY2Nlc3NvcnMvPidcIik7XG4gICAgXHR9XG5cbiAgICBcdHNldCBuYW1lKHZhbHVlKSB7XG4gICAgXHRcdHRocm93IG5ldyBFcnJvcihcIjxBcHA+OiBQcm9wcyBjYW5ub3QgYmUgc2V0IGRpcmVjdGx5IG9uIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgdW5sZXNzIGNvbXBpbGluZyB3aXRoICdhY2Nlc3NvcnM6IHRydWUnIG9yICc8c3ZlbHRlOm9wdGlvbnMgYWNjZXNzb3JzLz4nXCIpO1xuICAgIFx0fVxuICAgIH1cblxuICAgIGNvbnN0IGFwcCA9IG5ldyBBcHAoe1xyXG4gICAgICAgIHRhcmdldDogZG9jdW1lbnQuYm9keSxcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBuYW1lOiBcIndvcmxkXCJcclxuICAgICAgICB9XHJcbiAgICB9KTtcblxuICAgIHJldHVybiBhcHA7XG5cbn0oKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idW5kbGUuanMubWFwXG4iXSwic291cmNlUm9vdCI6IiJ9