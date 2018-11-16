# Tikva Theme for Hugo

Tikva is a minimalistic Hugo theme, based on [Bootstrap v4](https://getbootstrap.com/) CSS framework.
It is a port of the Tikva theme which I developed a while ago for Grav CMS and WordPress, but there are also some features added from the (currently unpublished) Azbalac Theme for WordPress.
Tikva integrates multiple Bootstrap styles from the Bootswatch project and adds some customized styles.
It's also possible to edit some color options by config option.

## Features

* Responsive design, using the Bootstrap framework
* More than 30 themes included, half of them newly created, the other half taken from the Bootswatch project
* Three main layouts available: Content column without sidebar, sidebar on right and sidebar on left side
* Customizable font settings (size, font type and variant), support of Google Fonts included
* Support of Google Analytics (with the internal async template), Matomo and Yandex Metrica
* Flexible footer handling with multiple columns
* Support of subfooter, i.e. an area below the footer to add some content like "Powered by..." as seen in the screenshots
* Integration of custom JavaScript/CSS snippets via placeholder partials: just add a file "javascript_header.html" and/or "javascript_footer.html" into the "layouts/partials/" folder of your site, this will include the code in the head section and/or before closing body tag.

## Demo

You can find a demo [here](https://themes.gohugo.io/theme/hugo-tikva/).

## Screenshots

Some examples of different designs:

* "header" style, header image and "darkly" theme:

![preview](https://raw.githubusercontent.com/geschke/hugo-tikva/master/images/screenshot.png)

* "fixed-top" style, with "flatly" theme and customized footer colors:

![preview](https://raw.githubusercontent.com/geschke/hugo-tikva/master/images/screenshot01.png)

* "header" style, header image, title above header image, "signa" theme:

![preview](https://raw.githubusercontent.com/geschke/hugo-tikva/master/images/screenshot02.png)

* "header" style, header image, title and subtitle as overlay, "materia" theme:

![preview](https://raw.githubusercontent.com/geschke/hugo-tikva/master/images/screenshot03.png)

## Installation

Inside the folder of your Hugo site run:

```bash
    cd themes
    git clone https://github.com/geschke/hugo-tikva.git
```

As a second option you can use the submodule feature of Git:

```bash
    git submodule add -f https://github.com/geschke/hugo-tikva themes/hugo-tikva
```

For more information read the official [setup guide](//gohugo.io/overview/installing/) of Hugo.

## Configuration

Check out `exampleSite/config.toml` for theme configuration options and the contents of `exampleSite` folder.

I've tried to comment as much as possible in the configuration file, but the theme and documentation are far away from being complete. It is still work in progress and currently some features of Hugo aren't supported.

## Menu

The navbar displays the `main` menus by default. You can find more details about how to configure it [here](https://gohugo.io/templates/menu-templates/), as well as in the `exampleSite`.

## License

Open sourced under the [MIT license](./LICENSE.md).

## Contributing

If you find a bug or have an idea for a feature, feel free to use the [issue tracker](https://github.com/geschke/hugo-tikva/issues) to let me know.

## Thanks to / Used third-party components

* The [Bootstrap](https://getbootstrap.com) project, which is licensed under the [MIT license]
* Thomas Park and the contributors of the [Bootswatch](https://bootswatch.com/) project.
* [Font Awesome](https://fontawesome.com/v4.7.0/)
