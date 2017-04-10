#!/usr/bin/env python
# -*- coding: utf-8 -*-
from scrapy import Field, Spider, Item, Selector 
import urllib.request
from lxml import html
from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.parse import urlencode
import builtins

ABECEDARIO='abcdefghijkmnopqrstuvwxyz'
class Post(Item):
    url = Field()
    title = Field()

    def download(self):
        opener = urllib.request.FancyURLopener({})
        url = 'http://www.vademecum.es'+str(self['url'][0])
        print ("URLLLLLLLLLL: ",url)
        soup = BeautifulSoup(urlopen(url))
        div = soup.findAll("div", { "class" : "left" })
        title = str(self['url'][0]).split('/')
        f = open(title[1] +".html", 'w')
        f.write("<!DOCTYPE html>\
            <html>\
            <head>\
                <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />\
            </head>\
            <body>")
        f.write(str(div))
        f.write("</body>\
            </html>")
        f.close()

class mySpider(Spider):
    exit = 1
    num = 0
    try:
        f = open("config.txt", 'r')
        num = int(f.read())
        f.close()
    except FileNotFoundError:
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