/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Yegor Bugayenko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const mvnw = require('../mvnw');
const path = require('path');
const parserVersion = require('../parser-version');

/**
 * Command to link binaries into a single executable binary.
 * @param {Hash} opts - All options
 * @return {Promise} of link task
 */
module.exports = function(opts) {
  return mvnw([
    'jar:jar',
    opts.verbose ? '' : '--quiet',
    `-Deo.targetDir=${path.resolve(opts.target)}`,
    '-Deo.version=' + (opts.parser ? opts.parser : parserVersion.get()),
  ], opts.target).then((r) => {
     console.info('Executable JAR created at %s', path.resolve(opts.target, 'eoc.jar'));
     return r;
  });
};
