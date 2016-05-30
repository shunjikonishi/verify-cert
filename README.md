# VerifyCert
Show expiration date of SSL certificate from host name.  
It is a wrapper of `openssl` command. To run this, you have to install openssl.

## Install

```
$ npm installl verifycert -g
```

## How to use
The command takes 1 parameter.  
It is host name

```
$ verifycert github.com
github.com: 2016-03-10 - 2018-05-17  (in 2 years)
```
