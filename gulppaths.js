var paths = {};

// Directory locations
paths.assetsDir       = '_assets/';      // The files Gulp will handle.
paths.jekyllDir       = '';              // The files Jekyll will handle.
paths.jekyllAssetsDir = 'assets/';       // The asset files Jekyll will handle.
paths.siteDir         = '_site/';        // The resulting static site.
paths.siteAssetsDir   = '_site/assets/'; // The resulting static site's assets.

// Folder naming conventions
paths.postFolderName   = '_posts';
paths.draftFolderName  = '_drafts';
paths.fontFolderName   = 'fonts';
paths.imageFolderName  = 'img';
paths.scriptFolderName = 'js';
paths.stylesFolderName = 'styles';
paths.dataFolderName   = '_data';
paths.sassPartialsFolderName = '_sass';

// Source asset files locations
paths.sassFiles   = paths.assetsDir + paths.stylesFolderName;
paths.jsFiles     = paths.assetsDir + paths.scriptFolderName;
paths.imageFiles  = paths.assetsDir + paths.imageFolderName;
paths.fontFiles   = paths.assetsDir + paths.fontFolderName;

// Jekyll directory locations
paths.jekyllPostFiles  = paths.jekyllDir       + paths.postFolderName;
paths.jekyllDraftFiles = paths.jekyllDir       + paths.draftFolderName;
paths.jekyllDataFiles  = paths.jekyllDir       + paths.dataFolderName;
paths.jekyllCssFiles   = paths.jekyllAssetsDir + paths.stylesFolderName;
paths.jekyllJsFiles    = paths.jekyllAssetsDir + paths.scriptFolderName;
paths.jekyllImageFiles = paths.jekyllAssetsDir + paths.imageFolderName;
paths.jekyllFontFiles  = paths.jekyllAssetsDir + paths.fontFolderName;

// Site files locations
paths.siteCssFiles   = paths.siteAssetsDir + paths.stylesFolderName;
paths.siteJsFiles    = paths.siteAssetsDir + paths.scriptFolderName;
paths.siteImageFiles = paths.siteAssetsDir + paths.imageFolderName;
paths.siteFontFiles  = paths.siteAssetsDir + paths.fontFolderName;

// Glob patterns by file type
paths.sassPattern     = '/**/*.+(scss|css)';
paths.jsPattern       = '/**/*.js';
paths.vectorImagePattern = '/**/*.+(svg|SVG)';
paths.rasterImagePattern = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP|tif|TIF)';
paths.imagePattern    = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)';
paths.markdownPattern = '/**/*.+(md|MD|markdown|MARKDOWN)';
paths.htmlPattern     = '/**/*.html';
paths.xmlPattern      = '/**/*.xml';
paths.fontPattern     = '/**/*.+(woff|woff2)';
paths.dataPattern     = '/**.*+(yml|yaml|csv|json)'

// Source asset files globs
paths.sassFilesGlob  = paths.sassFiles  + paths.sassPattern;
paths.jsFilesGlob    = paths.jsFiles    + paths.jsPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;
paths.fontFilesGlob  = paths.fontFiles  + paths.fontPattern;

// Jekyll asset files globs
paths.jekyllCssFilesGlob  = paths.jekyllCssFiles  + paths.sassPattern;
paths.jekyllJsFilesGlob    = paths.jekyllJsFiles    + paths.jsPattern;
paths.jekyllImageFilesGlob = paths.jekyllImageFiles + paths.imagePattern;
paths.vectorImageFilesGlob = paths.imageFiles + paths.vectorImagePattern;
paths.rasterImageFilesGlob = paths.imageFiles + paths.rasterImagePattern;
paths.jekyllFontFilesGlob  = paths.jekyllFontFiles  + paths.fontPattern;

// Site asset files globs
paths.siteCssFilesGlob  = paths.siteCssFiles  + paths.sassPattern;
paths.siteJsFilesGlob    = paths.siteJsFiles    + paths.jsPattern;
paths.siteImageFilesGlob = paths.siteImageFiles + paths.imagePattern;
paths.siteFontFilesGlob = paths.siteFontFiles + paths.fontPattern;

// Jekyll files globs
paths.jekyllPostFilesGlob  = paths.jekyllPostFiles  + paths.markdownPattern;
paths.jekyllDraftFilesGlob = paths.jekyllDraftFiles + paths.markdownPattern;
paths.jekyllHtmlFilesGlob  = paths.jekyllDir        + paths.htmlPattern;
paths.jekyllXmlFilesGlob   = paths.jekyllDir        + paths.xmlPattern;
paths.jekyllImageFilesGlob = paths.jekyllImageFiles + paths.imagePattern;
paths.jekyllDataFilesGlob = paths.jekyllDataFiles   + paths.dataPattern;

// Site files globs
paths.siteHtmlFilesGlob = paths.siteDir + paths.htmlPattern;

module.exports = paths;
