'use strict';

angular.module('OnTheRock.version', [
  'OnTheRock.version.interpolate-filter',
  'OnTheRock.version.version-directive'
])

.value('version', '0.1');
