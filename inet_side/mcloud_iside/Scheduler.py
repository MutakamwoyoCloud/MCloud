


class Scheduler:
    def __init__(self):
        self.items=[]

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
        petition = dequeue()

