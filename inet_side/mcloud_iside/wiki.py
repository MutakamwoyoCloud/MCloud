#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import wikipedia, json
import tarfile

def wiki(name):
    archivo = open(name)
    archivo = archivo.read()
    links = json.loads(archivo)
    wikipedia.set_lang("fr")
    options = wikipedia.search(links[0])
    params = {}
    params.options = options
    for i in range(int(links[1])):
        params.data[i]=wikipedia.page(options[i]).content
    return params

