# Tikva Theme for Hugo

Tikva is a minimalistic Hugo theme, based on [Bootstrap v4](https://getbootstrap.com/) CSS framework.
It is a port of the Tikva theme which I developed a while ago for Grav CMS and WordPress, but there are also some features added from the (currently unpublished) Azbalac Theme for WordPress. 

Tikva integrates multiple Bootstrap styles from the Bootswatch project and adds some customized styles.
It's also possible to edit some color options by config option.

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


## Features

 * Responsive design, using the Bootstrap framework
 * More than 30 thenes included, half of them newly created, the other half taken from the Bootswatch project
 * Customizable font settings (size, font type and variant), support of Google Fonts included 
 * Support of Google Analytics (with the internal async template), Matomo and Yandex Metrica
 * Flexible footer handling with multiple columns
 * Support of subfooter, i.e. a place below the footer to add some content like "Powered by..." as seen in the screenshots



## Installation

```bash
$ git clone https://github.com/geschke/hugo-tikva themes/hugo-tikva
```


## Configuration

Check `exampleSite/config.toml` for a commented example.

## Menu

The navbar displays the `main` menus by default. You can find more details about how to configure it [here](https://gohugo.io/templates/menu-templates/), as well as in the `exampleSite`.

## License

Open sourced under the [MIT license](./LICENSE.md).
