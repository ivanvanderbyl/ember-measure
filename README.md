# ember-measure

Provides an easy to use mixin for measuring DOM elements within Ember Components,
and responding to size changes. Internally we use a [`ResizeObserver`](https://developers.google.com/web/updates/2016/10/resizeobserver), which is a new
type of `MutationObserver`, as such there is an included polyfill to support older browsers back
to IE10.

## Installation

* `ember install ember-measure`

## Usage

You can use this addon in two ways:

### 1. As a component:

```hbs
{{dom-rect as |rect|}}
  <p>I am {{rect.client.height}}px tall!</p>
{{/dom-rect}}
```

### 2. Within your component:

```js
import WithContentRect from 'ember-measure/with-content-rect';

```

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
