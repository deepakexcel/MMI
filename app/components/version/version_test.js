'use strict';

describe('MMI.version module', function() {
  beforeEach(module('MMI.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});