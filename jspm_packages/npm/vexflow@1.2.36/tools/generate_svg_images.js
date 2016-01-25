/* */ 
var jsdom = require('jsdom').jsdom;
var xmldom = require('xmldom');
var path = require('path');
var fs = require('fs');
QUnit = {};
QUnit.assertions = {
  ok: function() {
    return true;
  },
  equal: function() {
    return true;
  },
  expect: function() {
    return true;
  }
};
QUnit.module = function(name) {
  console.log("Module:", name);
  QUnit.current_module = name;
};
QUnit.test = function(name, func) {
  QUnit.current_test = name;
  console.log("  Test:", name);
  func(QUnit.assertions);
};
test = QUnit.test;
ok = QUnit.assertions.ok;
equal = QUnit.assertions.equal;
expect = QUnit.assertions.expect;
Vex = require('../build/vexflow-debug');
Vex.Flow.Test = require('../build/vexflow-tests');
var VF = Vex.Flow;
VF.Test.RUN_CANVAS_TESTS = false;
VF.Test.RUN_SVG_TESTS = false;
VF.Test.RUN_RAPHAEL_TESTS = false;
VF.Test.RUN_NODE_TESTS = true;
VF.Test.NODE_IMAGEDIR = path.resolve(__dirname, '..', 'build', 'images');
try {
  fs.accessSync(VF.Test.NODE_IMAGEDIR, fs.R_OK | fs.W_OK);
} catch (e) {
  fs.mkdirSync(VF.Test.NODE_IMAGEDIR);
}
VF.Test.run();
