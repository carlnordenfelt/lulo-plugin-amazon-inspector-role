'use strict';

var aws = require('aws-sdk');
var inspector = new aws.Inspector({apiVersion: '2016-02-16'});

var pub = {};

pub.validate = function (event) {
    if (!event.ResourceProperties.RoleArn) {
        throw new Error('Missing required property RoleArn');
    }
};

pub.create = function (event, _context, callback) {
    var params = {
        roleArn: event.ResourceProperties.RoleArn
    };
    inspector.registerCrossAccountAccessRole(params, function (error) {
        if (error) {
            return callback(error);
        }
        callback();
    });
};

pub.update = function (event, context, callback) {
    return pub.create(event, context, callback);
};

pub.delete = function (_event, _context, callback) {
    setImmediate(callback);
};

module.exports = pub;
