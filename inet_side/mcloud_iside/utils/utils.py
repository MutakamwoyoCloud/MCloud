import tarfile
import os

folderOut = "../out/"

def decompress(name, tar):
	os.mkdir(folderOut+name)
	t = tarfile.open(tar)
	t.extractall(folderOut+name)
	t.close()
	return os.listdir(folderOut+name)


def compress(files, nameOut):
	out = tarfile.open(nameOut, "w")
	for i in files:
		out.add(i)
	out.close()
