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
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          ['h', 'when external data recieved', 'on_external_data'],
          ['R', 'get external data with address %s and type %s', 'get_external_data', '', '']
        ]
    };

    // Register the extension
    ScratchExtensions.register('More Blocks', descriptor, ext);
})({});
