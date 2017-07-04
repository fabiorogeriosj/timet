![Timet Logo](img/logo.jpg)
 
Time tracker manager in terminal.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][travis-image]][travis-url]

## Install

```shell
npm install -g timet
```

## Using

Timet is only focused on helping you to record your work time on certain tasks via the terminal. The first time you run the timet, or try to register a new note, it will prompt you for some initial setup confirmations.

Its functionality is simple because schedules are stored in text files separated by date, you can store these files anywhere, or if you prefer, use a storage system in the cloud.

### New register

To register you need to send two parameters, first the time spent and then a description of the time spent:

```shell
timet 8h Created a new resource to do deploy referring to project task #34 ppline
```

Or you can enter the date you want to make the point:

```shell
timet 4/7/2017 8h Created a new resource to do deploy referring to project task #34 ppline
```
> Note: The format of the date you are going to inform will depend on the first setup you performed and configured, if you want to change the default settings, edit the timet.json file.

### List registers

By default the timet lists the last 31 days of registration:

```shell
timet 
```

You can filter the result by passing two parameters with the start date and fnial date:

```shell
timet 2/20/2017 3/20/2017
```
> Note: The format of the date you are going to inform will depend on the first setup you performed and configured, if you want to change the default settings, edit the timet.json file.

### Remove register

To remove a register you need to enter the date and the register id:

```shell
timet remove 4/7/2017 7
```

## Do you have suggestions for improvements?

We can not lose the focus that is to have a super simple and functional tool to record working hours in the terminal, if you have any idea of improvements that is in accordance with this directive open an issue and we will discuss about :)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/timet.svg
[npm-url]: https://npmjs.org/package/timet
[downloads-image]: https://img.shields.io/npm/dm/timet.svg
[downloads-url]: https://npmjs.org/package/timet
[travis-image]: https://img.shields.io/travis/fabiorogeriosj/timet/master.svg?label=linux
[travis-url]: https://travis-ci.org/fabiorogeriosj/timet
