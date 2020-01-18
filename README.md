<p align="center">
  <img src="https://i.imgur.com/VVdRJEf.png" width="300px" />
</p>

<h2 align="center">Changes Widget SDK</h2>

<p align="center">
  The widget sdk can be used to attach a changelog widget to an element, like a button. When the user clicks that element, a changelog-widget will pop up. <br />
  This SDK is powered by <a href="https://github.com/varld/changelog-core">the Core SDK</a>.
</p>

## Useful Links

- [Why keep a changelog](https://changes.blue/guide/why/changelog)
- [How to keep a good changelog](https://changes.blue/guide/howto/changelog)
- [Using the widget](https://changes.blue/guide/client/widget) 
- [How to use Changes in React](https://changes.blue/guide/client/react)

## Installation

```bash
# npm
npm install changelog-widget

# yarn
yarn add changelog-widget
```

## Usage 

```js
import Widget from 'changelog-widget';

// Instantiate the Widget
let sdk = new Widget({
  id: '5Web2XRF',
  key: 'IK-X2zvTYjp-NCg-3q2Rj'

  // The element the widget should be mounted to
  element: document.querySelector('.my-button')
});

// Toggle the widget
sdk.toggle();

// Open the widget
sdk.open();

// Close the widget
sdk.close();
```

## API

### `new WidgetSDK(options)`

Create a new widget-instance.

#### `options`

Type: 

```js
{
  id: string;
  key: string;
  element: string;
}
```

### `sdk.open()`

Open the widget programmatically.

### `sdk.close()`

Close the widget programmatically.

### `sdk.toggle()`

Open or close the widget programmatically.
