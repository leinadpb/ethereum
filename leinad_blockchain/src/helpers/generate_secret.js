const crypto = require("crypto");

const secretKeyCallback = (err, buffer) => {
  const token = buffer.toString("hex");
  console.log(`Generated token: ${token}`);
};

const generateSecretKey = () => {
  return crypto.randomBytes(128, (err, buffer) =>
    secretKeyCallback(err, buffer)
  );
};

generateSecretKey();
