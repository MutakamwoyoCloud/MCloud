var config = {};
config.startTime = {}; 
	config.startTime.hour = 20;
	config.startTime.minute = 00;
config.endTime = {};
	config.endTime.hour = 4;
	config.endTime.minute = 00;

config.user = "mcloud";
config.password = "mcloud";
config.ipMcloud = "localhost";
config.portMcloud = 21;

config.folderSend = "received/";

module.export = config;