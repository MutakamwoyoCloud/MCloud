#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import wikipedia, json
import tarfile

class Wiki:
    def __init__(self):
        self = self
    def search(self, name, dir):
        archivo = open("../out/"+dir+"/"+name)
        archivo = archivo.read()
        links = json.loads(archivo)
        wikipedia.set_lang("fr")
        print links
        options = wikipedia.search(links['search'])
        print options
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
            nombres[i].append("wiki_"+links['search']+(i+1))
            archivo = open(nombres[i], "w")
            archivo.write(json.dump(params))
        return nombres

