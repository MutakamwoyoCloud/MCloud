#!/usr/bin/env python2
# -*- coding: utf-8 -*-


import argparse, tarfile

parser = argparse.ArgumentParser()
parser.add_argument("-n","--name",dest="name")
argumento = parser.parse_args()
t = tarfile.open(argumento.name)
t.extractall()