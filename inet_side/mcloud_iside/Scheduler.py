
from utils.utils import decompress
from utils.utils import compress
from wiki import Wiki
import os
priority = {
    "wiki":0,
    "vademecum":1,
    "youtube":2
}

class Scheduler:
    def __init__(self):
        self.items=[]
        self.wiki = Wiki()
        self.path = os.getcwd()

    def splitPath(self,petition):
        names = petition.split("/")
        names = names[len(names)-1].split(".")
        return names

    def enqueue(self, x):
        print x
        name = self.splitPath(x)[0]
        splitPetition = name.split("_")
        typePetition = splitPetition[len(splitPetition)-1]
        self.insertOrderListPetition(priority[typePetition], x)

    def dequeue(self):
        try:
            return self.items.pop(0)
        except:
            raise ValueError("there are no petitions!")

    def isEmpty(self):
        return self.items == []

    def process(self):
        petition = self.dequeue()
        names = self.splitPath(petition)
        list = decompress(names[0], petition)
        listOut = [];
        os.mkdir(list['dir']+"/result/");
        for l in list['listDir']:
            params = self.wiki.search(l, names[0], list['dir']+"/result/")
            for d in params:
                listOut.append(d)
        print listOut
        compress(listOut,list['dir']+"/result/", list['dir']+"/"+names[0]+"_out.tar.gz")
        os.chdir(self.path)

    def insertOrderListPetition(self, num, petition):
        i = 0
        if(len(self.items)>0):
            name = self.splitPath(self.items[i])[0]
            splitPetition = name.split("_")
            typePetition = splitPetition[len(splitPetition)-1]
            numType = priority[typePetition]
            i+=1
            while i < len(self.items) and numType <= num:
                name = self.splitPath(self.items[i])[0]
                splitPetition = name.split("_")
                typePetition = splitPetition[len(splitPetition)-1]
                numType = priority[typePetition]
                i+=1

            lenA = len(self.items)
            for j, val in self.items:
                self.items.insert(lenA-j, self.items[lenA-j-1])

        self.items.insert(i, petition)

            


    

