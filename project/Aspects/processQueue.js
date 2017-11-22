class ProcessQueue {
  constructor() {
    this.processList = [];
    this.busy = false;
  }

  adminReq(joinpoint, req, res) {
    joinpoint.args[0] = req;
    joinpoint.args[1] = res;
    this.processList.push(joinpoint);
    // console.log(this.processList);
    this.runNext();
  }

  clientReq(joinpoint, req, res) {
    joinpoint.args[0] = req;
    joinpoint.args[1] = res;
    this.processList.unshift(joinpoint);
    // console.log(this.processList);
    this.runNext();
  }

  anonReq(joinpoint) {
    this.processList.unshift(joinpoint);
    // console.log(this.processList);
    this.runNext();
  }

  runNext() {
    if (!this.busy && this.processList.length > 0) {
      this.busy = true;
      this.run(this.processList.pop());
      // console.log(this.processList);
      this.busy = false;
    }
    // whether request is processed or not,
    // run next if there is one and not busy
    // else run it later
    // to be noted that run next requests are only CREATED when sent to queue
    if (this.processList.length > 0) {
      if (this.busy) {
        setTimeout(this.runNext(), 200);
      } else {
        this.runNext();
      }
    }
  }

  run(joinpoint) {
    return joinpoint.proceed();
  }
}

module.exports = ProcessQueue;
