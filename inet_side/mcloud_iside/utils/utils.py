import tarfile
import os

folderOut = "../out/"

def decompress(name, tar):
	os.mkdir(folderOut+name)
	t = tarfile.open(tar)
	t.extractall(folderOut+name)
	t.close()
	return {"listDir":os.listdir(folderOut+name), "dir":folderOut+name}


def compress(files,folder, nameOut):
	print files
	print folder
	print nameOut
	if os.path.exists(nameOut):
		os.remove(nameOut)
	out = tarfile.open(nameOut, "w")
	os.chdir(folder)
	if isinstance(files, list):
		for i in files:
			out.add(i)
	else:
		out.add(files)
	print "close"
	out.close()
