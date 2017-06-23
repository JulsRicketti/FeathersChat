'use strict';

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function() {
  return function(hook) {
    // The authenticated user
    const user = hook.params.user;
    // The actual message text
    const name = hook.data.name;
    const text = hook.data.text
      // Messages can't be longer than 400 characters
      .substring(0, 800)
      // Do some basic HTML escaping
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    
    const date = new Date();
    // Override the original data
    hook.data = {
      text,
      name,
      // Set the user id
      userId: user._id,
      // Add the current time via `getTime`
      createdAt: date.getFullYear()+'/'+date.getMonth()+'/'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()
    };

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};