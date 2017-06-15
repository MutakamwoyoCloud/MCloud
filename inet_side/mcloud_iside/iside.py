import sys
import time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
from Scheduler import Scheduler
import os


scheduler=Scheduler()

class MyHandler(PatternMatchingEventHandler):
    def process(self, event):
        """
        event.event_type
            'modified' | 'created' | 'moved' | 'deleted'
        event.is_directory
            True | False
        event.src_path
            path/to/observed/file
        """
        #the file will be processed there
        print event.src_path, event.event_type

   # def on_modified(self, event):
   # self.process(event)
   # def on_deleted(self, event):
   #     self.process(event)



    # iside_entry point <============================================
    def on_created(self, event):
        print event.src_path
        scheduler.enqueue(event.src_path)






def start_server(path):
    observer = Observer()
    observer.schedule(MyHandler(), path, recursive=True)
    observer.start()


    try:
        while True:
            time.sleep(1)
            if not scheduler.isEmpty():
                scheduler.process()

    except KeyboardInterrupt:
            observer.stop()

    observer.join()

def check_directory(path):
    print "check_directory"
    print path
    print os.getcwd()
    for filename in os.listdir(path):
        scheduler.enqueue(path+filename)
        scheduler.process()


if __name__=='__main__':

    # we receive listening path from python arguments
    # example python iside.py ../received
    # default path: ../received
    path = sys.argv[1] if len(sys.argv) > 1 else '../received/'
    print "listening petitions on "+ path

    check_directory(path)
    start_server(path)

