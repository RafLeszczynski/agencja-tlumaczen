import winston from 'winston';

export default new winston.Logger({
	level: 'warn',
	transports: [
		new winston.transports.Console({colorize: true})
	]
});
