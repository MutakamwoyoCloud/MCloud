#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import argparse, tarfile

parser = argparse.ArgumentParser()
parser.add_argument("-n","--name",dest="name")
parser.add_argument("-o", "--output", dest="out")
argumento = parser.parse_args()
files = argumento.name.split(" ")
out = tarfile.open(argumento.out, "w")
for i in files:
    out.add(i)
out.close()