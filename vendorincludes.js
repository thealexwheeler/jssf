var vendorincludes = {};

// Specify include paths for any vendor sass includes
vendorincludes.scss = ['node_modules/bootstrap/scss/',
'node_modules/@fortawesome/fontawesome-free/scss/'];

// Specify vendor js that will be added to the main javascript file
vendorincludes.js = ['node_modules/bootstrap/dist/js/bootstrap.bundle.js'];

// Specify vendor fonts to be included to fonts folder
vendorincludes.fonts = ['node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2',
'node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2',
'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2',
'node_modules/@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.woff2'];

module.exports = vendorincludes;