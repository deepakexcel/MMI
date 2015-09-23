'use strict';

angular.module('MMI.version', [
  'MMI.version.interpolate-filter',
  'MMI.version.version-directive'
])

.value('version', '0.1');