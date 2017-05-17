#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import wikipedia, json
import tarfile

class Wiki:
    def __init__(self):
        self = self
    def search(self, name, dir, dirOut):
        archivo = open("../out/"+dir+"/"+name)
        archivo = archivo.read()
        links = json.loads(archivo)
        wikipedia.set_lang("es")
        try:
            print links['num']
            options = wikipedia.search(links['search'],  results=links['num'])
        except wikipedia.exceptions.DisambiguationError as e:
            print "EROOOOOORRRRR!!!!!"
            print e.options
        params = {}
        nombres = []
        for i in range(int(links['num'])):
            print i
            print options[i]
            data = wikipedia.page(options[i])
            params['name'] = options[i]
            params['content'] = data.content
            params['url'] = data.url
            params['links'] = data.links
            nombres.append("wiki_"+links['search']+str(i+1)+".json")
            archivo = open(dirOut+nombres[i], "w")
            archivo.write(json.dumps(params))
        return nombres

