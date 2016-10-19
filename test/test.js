var helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/foo.sass': helper.getFileBuffer('test/output.css'),
    'test/empty.sass': helper.getFileBuffer('test/empty.sass'),
    'test/error.sass': Error
  }
});
