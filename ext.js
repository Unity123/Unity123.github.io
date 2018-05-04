(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    var done_with_request = false;

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    ext.get_external_data = function(address, type, callback){
      $.ajax({url: address, dataType: type, success: function(data){
        done_with_request = true;
        callback(data);
      }});
    }
    
    ext.on_external_data = function() {
      if (done_with_request === true) {
        done_with_request = false;
        return true;
      }
      return false;
    }
    
    ext.is_data_ready = function() {
      if (done_with_request === true) {
        done_with_request = false;
        return true;
      }
      return false;
    }
    
    ext.eval_js = function(js) {
      eval(js);
    }
    
    ext.eval_js_with_return = function(js) {
      var result = eval(js);
      return result;
    }
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['h', 'when external data recieved', 'on_external_data'],
          ['R', 'get external data with address %s and type %s', 'get_external_data', '', ''],
          ['b', 'is external data ready', 'is_data_ready'],
          [' ', 'execute js %s', 'eval_js', "console.log('hello world')"],
          ['r', 'execute js and return %s', 'eval_js_with_return', "prompt('whats your name')"],
        ]
    };

    // Register the extension
    ScratchExtensions.register('More Blocks', descriptor, ext);
})({});
