#!/bin/bash

USER=$(stat -c '%U' .)

PUSER=mcloud
PPASS=mcloud
PHOME=/home/mcloud

pushfolder="src/core/push"
pullfolder="src/core/pull"
flushfolder="src/core/flush"


# Usage info
show_help() {
cat << EOF
Usage: ${0##*/} [-hvd] [-t TYPE]
Do stuff to install MCloud in different ways 


    -h          display this help and exit
    -t TYPE     choose the type you wanna install 
    -v          verbose mode. Can be used multiple times for increased
                verbosity.
    -d          dev mode. Only if you want to develop and test the system

    TYPE -t OPTIONS:
    
    client:
        **NEEDS ROOT MODE: sudo ./install.sh client**
        install default setup for client
        this side of the system if th eclient, you need a provider attending to this client"
        in order to get working properly
        this side is supposed to have bad connection limited by local timetable

    provider:
        **NEEDS ROOT MODE: sudo ./install.sh provider**
        install default setup for provider
        you need to have a stable server with a good connection/internet access
EOF
}

# Initialize our own variables:
output_file=""
verbose=0
DEV=0

OPTIND=1
# Resetting OPTIND is necessary if getopts was used previously in the script.
# It is a good idea to make OPTIND local if you process options in a function.

while getopts hvdt: opt; do
    case $opt in
        h)
            show_help
            exit 0
            ;;
        v)  verbose=$((verbose+1))
            ;;
        d)  DEV=$((DEV+1)) 
            ;; 
        t)  arg_type=$OPTARG
            ;;
        *)
            show_help >&2
            exit 1
            ;;
    esac
done
shift "$((OPTIND-1))" # Shift off the options and optional --.

# Everything that's left in "$@" is a non-option.  In our case, a FILE to process.
#printf 'verbose=<%d>\ntype=<%s>\nLeftovers:\n' "$vierbose" "$arg_type"
#printf '<%s>\n' "$@"


echo welcome
echo $arg_type
case "$arg_type" in
    "provider")

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

        if [ "$DEV" -gt 0 ]; then
        
            echo "creating dev links!"
            cp -as "$(pwd)/inet_side" $PHOME/MCloud/inet_side
        else
            cp -r inet_side $PHOME/MCloud
        fi

        mkdir $PHOME/MCloud/inet_side/received
        mkdir $PHOME/MCloud/inet_side/out

        chown -R $PUSER:$PUSER $PHOME/MCloud
        (cd $PHOME/MCloud/inet_side && pip install -r requirements.txt)



        ;;
    "client")

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
        ;;
esac



