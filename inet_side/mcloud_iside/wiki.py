#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import wikipedia, argparse, json
import argparse, tarfile

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



def decompress():
    parser = argparse.ArgumentParser()
    parser.add_argument("-n","--name",dest="name")
    argumento = parser.parse_args()
    t = tarfile.open(argumento.name)
    t.extractall()#!/usr/bin/env python2


def compress():
    parser = argparse.ArgumentParser()
    parser.add_argument("-n","--name",dest="name")
    parser.add_argument("-o", "--output", dest="out")
    argumento = parser.parse_args()
    files = argumento.name.split(" ")
    out = tarfile.open(argumento.out, "w")
    for i in files:
        out.add(i)
    out.close()

def test():
    print "calling wiki..."
