import sys
import time
import logging
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
from Scheduler import Scheduler
import os


s=Scheduler()

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
        s.enqueue(event.src_path)






def start_server(path):
    observer = Observer()
    observer.schedule(MyHandler(), path, recursive=True)
    observer.start()


    try:
        while True:
            time.sleep(1)
            if not s.isEmpty():
                print "i have something"
                s.process()

    except KeyboardInterrupt:
            observer.stop()

    observer.join()


if __name__=='__main__':

    # we receive listening path from python arguments
    # example python iside.py ../received
    # default path: ../received
    path = sys.argv[1] if len(sys.argv) > 1 else '../received/'
    print "listening petitions on "+ path

    start_server(path)

