#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Nov 25 14:28:52 2016

@author: adrian
"""

import wikipedia, argparse

parser = argparse.ArgumentParser()
parser.add_argument("-n","--name",dest="name")
parser.add_argument("-d", "--depth",dest="depth")
argumento = parser.parse_args()
wikipedia.set_lang("fr")
options = wikipedia.search(argumento.name)
print options
for i in range(int(argumento.depth)):
    print wikipedia.page(options[i]).content
