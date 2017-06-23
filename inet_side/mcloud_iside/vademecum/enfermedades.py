#!/usr/bin/env python
# -*- coding: utf-8 -*-
import goslate
import requests
from bs4 import BeautifulSoup
ABECEDARIO='abcdefghijkmnopqrstuvwxyz'
url = "http://www.vademecum.es"
entrada = "/enfermedades-"
def enfermedades():
    num = getLetter()
    req = requests.get(url+entrada+ABECEDARIO[num]+"_1")
    html = BeautifulSoup(req.text, "html.parser")
    ref = html.find('ul', {'class': 'no-bullet'})
    entradas = ref.find_all('a')
    htmlToFile(entradas)
def getLetter():
    f = open("config.txt", 'r')
    num = int(f.read())
    f.close()        
    num = num + 1
    if num > 24:
        num = 0
    f = open("config.txt", 'w')
    f.write(str(num))
    f.close()
    return num-1
def htmlToFile(entradas):
    gs = goslate.Goslate()
    for i in entradas:
        pagina = requests.get(url+i.get('href'))
        soup = BeautifulSoup(pagina.text, "html.parser")
        div = soup.findAll("div", { "class" : "left" })
        div = gs.translate(div, 'fr')
        json = "{\
            'name': "+i.get('href')+"\
            'data': {'name':"+i.get('href')+",\
                     'content':'<!DOCTYPE html>\
            <html>\
            <head>\
                <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />\
            </head>\
            <body>'\
                "+str(div)+"\
            </body>\
            </html>'}\
            }"
        
        f = open("./vademecum/resultadosEnfermedades/"+ i.get('href') +".html", 'w')
        f.write(json)
        f.close()