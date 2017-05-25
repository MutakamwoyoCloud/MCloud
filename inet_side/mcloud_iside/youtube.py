#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import pytube, json, os
from utils.utils import compress
from pytube import YouTube
from urlparse import urlparse
from urllib2 import urlopen
from urllib import urlencode
import re

class Youtube:
    def __init__(self):
        self = self
        self.path = os.getcwd()
        self.i = 0
        self.lastProgress = 0

    def finish(self, path):
        print "compress"
        compress_file = self.hash+"_out.tar.gz"
        compress([self.name],self.dirOut, self.dirFinish+compress_file)
        os.chdir(self.path)
        os.remove(self.dirOut+self.name)
        print "finish"

    def search(self, name, dir, dirOut, hash):
        self.hash = hash
        os.chdir(self.path)
        archivo = open("../out/"+dir+"/"+name)
        archivo = archivo.read()
        links = json.loads(archivo)
        query_string = urlencode({"search_query" : links["search"]})
        html_content = urlopen("http://www.youtube.com/results?" + query_string)
        search_results = re.findall(r'href=\"\/watch\?v=(.{11})', html_content.read())
        listurls = []
        video_num = 0
        if len(search_results) > 0:
            for u in search_results:
                if video_num >= links["num"]:
                    break
                listurls.append("http://www.youtube.com/watch?v=" + u)
                video_num += 1
            print listurls
            if len(listurls) > 0:
                for urlVideo in listurls: 
                    yt = YouTube(urlVideo)
                    yt.set_filename(links["search"]+"_youtube"+str(self.i+1))
                    self.i += 1
                    video = -1
                    ext = ""
                    if len(yt.filter(resolution="240p")) > 0 and len(yt.filter("3gp")) > 0:
                        video = yt.get("3gp", "240p")
                        ext = ".3gp"
                    elif len(yt.filter(resolution="480p")) > 0 and len(yt.filter("flv")) > 0:
                        video = yt.get("flv", "420p")
                        ext = ".flv"
                    if video != -1:
                        print 
                        self.dirOut = "./youtube/"
                        self.name = links["search"]+"_youtube"+str(self.i+1)+ext
                        self.dirFinish = "../out/"
                        if not os.path.exists("./youtube/"+links["search"]+"_youtube"+str(self.i+1)+ext):
                            video.download("./youtube/", on_finish=self.finish)

