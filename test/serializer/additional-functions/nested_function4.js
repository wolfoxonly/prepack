// does not contain:= 7;
// does not contain:= 10;
let addit_capture = { baz: 99 };

function additional1() {
  var x2 = { foo: addit_capture.baz + 500 };
  foo = function() {
    return [addit_capture, x2];
  };
  addit_capture.baz += 42;
  var y = 7;
}

function additional2() {
  let x = 10;
}

if (global.__optimize) {
  __optimize(additional1);
  __optimize(additional2);
}

inspect = function() {
  additional1();
  additional2();
  let [ret1, ret1_] = global.foo();
  let [ret2, ret2_] = global.foo();
  additional1();
  let [ret3, ret3_] = global.foo();
  let strings = [ret1, ret1_, ret2, ret2_, ret3, ret3_].map(JSON.stringify).join(" ");

  return "PASS";
  /*return strings + (ret1 === ret2) + (ret1 === ret3) + (ret2 === ret3) +
    (ret1_ === ret2_) + (ret1_ === ret3_) + (ret2_ === ret3_);*/
};
