const logger = (() => {
    
    const print = ( type: string, message: any ) => {
            switch( type ) {
                case 'info':
                    console.info(message);
                    break;
                case 'warn':
                    console.warn(message);
                    break;
                case 'error':
                    console.error(message);
                    break;
                case 'trace':
                    console.trace(message);
                    break;
                case 'debug':
                default:
                    console.log(message);
            }
    };
    
    return {
        debug: print.bind(null, 'debug'),
        info: print.bind(null, 'info'),
        warn: print.bind(null, 'warn'),
        error: print.bind(null, 'error'),
        trace: print.bind(null, 'trace'),
    };
})();

export default logger;
