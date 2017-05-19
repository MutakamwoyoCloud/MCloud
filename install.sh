#!/bin/bash


USER=$(stat -c '%U' .)

PUSER=mcloud
PPASS=mcloud
PHOME=/home/mcloud

pushfolder="src/core/push"
pullfolder="src/core/pull"
flushfolder="src/core/flush"

usage(){

    echo
    echo "Usage: install.sh [mode]"
    echo "MODE OPTIONS:"
    echo "provider:"
    echo "          *****NEEDS ROOT MODE: sudo ./install.sh provider******"
    echo "          install default setup for provider"
    echo "          You need to have a stable server with a good connection/Internet access"
    echo
    echo "client:"
    echo "          *****NEEDS ROOT MODE: sudo ./install.sh client******"
    echo "          install default setup for client"
    echo "          this side of the system is the client, you need a provider attending to this client"
    echo "          in order to get working properly"
    echo "          this side supposed to have bad connection limited by local timetable"
    echo


}

exec_provider(){
    echo "installing provider setup..."

    getent passwd $PUSER > /dev/null

    if [ $? -eq 0 ]; then
            echo "user mcloud exists"
        else
            useradd -m -d $PHOME -s /bin/bash -c "user 4 mcloud service" -U $PUSER
            echo $PUSER:$PPASS | chpasswd
            echo "user mcloud created"
    fi

    if ps ax | grep -v grep | grep "proftpd" > /dev/null; then
        echo "found proftpd running :)"
        echo "we are moving your old /etc/proftpd/proftpd.conf -> proftpd.conf.bak"
        mv /etc/proftpd/proftpd.conf /etc/proftpd/proftpd.conf.bak
        cp proftpd.conf /etc/proftpd/proftpd.conf
        service proftpd restart        

    else
        echo "proftpd is not running"
        echo "In order to run provider client you need proftpd (or similar) running"
        echo "try sudo service proftpd start if u already have installed proftpd"
        echo "if u wanna install: sudo apt-get install proftpd (debian based)"
    fi

    mkdir $PHOME/MCloud
    cp -r inet_side $PHOME/MCloud
    mkdir $PHOME/MCloud/inet_side/received
    mkdir $PHOME/MCloud/inet_side/out

    chown -R $PUSER:$PUSER $PHOME/MCloud
    (cd $PHOME/MCloud/inet_side && pip install -r requirements.txt)
    

}

exec_client(){

    echo "creating folders..."
   
    if [ ! -d "$pullfolder" ]; then
        mkdir $pullfolder
    fi

    if [ ! -d "$pushfolder" ]; then
        mkdir $pushfolder
    fi
    if [ ! -d "$flushfolder" ]; then
        mkdir $flushfolder
    fi

    chown -R $USER:$USER .
    if ps ax | grep -v grep | grep "mongodb" > /dev/null; then
        echo "found mongodb running :)"

    else
        echo "mongodb is not running"
        echo "In order to run the client you need mongodb (or similar) running"
        echo "try:"
        echo "$ sudo nohup mongod &"
        echo "this will run mongod from the background"
        echo "if u wanna install: sudo apt-get install mongodb (debian based)"
    fi

    npm install -g create-react-app
    npm install -g concurrently
    echo
    echo
    npm i
    chown -R $USER:$USER .




}




case "$1" in

    "provider") exec_provider ;;
    "client") exec_client ;;
    *) usage ;; 
esac
