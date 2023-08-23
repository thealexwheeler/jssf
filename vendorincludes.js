var vendorincludes = {};

// Include a path to the vendor file you want to copy/include i.e. vendorincludes.scssCopy = ['node_modules/dependancy/styles.scss'];

// Specify include paths for any vendor sass includes
vendorincludes.scssInclude = [];

// Specify vendor sass/css to be copied from source folder
vendorincludes.scssCopy = [];

// Specify vendor js that will be merged into to the main javascript file
vendorincludes.jsMerge = [];

// Specify vendor js to be copied from source folder (replace the void glob placeholder)
vendorincludes.jsCopy = ['void'];

// Specify vendor fonts to be copied to the fonts folder
vendorincludes.fontCopy = [];

module.exports = vendorincludes;