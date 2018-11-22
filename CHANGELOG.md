# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.2 - 2018-11-21

### Added

- This CHANGELOG file and version numbering

### Changed

- Handling of footer, subfooter and sidebar folders. The concept of getting footer, subfooter and sidebar content from regular markdown files makes content generation comfortable, but has the disadvantage that Hugo creates all folders which are placed in the main `content` folder. If a folder will be excluded by *ignoreFiles* option, no content is generated, to footer, subfooter and sidebar remain empty. To solve this, this theme makes use of a folder with the default name `content_sections` in the project's root directory. The footer, subfooter and sidebar folders and their files have to be placed into this folder. Please have a look at the folder structure of `exampleSite`. It is possible to use another folder which is reachable in the project's directory, see the new config option `contentSectionsPath = "/my-sections-folder/"`.
- min_version in theme.toml bumped to 0.48

## 0.1 - 2018-11-21

- First release
