# -*- coding: utf-8 -*-
"""
Editor de Spyder

Este es un archivo temporal
"""
import goslate
import requests
from bs4 import BeautifulSoup
url = "http://www.vademecum.es"
entrada = "/enfermedades-"
def enfermedades():
    
    req = requests.get(url+entrada+"a_1")
    html = BeautifulSoup(req.text, "html.parser")
    ref = html.find('ul', {'class': 'no-bullet'})
    entradas = ref.find_all('a')
    for i in entradas:
        pagina = requests.get(url+i.get('href'))
        gs = goslate.Goslate()
        pagina = gs.translate(pagina, 'fr')
        f = open(i +".html", 'w')
        f.write(pagina)
        f.close()