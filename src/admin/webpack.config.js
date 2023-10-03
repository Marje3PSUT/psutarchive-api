'use strict';

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Replace Built-in NumberInput to remove comma
  config.plugins.push(new webpack.NormalModuleReplacementPlugin(/.*design-system\/dist\/NumberInput\/NumberInput\.mjs$/, `${__dirname}/webpack/CustomNumberInput.mjs`));
  return config;
};
