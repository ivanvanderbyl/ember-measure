import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dom-measure', 'Integration | Component | dom measure', {
  integration: true
});

test('it renders and has measurement on first render', function(assert) {
  this.render(hbs`
    <div style="width: 100px;height:100px;magrin:0;padding:0;line-height:16px;">
      {{#dom-measure as |rect|}}
        <p>Hello World</p>
        {{display-content-rect rect=rect}}
      {{/dom-measure}}
    </div>
  `);

  let rect = JSON.parse(this.$('pre').text().trim());

  assert.ok(rect.top, 'top');
  assert.ok(rect.right, 'right');
  assert.ok(rect.bottom, 'bottom');
  assert.ok(rect.left, 'left');
  assert.ok(rect.width, 'width');
  assert.equal(rect.height, 8, 'height');
});

test('it measures SVG tags correctly', function(assert) {
  this.render(hbs`
    <div style="width: 100px;height:100px;magrin:0;padding:0;line-height:16px;">
      {{#dom-measure tagName="svg" as |rect|}}
        <text>Hello World</text>
        <g>{{display-content-rect tagName="text" rect=rect}}</g>
      {{/dom-measure}}
    </div>
  `);

  let rect = JSON.parse(this.$('g text').text().trim());

  assert.ok(rect.top, 'top');
  assert.ok(rect.right, 'right');
  assert.ok(rect.bottom, 'bottom');
  assert.ok(rect.left, 'left');
  assert.ok(rect.width, 'width');
  assert.ok(rect.height, 'height');
});
