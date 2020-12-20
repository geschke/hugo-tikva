# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## 0.3.1 - 2020-12-20

### Changed

- Fix: Remove navigation bar code if main menu doesn't exist

## 0.3.0 - 2020-12-20

### Changed

- Header image handling backported from Azbalac WordPress theme, now the header image loads with picture element, removed JavaScript code to load header image
- Cleanup of JavaScript code due to header image settings
- width and height options in the section `[params.theme.header]` are not used anymore, you can just delete them

### Added

- New option to move title and subtitle above the header image (if it is placed on the header image) on small displays. Previously this was done automatically, now the behavior can be customized. See option `moveTitle` in the `[params.theme.header]` section in config.toml of `exampleSite` folder.

## 0.2.8 - 2020-06-10

### Changed

- Fix: https://github.com/geschke/hugo-tikva/issues/6 (Switch to UMD version of popper.js)

## 0.2.7 - 2020-05-31

### Changed

- Fix: https://github.com/gohugoio/hugoThemes/issues/858 (Broken Themes on the Hugo Showcase)

## 0.2.6 - 2020-02-20

### Changed

- Bootswatch and modified themes update
- jQuery, Bootstrap, popper.js update

## 0.2.5 - 2019-08-28

### Changed

- Fix due to https://github.com/gohugoio/hugoThemes/issues/682 (Demos with empty homepage and/or wrong posts list) - hopefully
- Section content hints added to README.md

### Added

- Example content in sidebar, footer and subfooter will be shown as default when the section content folders are missing. The example content comes from the config.toml file, so just delete these lines or deactivate the section concerned.

## 0.2.4 - 2019-07-26

### Changed

- Moved from .URL to .RelPermalink in the navigation template due to Page's deprecation warning

## 0.2.3 - 2019-02-13

### Changed

- Migrated to new Bootstrap version 4.3.0. Unfortunately Bootswatch was still at version 4.2.1, but compilation worked with only one issue, which could be fixed. So it seems to be usable.

## 0.2.2 - 2018-12-17

### Added

- New (placeholder) partial to add CSS or JavaScript files in the head section. If you want to integrate additional CSS or JavaScript files, you can use the static files folder. To include some files, place a file "head_includes.html" into your site's folder "layouts/partials/" and add the necessary HTML code. An example is included in the `exampleSite` folder (see [head_includes.html](https://github.com/geschke/hugo-tikva/blob/master/exampleSite/layouts/partials/head_includes.html) ).

## 0.2.1 - 2018-12-17

### Changed

- Update to new Yandex.Metrica code snippet
- Show start and end HTML comments of Yandex.Metrica and Matomo snippet (again)

## 0.2 - 2018-11-22

### Added

- This CHANGELOG file and version numbering
- New partial "subfooter_item.html". The behavior of subfooter is now similar to footer and sidebar. As default, only the .Content of the subfooter file(s) will be displayed.

### Changed

- Handling of footer, subfooter and sidebar folders. The concept of getting footer, subfooter and sidebar content from regular markdown files makes content generation comfortable, but has the disadvantage that Hugo creates all folders which are placed in the main `content` folder. To prevent this, page bundles can be declared as *headless*, i.e. the bundle will not be published. See https://gohugo.io/content-management/page-bundles/#headless-bundle . To make clear the difference to the previous version a backward incompatible modification has been added. The folders `footer`, `subfooter` and `sidebar` have to be created in the folder `content/sections/`. If you have already used these folders, just create a new directory with the name `sections` into your content directory and move `footer`, `subfooter` and `sidebar` into this new folder.  To make the folders *headless*, add a file `index.md` into these directories with the following content:
```
---
headless: true
---
```
You'll find an example in the `exampleSite` project.

- min_version in theme.toml bumped to 0.48

## 0.1 - 2018-11-21

- First release
