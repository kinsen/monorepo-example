import { plus, logger, DelayTasks } from '@mkpoli-arithmetic/plus'
import { minus } from '@mkpoli-arithmetic/minus'

const redis = {
    host: '127.0.0.1',
    port: 6379
  };
  
  const request = (data: any):void =>{
    throw new Error("RequestE");
  }
  
  // function delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  
  function waitExit(): Promise<number> {
    return new Promise((resolve) => {
        console.log("Ctrl + C exit..");
        process.on('SIGINT', function () {
            console.log('Exit now!');
            // process.exit();
            resolve(1);
        });
    })
  }
  
  const main = async (): Promise<void> => {
  
    logger.info("START:");
  
    const dt = new DelayTasks({
        id: 'http-retry',
        redis: redis,
        callback: function (data: any, taskId: any, dueTime: any): void{
            logger.info("callback...");
            // A task is ready to be tried again
            try {
                request(data);
            } catch (e) {
                // console.error(this);
                // It failed again, try in another 5 seconds
                (this! as DelayTasks).add(1000, data);
            }
        }
    });
  
    // Start polling
    dt.start();
  
    try {
        // `request` would be your http request library of choice
        request({
            method: 'POST',
            url: '/foo',
            data: { foo: 'bar' }
        });
  
    } catch (e) {
        // There was an error, try again in 5 seconds
        dt.add(1000, {data:{foo:"bar"}});
    }
  
    logger.info("HELLO");
    // await delay(2000);
    await waitExit();
    logger.info("DONE");
  
    // Don't forget to clean up later: `dt.stop()`
    dt.stop();
    // redis.disconnect();
  }
  
  
  main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });