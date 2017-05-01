#!/bin/bash


PUSER=mcloud
PPASS=mcloud

usage(){

    echo
    echo "Usage: install.sh [mode]"
    echo "MODE OPTIONS:"
    echo "provider:"
    echo "          install default setup for provider"
    echo "          You need to have a stable server with a good connection/Internet access"
    echo
    echo "client:"
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
            useradd -m -d /home/mcloud -s /bin/bash -c "user 4 mcloud service" -U $PUSER
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



}

exec_client(){
    echo "im the client"


}




case "$1" in

    "provider") exec_provider ;;
    "cliente") exect_client ;;
    *) usage ;; 
esac
