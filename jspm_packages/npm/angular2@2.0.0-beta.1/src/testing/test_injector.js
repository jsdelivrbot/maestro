/* */ 
'use strict';
var core_1 = require('../../core');
var animation_builder_1 = require('../animate/animation_builder');
var animation_builder_mock_1 = require('../mock/animation_builder_mock');
var resolved_metadata_cache_1 = require('../core/linker/resolved_metadata_cache');
var reflection_1 = require('../core/reflection/reflection');
var change_detection_1 = require('../core/change_detection/change_detection');
var exceptions_1 = require('../facade/exceptions');
var pipe_resolver_1 = require('../core/linker/pipe_resolver');
var xhr_1 = require('../compiler/xhr');
var dom_adapter_1 = require('../platform/dom/dom_adapter');
var directive_resolver_mock_1 = require('../mock/directive_resolver_mock');
var view_resolver_mock_1 = require('../mock/view_resolver_mock');
var mock_location_strategy_1 = require('../mock/mock_location_strategy');
var location_strategy_1 = require('../router/location_strategy');
var ng_zone_mock_1 = require('../mock/ng_zone_mock');
var test_component_builder_1 = require('./test_component_builder');
var common_dom_1 = require('../../platform/common_dom');
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var api_1 = require('../core/render/api');
var dom_tokens_1 = require('../platform/dom/dom_tokens');
var dom_renderer_1 = require('../platform/dom/dom_renderer');
var shared_styles_host_1 = require('../platform/dom/shared_styles_host');
var shared_styles_host_2 = require('../platform/dom/shared_styles_host');
var dom_events_1 = require('../platform/dom/events/dom_events');
var serializer_1 = require('../web_workers/shared/serializer');
var utils_1 = require('./utils');
var compiler_1 = require('../compiler/compiler');
var dynamic_component_loader_1 = require('../core/linker/dynamic_component_loader');
var view_manager_1 = require('../core/linker/view_manager');
function _getRootProviders() {
  return [core_1.provide(reflection_1.Reflector, {useValue: reflection_1.reflector})];
}
function _getAppBindings() {
  var appDoc;
  try {
    appDoc = dom_adapter_1.DOM.defaultDoc();
  } catch (e) {
    appDoc = null;
  }
  return [core_1.APPLICATION_COMMON_PROVIDERS, core_1.provide(change_detection_1.ChangeDetectorGenConfig, {useValue: new change_detection_1.ChangeDetectorGenConfig(true, false, false)}), core_1.provide(dom_tokens_1.DOCUMENT, {useValue: appDoc}), core_1.provide(dom_renderer_1.DomRootRenderer, {useClass: dom_renderer_1.DomRootRenderer_}), core_1.provide(api_1.RootRenderer, {useExisting: dom_renderer_1.DomRootRenderer}), core_1.provide(core_1.APP_ID, {useValue: 'a'}), shared_styles_host_1.DomSharedStylesHost, core_1.provide(shared_styles_host_2.SharedStylesHost, {useExisting: shared_styles_host_1.DomSharedStylesHost}), core_1.provide(core_1.AppViewManager, {useClass: view_manager_1.AppViewManager_}), serializer_1.Serializer, common_dom_1.ELEMENT_PROBE_PROVIDERS, resolved_metadata_cache_1.ResolvedMetadataCache, core_1.provide(core_1.DirectiveResolver, {useClass: directive_resolver_mock_1.MockDirectiveResolver}), core_1.provide(core_1.ViewResolver, {useClass: view_resolver_mock_1.MockViewResolver}), core_1.provide(change_detection_1.IterableDiffers, {useValue: change_detection_1.defaultIterableDiffers}), core_1.provide(change_detection_1.KeyValueDiffers, {useValue: change_detection_1.defaultKeyValueDiffers}), utils_1.Log, core_1.provide(core_1.DynamicComponentLoader, {useClass: dynamic_component_loader_1.DynamicComponentLoader_}), pipe_resolver_1.PipeResolver, core_1.provide(exceptions_1.ExceptionHandler, {useValue: new exceptions_1.ExceptionHandler(dom_adapter_1.DOM)}), core_1.provide(location_strategy_1.LocationStrategy, {useClass: mock_location_strategy_1.MockLocationStrategy}), core_1.provide(xhr_1.XHR, {useClass: dom_adapter_1.DOM.getXHR()}), test_component_builder_1.TestComponentBuilder, core_1.provide(core_1.NgZone, {useClass: ng_zone_mock_1.MockNgZone}), core_1.provide(animation_builder_1.AnimationBuilder, {useClass: animation_builder_mock_1.MockAnimationBuilder}), common_dom_1.EventManager, new core_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, {
    useClass: dom_events_1.DomEventsPlugin,
    multi: true
  })];
}
function _runtimeCompilerBindings() {
  return [core_1.provide(xhr_1.XHR, {useClass: dom_adapter_1.DOM.getXHR()}), compiler_1.COMPILER_PROVIDERS];
}
var TestInjector = (function() {
  function TestInjector() {
    this._instantiated = false;
    this._injector = null;
    this._providers = [];
  }
  TestInjector.prototype.reset = function() {
    this._injector = null;
    this._providers = [];
    this._instantiated = false;
  };
  TestInjector.prototype.addProviders = function(providers) {
    if (this._instantiated) {
      throw new exceptions_1.BaseException('Cannot add providers after test injector is instantiated');
    }
    this._providers = collection_1.ListWrapper.concat(this._providers, providers);
  };
  TestInjector.prototype.createInjector = function() {
    var rootInjector = core_1.Injector.resolveAndCreate(_getRootProviders());
    this._injector = rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(collection_1.ListWrapper.concat(_getAppBindings(), _runtimeCompilerBindings()), this._providers));
    this._instantiated = true;
    return this._injector;
  };
  TestInjector.prototype.execute = function(fn) {
    if (!this._instantiated) {
      this.createInjector();
    }
    return fn.execute(this._injector);
  };
  return TestInjector;
})();
exports.TestInjector = TestInjector;
var _testInjector = null;
function getTestInjector() {
  if (_testInjector == null) {
    _testInjector = new TestInjector();
  }
  return _testInjector;
}
exports.getTestInjector = getTestInjector;
function createTestInjector(providers) {
  var rootInjector = core_1.Injector.resolveAndCreate(_getRootProviders());
  return rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(_getAppBindings(), providers));
}
exports.createTestInjector = createTestInjector;
function createTestInjectorWithRuntimeCompiler(providers) {
  return createTestInjector(collection_1.ListWrapper.concat(_runtimeCompilerBindings(), providers));
}
exports.createTestInjectorWithRuntimeCompiler = createTestInjectorWithRuntimeCompiler;
function inject(tokens, fn) {
  return new FunctionWithParamTokens(tokens, fn, false);
}
exports.inject = inject;
function injectAsync(tokens, fn) {
  return new FunctionWithParamTokens(tokens, fn, true);
}
exports.injectAsync = injectAsync;
var FunctionWithParamTokens = (function() {
  function FunctionWithParamTokens(_tokens, _fn, isAsync) {
    this._tokens = _tokens;
    this._fn = _fn;
    this.isAsync = isAsync;
  }
  FunctionWithParamTokens.prototype.execute = function(injector) {
    var params = this._tokens.map(function(t) {
      return injector.get(t);
    });
    return lang_1.FunctionWrapper.apply(this._fn, params);
  };
  FunctionWithParamTokens.prototype.hasToken = function(token) {
    return this._tokens.indexOf(token) > -1;
  };
  return FunctionWithParamTokens;
})();
exports.FunctionWithParamTokens = FunctionWithParamTokens;
