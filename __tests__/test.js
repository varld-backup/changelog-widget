let Widget = require('../dist/index.umd.js');

test('creates new instance', () => {
  let button = document.createElement('button');

  let s = new Widget({
    id: 'OKOQo8va',
    key: 'IK-JNLo8SXM-hRW1lcLUU',
    element: button
  });

  expect(s.iframe.tagName).toEqual('IFRAME');
  expect(s.element.tagName).toEqual('DIV');
  expect(s.wrapper).toEqual(button);
});

test('opens, closes and toggles', () => {
  let button = document.createElement('button');

  let s = new Widget({
    id: 'OKOQo8va',
    key: 'IK-JNLo8SXM-hRW1lcLUU',
    element: button
  });

  expect(s.isOpen).toBeFalsy();
  s.open();
  expect(s.isOpen).toBeTruthy();
  s.close();
  expect(s.isOpen).toBeFalsy();
  s.toggle();
  expect(s.isOpen).toBeTruthy();
  s.toggle();
  expect(s.isOpen).toBeFalsy();
});
