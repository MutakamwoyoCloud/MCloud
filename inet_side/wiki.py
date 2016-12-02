#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Nov 25 14:28:52 2016

@author: adrian
"""

import wikipedia, argparse, json

parser = argparse.ArgumentParser()
parser.add_argument("-n","--name",dest="name")
argumento = parser.parse_args()
archivo = open(argumento.name)
archivo = archivo.read()
links = json.loads(archivo)
wikipedia.set_lang("fr")
options = wikipedia.search(links[0])
print options
for i in range(int(links[1])):
    print wikipedia.page(options[i]).content
