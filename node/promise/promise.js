class Promise2 {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(fn) {
        this.value = '';
        this.status = 'pending';
        this.callbacks = [];

        fn(this.resolve.bind(this), this.reject.bind(this));
    }
    resolve(data) {
        if (this.status === Promise2.PENDING) {
            this.status = Promise2.FULFILLED;
            this.value = data;

            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onFulfilled(this.value);
                });
            });
        }
    }
    reject(data) {
        if (this.status === Promise2.PENDING) {
            this.status = Promise2.REJECTED;
            this.value = data;

            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onRejected(data);
                });
            });
        }
    }
    then(onFulfilled, onRejected) {
        return new Promise2((resolve, reject) => {
            if (typeof onFulfilled !== 'function') {
                onFulfilled = () => this.value;
            }
            if (typeof onFulfilled !== 'function') {
                onRejected = () => this.value;
            }
            if (this.status === Promise2.PENDING) {
                this.callbacks.push({
                    onFulfilled(value) {
                        try {
                            const result = onFulfilled(value);
                            if (result instanceof Promise2) {
                                result.then(resolve, reject);
                            }
                            else {
                                resolve(result);
                            }
                        }
                        catch (e) {
                            reject(e);
                        }
                    },
                    onRejected(value) {
                        try {
                            const result = onRejected(value);
                            if (result instanceof Promise2) {
                                result.then(resolve, reject);
                            }
                            else {
                                resolve(result);
                            }
                        }
                        catch (e) {
                            reject(e);
                        }
                    }
                });
            }
            if (this.status === Promise2.FULFILLED) {
                setTimeout(() => {
                    try {
                        const result = onFulfilled(this.value);
                        if (result instanceof Promise2) {
                            result.then(resolve, reject);
                        }
                        else {
                            resolve(result);
                        }
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            if (this.status === Promise2.REJECTED) {
                setTimeout(() => {
                    try {
                        const result = onRejected(this.value);
                        if (result instanceof Promise2) {
                            result.then(resolve, reject);
                        }
                        else {
                            resolve(result);
                        }
                    }
                    catch (e) {
                        onRejected(e);
                    }
                });
            }
        });
    }
}

module.exports = Promise2;
