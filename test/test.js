var helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/foo.sass': {
      path: 'test/foo.sass',
      buffer: helper.getFileBuffer('test/output.css'),
      hash: helper.getFileHash('test/output.css'),
      requires: [{
        path: 'test/foo.sass',
        hash: helper.getFileHash('test/foo.sass')
      }],
      links: [{
        path: 'test/bar.sass',
        hash: helper.getFileHash('test/bar.sass')
      }],
      globs: []
    },
    'test/error.sass': Error
  }
});
