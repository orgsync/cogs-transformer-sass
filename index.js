const _ = require('underscore');
const npath = require('npath');
const sass = require('dart-sass');

const DEFAULTS = {
  includePaths: [],
  indentedSyntax: false
};

const getRelative = path => npath.relative('.', path);

module.exports = ({file: {buffer, links, path}, options}) =>
  new Promise((resolve, reject) => {

    // Merge default options with user-defined options.
    options = _.extend({}, DEFAULTS, options);
    sass.render(_.extend(options, {

    data: `${buffer.toString()}`,

      // Always concat the file path so relative @imports work correctly.
      includePaths: options.includePaths.concat(npath.dirname(path))
    }), function (er, res) {
      if (er) {
        return reject(_.extend(new Error(), er, {
          message:
            `${path}: line ${er.line}, column ${er.column}, ${er.message}`
        }));
      }

      resolve({
        buffer: new Buffer(res.css),
        links: links.concat(_.map(res.stats.includedFiles, getRelative))
      });
    });
  });
