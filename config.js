cfg.accountSid = process.env.AC63b1e5fd8330485b2919bef9f2b4fa74;
cfg.authToken = process.env.c8b0a56d981e0e6f73dfdbaadae96ee0;
cfg.sendingNumber = process.env.+17782007530;

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}
module.exports = cfg;