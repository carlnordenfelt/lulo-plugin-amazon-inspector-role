'use strict';

var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');

describe('Index unit tests', function () {
    var subject;
    var registerCrossAccountAccessRoleStub = sinon.stub();
    var event;

    before(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false
        });

        var awsSdkStub = {
            Inspector: function () {
                this.registerCrossAccountAccessRole = registerCrossAccountAccessRoleStub;
            }
        };

        mockery.registerMock('aws-sdk', awsSdkStub);
        subject = require('../../src/index');
    });
    beforeEach(function () {
        registerCrossAccountAccessRoleStub.reset().resetBehavior();
        registerCrossAccountAccessRoleStub.yields();
        event = {
            ResourceProperties: {
                RoleArn: 'RoleArn'
            }
        };
    });
    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('validate', function () {
        it('should succeed', function (done) {
            subject.validate(event);
            done();
        });
        it('should fail if RoleArn is not set', function (done) {
            delete event.ResourceProperties.RoleArn;
            function fn () {
                subject.validate(event);
            }
            expect(fn).to.throw(/Missing required property RoleArn/);
            done();
        });
    });

    describe('create', function () {
        it('should succeed', function (done) {
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(undefined);
                expect(response).to.equal(undefined);
                expect(registerCrossAccountAccessRoleStub.calledOnce).to.equal(true);
                done();
            });
        });
        it('should fail due to registerCrossAccountAccessRole error', function (done) {
            registerCrossAccountAccessRoleStub.yields('registerCrossAccountAccessRole');
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal('registerCrossAccountAccessRole');
                expect(response).to.equal(undefined);
                expect(registerCrossAccountAccessRoleStub.calledOnce).to.equal(true);
                expect(response).to.equal(undefined);
                done();
            });
        });
    });

    describe('update', function () {
        it('should succeed', function (done) {
            subject.update(event, {}, function (error, response) {
                expect(error).to.equal(undefined);
                expect(response).to.equal(undefined);
                expect(registerCrossAccountAccessRoleStub.calledOnce).to.equal(true);
                done();
            });
        });
    });

    describe('delete', function () {
        it('should succeed', function (done) {
            subject.delete(event, {}, function (error, response) {
                expect(error).to.equal(undefined);
                expect(response).to.equal(undefined);
                expect(registerCrossAccountAccessRoleStub.called).to.equal(false);
                done();
            });
        });
    });
});
