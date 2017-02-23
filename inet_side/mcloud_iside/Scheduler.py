
from utils.utils import decompress
from wiki import Wiki
import os

class Scheduler:
    def __init__(self):
        self.items=[]
        self.wiki = Wiki()

    def enqueue(self, x):
        self.items.append(x)

    def dequeue(self):
        try:
            return self.items.pop(0)
        except:
            raise ValueError("there are no petitions!")

    def isEmpty(self):
        return self.items == []

    def process(self):
        petition = self.dequeue()
        names = petition.split("/")
        names = names[len(names)-1].split(".")
        list = decompress(names[0], petition)
        print list
        os.mkdir(list['dir']+"/result/");
        for l in list['listDir']:
            params = self.wiki.search(l, names[0], list['dir']+"/result/")
            print params



