# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
