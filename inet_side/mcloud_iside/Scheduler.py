from utils.utils import decompress
from utils.utils import compress
from wiki import Wiki
import time
from youtube import Youtube
import os, shutil
import threading
import subprocess
import schedule
import traceback

priority = {
    "wiki":0,
    "vademecum":1,
    "youtube":2
}

class Scheduler:
    def callThread(self, onExit, popenArgs):
        def runInThread(onExit, popenArgs):
            subprocess.call(popenArgs)
            onExit()
            return
        thread = threading.Thread(target=runInThread,args=(onExit, popenArgs))
        thread.start()
        return thread

    def job(self):
        print "executing job"
        def onExit():
            compress_file = "medicamentos_vademecum_out.tar.gz"
            listOut = os.listdir("./vademecum/resultsMedicamentos/")
            compress(listOut,"./vademecum/resultsMedicamentos/", "../out/"+compress_file)
            shutil.rmtree("./vademecum/resultsMedicamentos/")
        self.callThread(onExit,["scrapy", "runspider", "vademecum/medicamentos.py"])

    def __init__(self):
        self.items=[]
        self.wiki = Wiki()
        self.youtube = Youtube()
        self.path = os.getcwd()
        self.s = schedule.every().saturday.do(self.job)

    def splitPath(self,petition):
        names = petition.split("/")
        names = names[len(names)-1].split(".")
        return names

    def remove_files(self, petition):
        with open(petition) as f:
            elem = f.readlines()
        for e in elem:
            if os.path.isfile("../out/"+e.strip()):
                os.remove("../out/"+e.strip());
        os.remove(petition);

    def enqueue(self, x):
        print schedule.jobs
        print "enqueue petition"
        #schedule.run_pending()
        name = self.splitPath(x)[0]
        if(name == "remove"):
            print "remove"
            print x
            self.remove_files(x)
        else:
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

    def fail(self, dirpath, petition):
        os.chdir(self.path)
        shutil.rmtree(dirpath)
        time.sleep(15)

    def process(self, p = None):
        petition = self.dequeue() if p is None else p
        names = self.splitPath(petition)
        try:
            list = decompress(names[0], petition)
            listOut = []
            localid = list['dir'].split('/')[2]
            os.mkdir(list['dir']+"/result/")
            for l in list['listDir']:
                if names[0].split("_")[1] == "wiki":
                    print("list[dir]: "+list['dir'])
                    params = self.wiki.search(l, names[0], list['dir']+"/result/")
                    print params
                    if params and len(params) > 0:
                        for d in params:
                            listOut.append(d)
                        compress_file = names[0]+"_out.tar.gz"
                        absCompress="/home/mcloud/MCloud/inet_side/out/"+localid+"/result"
                        destination="/home/mcloud/MCloud/inet_side/out/"+compress_file
                        print("esta es la ruta "+absCompress)
                        compress(listOut, absCompress, destination)
                elif names[0].split("_")[1] == "youtube":
                    self.youtube.search(l, names[0], list['dir']+"/result/", names[0])
        except OSError as osE:
            print osE
            traceback.print_exc()
            print "error with a file"
#            os.chdir(self.path)
#            shutil.rmtree(list['dir'])
        except Exception, e:        #generic 
            print e
            traceback.print_exc()
            #self.fail(list['dir'], 0)
            #self.process(petition)
            return
        print "remove"
        print petition
        print os.getcwd()
        os.chdir(self.path)
        os.remove(petition)
        shutil.rmtree(list['dir'])
        

    def insertOrderListPetition(self, num, petition):
        i = 0
        #NO FUNCIONA:
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
            for j in self.items:
                self.items.insert(lenA-j, self.items[lenA-j-1])        
        self.items.insert(i, petition)
