(function ($) {
    "use strict";

    QUnit.test("jquery.app", function(assert) {
        $.app.define('test', 'okay');
        $.app.define('new_object', {
            test: 'test'
        });

        assert.throws(
            function() {
                $.app.define('test', 'test');
            },
            "redefine error"
        );

        assert.equal('okay', $.app.get('test'), 'property test');
        assert.deepEqual($.app.get('new_object'), {
            test: 'test'
        }, 'property new_object');

        assert.ok(!$.app.has('undefined'), 'not has');
        assert.ok($.app.has('test'), 'has test');
        assert.ok($.app.has('new_object'), 'has new_object');

        $.app.trans.add({
            trans1: 'text 1',
            trans2: 'text 2'
        });

        assert.throws(
            function() {
                $.app.trans.add({
                    trans3: 'text 3',
                    trans1: 'fail'
                });
            },
            "redefine translation error"
        );

        assert.ok($.app.trans.get('undefined_text') === 'undefined_text', 'translation is undefined');
        assert.ok($.app.trans.get('trans1') === 'text 1', 'trans1 ok');
        assert.ok($.app.trans.get('trans2') === 'text 2', 'trans2 ok');
        assert.ok($.app.trans.get('trans3') === 'text 3', 'trans3 ok');

        $.app.theme.addElement({
            name: 'header',
            selector: '#header'
        });

        $.app.theme.addElement({
            name: 'page',
            selector: '#page'
        });

        $.app.theme.addElement({
            name: 'menu',
            selector: '> .menu',
            parent: 'header'
        });

        $.app.theme.addElement({
            name: 'content',
            selector: '.content',
            parent: 'page'
        });

        var done1 = assert.async();
        $.app.theme.ready(function () {
            var header = $('#header'),
                page = $('#page');

            assert.ok(!$.app.theme.hasElement('test'), 'theme not has element');
            assert.ok($.app.theme.element('test') === undefined, 'theme element "test" is undefined');
            assert.ok($.app.theme.element('header').is(header), 'header is ok');
            assert.ok($.app.theme.element('page').is(page), 'page is ok');
            assert.ok($.app.theme.element('menu').is(header.find('.menu')), 'menu is ok');
            assert.ok($.app.theme.element('content').is(page.find('.content')), 'content is ok');

            assert.ok(true, 'ready ok');
            done1();
        });

        var done2 = assert.async();
        $.app.theme.ready(function () {
            assert.ok(true, 'load ok');
            done2();
        });

        $.app.theme.init();
        $.app.theme.registerListeners();
    });
}(jQuery));
