#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import wikipedia, json
import tarfile

class Wiki:
    def __init__(self):
        self = self
    def search(self, name, dir, dirOut):
        try:
            archivo = open("../out/"+dir+"/"+name)
            archivo = archivo.read()
            links = json.loads(archivo)
            wikipedia.set_lang("fr")
            options = wikipedia.search(links['search'],  results=links['num'], suggestion=True)
            print options
            params = {}
            nombres = []
            for i in range(int(links['num'])):
                data = wikipedia.page(options[i])
                params['name'] = options[i]
                params['content'] = data.content
                params['url'] = data.url
                params['links'] = data.links
                nombres.append("wiki_"+links['search']+str(i+1)+".json")
                archivo = open(dirOut+nombres[i], "w")
                archivo.write(json.dumps(params))
            return nombres
        except wikipedia.exceptions.DisambiguationError as e:
            options = wikipedia.search(e.options)
        except IndexError:
            return []

