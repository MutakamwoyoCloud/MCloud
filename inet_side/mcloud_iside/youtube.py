#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import pytube, json
from pytube import YouTube
from urlparse import urlparse
from urllib2 import urlopen
from urllib import urlencode
import re

class Youtube:
    def __init__(self):
        self = self
    def search(self, name, dir, dirOut):
        archivo = open("../out/"+dir+"/"+name)
        archivo = archivo.read()
        links = json.loads(archivo)
        query_string = urlencode({"search_query" : links['search']})
        html_content = urlopen("http://www.youtube.com/results?" + query_string)
        search_results = re.findall(r'href=\"\/watch\?v=(.{11})', html_content.read())
        listurls = []
        i = 0
        video_num = 0
        if len(search_results) > 0:
            for u in search_results:
                if video_num >= links['num']:
                    break
                listurls.append("http://www.youtube.com/watch?v=" + u)
                video_num += 1
            print listurls
            if len(listurls) > 0:
                for urlVideo in listurls: 
                    yt = YouTube(urlVideo)
                    yt.set_filename('youtube_'+links['search']+str(i+1))
                    video = -1
                    if len(yt.filter(resolution='240p')) > 0 and len(yt.filter('3gp')) > 0:
                        video = yt.get('3gp', '240p')
                    elif len(yt.filter(resolution='480p')) > 0 and len(yt.filter('flv')) > 0:
                        video = yt.get('flv', '420p')
                    print dirOut
                    if video != -1:
                        video.download(dirOut)
                    i += 1

