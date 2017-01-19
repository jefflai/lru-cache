"use strict";

import assert from 'assert';
import Cache from '../cache';

describe('Cache', function() {
  describe('#get', function() {
    it('should return undefined when key does not exist', function() {
      let cache = new Cache(5);
      assert.equal(undefined, cache.get('hello'));
    });

    it('should return correct value when key exists', function() {
      let cache = new Cache(5);
      cache.set('blue', 'sky');
      assert.equal('sky', cache.get('blue'));
    });

    it('should not store least frequently used key past the limit', function() {
      let cache = new Cache(5);
      cache.set('one', 1);
      cache.set('two', 2);
      cache.set('three', 3);
      cache.set('four', 4);
      cache.set('five', 5);
      assert.equal(1, cache.get('one'));
      assert.equal(2, cache.get('two'));
      assert.equal(3, cache.get('three'));
      assert.equal(4, cache.get('four'));
      assert.equal(5, cache.get('five'));

      cache.set('six', 6);

      assert.equal(undefined, cache.get('one'));
      assert.equal(2, cache.get('two'));
      assert.equal(3, cache.get('three'));
      assert.equal(4, cache.get('four'));
      assert.equal(5, cache.get('five'));
      assert.equal(6, cache.get('six'));
    });
  });
});
