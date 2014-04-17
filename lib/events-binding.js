function EventsBinding(options) {
    var self = this;

    if (!(self instanceof EventsBinding)) {
        return new EventsBinding(options);
    }

    var options = options || {},
        maxListeners = options.maxListeners || 10;

    self.fns = [];
    self._maxListeners = parseInt(maxListeners);

    return self;
};

EventsBinding.prototype.on = function(key, fn) {
    var self = this;

    if (self.fns.length + 1 <= self._maxListeners || self._maxListeners == 0) {

        self.fns.push({
            'key': key,
            'fn': fn
        });
    }

    return self;
};

EventsBinding.prototype.once = function(key, fn) {
    var self = this;

    self.fns.push({
        'key': key,
        'fn': fn,
        'once': true
    });

    return self;
};

EventsBinding.prototype.off = function(key) {
    var self = this;

    self.fns = self.fns.filter(function(e) {
        if (e.key !== key) {
            return e;
        }
    });

    return self;
};

EventsBinding.prototype.maxListeners = function(n) {
    var self = this;

    if(typeof n == 'number') {
        self._maxListeners = n;

        return self;
    } else {
        return self._maxListeners;
    }
};

EventsBinding.prototype.emit = function(key) {
    var self = this,
        args = Array.prototype.slice.call(arguments, 1);

    self.fns.forEach(
        function(e) {
            var reg = e.key,
                reg = reg.replace(/\./g, "[.]"),
                reg = reg.replace(/\*/g, "[a-z0-9.]*");

            var regexp = new RegExp(reg, "gi"),
                result = regexp.exec(key);

            if (result && result[0] == key) {
                e.fn.apply(self, args);

                if (e.once) {
                    self.off(e.key);
                }
            }
        }
    );

    return self;
};

module.exports = EventsBinding;