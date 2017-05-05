# MCloud
Mutokamwoyo Cloud  volunteer project, Universidad Complutense de Madrid

## Dependencies
    Node v7.0.0 (with npm)
    Python v3.0 (with pip)
    
    Proftpd or other ftp server
    Mongod (nosql database)
    

## Contribute && manual installation
1. fork this repository
2. Download script: https://drive.google.com/file/d/0B3U8mjzmUP4dZzhmNjZrOUNVX3M/view?usp=sharing
3. Change premission to script: sudo chmod 755 arranque.sh
4. execute the script: ./arranque.sh
5. Go into folder: `cd MCloud`
6. Install dependencies: `npm install`

_Check [Spanish wiki documentation](https://github.com/MutakamwoyoCloud/MCloud/wiki) if you want to know details about developmend and architecture._


## Use (debian/ubuntu style)
1. clone this repository
```
    $ git clone https://github.com/MutakamwoyoCloud/MCloud.git
    $ cd Mcloud
    $ sudo chmod +x install.sh    
```
### Provider side (with internet)
2. install the packages using provider option
3. Make sure that you have ftp server installed and running (proftpd for example)
3. execute watchdog daemon
```
    $ sudo ./install.sh provider
    $ (sudo service proftpd start)
    $ su mcloud 
    $ (cd ~/MCloud/inet_side/mcloud_iside && python iside.py)
```
### Client side 
2. install the packages using client option
3. Make sure that you have mongod server installed with a storage location (whatever you prefer) and running
4. execute the server
```
    $ sudo ./install.sh client
    $ sudo nohup mongod &
    & npm start
```  
