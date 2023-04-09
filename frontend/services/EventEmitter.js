export class EventEmitter {
    listeners = {} // Key-value pair
    addListener(event, fn) {
        this.listeners[event] = this.listeners[event] || [] // undefined || [] -> [] 
        this.listeners[event].push(fn)
        return this;
    }
    on(event, fn) {
        this.addListener.addListener(event, fn)
    }
    
    removeListener(event, fn) {
        this.listeners[event] = this.listeners[event].filter((elem) => elem !== fn)
        return this
    }
    off(event, fn) {
        this.removeListener(event,fn)
    }
    
    once(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        onceDecorator = () => {
            fn();
            this.off(event,onceDecorator)
        }
        this.listeners[event].push(onceDecorator)
        return this;
    }
    
    emit(event, ...args) { 
        let emitter = this.listeners[event]
        if (!emitter) return false;
        console.log(emitter);
        emitter.forEach((f) => {
            console.log(f);
            f(...args)
        })
        return true;
    }
    
    listenerCount(eventName) {
        return this.listeners[eventName].length;
    }
    
    rawListeners(eventName) {
        return this.listeners[eventName];
    }
}
