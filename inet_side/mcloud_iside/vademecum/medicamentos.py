#!/usr/bin/env python
# -*- coding: utf-8 -*-
from scrapy import Field, Spider, Item, Selector 
from lxml import html
from bs4 import BeautifulSoup
from urlparse import urlparse
from urllib2 import urlopen
from urllib import urlencode
import builtins
import goslate
ABECEDARIO='abcdefghijkmnopqrstuvwxyz'
class Post(Item):
    url = Field()
    title = Field()

    def download(self):
        url = 'http://www.vademecum.es'+str(self['url'][0])
        soup = BeautifulSoup(urlopen(url))
        div = soup.findAll("div", { "class" : "left" })
        title = str(self['url'][0]).split('/')
        gs = goslate.Goslate()
        div = gs.translate(str(div), 'fr')
        f = open("./vademecum/resultsMedicamentos/"+title[1] +".html", 'w')
        json = "{\
            'name': "+title[1]+",\
            'data': {'name':"+title[1]+",\
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
        f.write(json)
        f.close()

class mySpider(Spider):
    exit = 1
    num = 0
    try:
        print "mySpider ok"
        f = open("config.txt", 'r')
        num = int(f.read())
        f.close()
    except IOError:
        f = open("config.txt", 'w')
        exit = 0
    name, start_urls = 'mySpider', ["http://www.vademecum.es/medicamentos-"+ABECEDARIO[num]+"_1"]
    print (num)
    num = num + 1
    if num > 24:
        num = 0
    if exit:
        f = open("config.txt", 'w')
    f.write(str(num))
    f.close()

    def parse(self, response):
        sel = Selector(response)
        sites = sel.xpath('//ul[@class="no-bullet"]//li')
        items = []

        for site in sites:
            post = Post()
            post['title'] = site.xpath('a/text()').extract()
            post['url'] = site.xpath('a/@href').extract()
            items.append(post)
        for post in items:
            post.download()
        return items