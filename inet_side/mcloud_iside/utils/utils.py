import tarfile
import os

folderOut = "../out"

def decompress(name):
    os.mkdir(folderOut+name);
    t = tarfile.open(name)
    t.extractall(folderOut+name)
    t.close()


def compress(files, nameOut):
    out = tarfile.open(nameOut, "w")
    for i in files:
        out.add(i)
    out.close()
