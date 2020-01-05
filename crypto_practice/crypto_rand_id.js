const crypto = require('crypto');

const generate = verbose => {
  let id = crypto.randomBytes(12);
  if (verbose) {
    console.log(`Package secret identifier: ${Buffer.from(id).toString('base64')}`);
  }
  return id;
};

const generateNumberId = (_length, _verbose) => {
  let code = '';
  let length = _length !== undefined ? _length : length;

  do {
    code += crypto.randomBytes(3).readUIntBE(0, 3);
    // code += Number.parseInt(randomBytes(3).toString("hex"), 16);
  } while (code.length < length);

  let id = code.slice(0, length);

  if (_verbose) {
    console.log(`Package secret identifier: ${id}`);
  }

  return id;
};

module.exports = {
  generate,
  generateNumberId
};
