Ext.define('Ext.form.field.calculator.Calculator', {
    extend: 'Ext.form.field.TextArea',
    xtype: 'calculatorfield',

    requires: [
        'Ext.button.Button'
    ],

    fieldBodyCls: Ext.baseCSSPrefix + 'calculator',
    fieldCls: Ext.baseCSSPrefix + 'calculator-input',

    /**
     * @cfg {String} The UI to use for the calculator buttons.
     */
    buttonUI: 'default',

    /**
     * @cfg {String} The scale (small/medium/large) to use for the calculator buttons.
     */
    buttonScale: 'medium',

    /**
     * @cfg {Number} the width of the calculator buttons
     */
    buttonWidth: 36,

    /**
     * @cfg {Number} buttonHeight
     * The height of the calculator buttons.  Defaults to the default behavior of buttons - 
     * shrink wrap height
     */

    operatorRe: /\/|\*|-|\+|=/,

    rows: 2,
    
    fieldSubTpl: [
        '{% var cmp = values.$comp %}',
        '{[cmp.getParentSubTplMarkup(values)]}',
        '<table class="', Ext.plainTableCls, '">',
            '<tr>',
                '<td>{[cmp.getButtonMarkup("C")]}</td>',
                '<td>{[cmp.getButtonMarkup("(")]}</td>',
                '<td>{[cmp.getButtonMarkup(")")]}</td>',
                '<td>{[cmp.getButtonMarkup("\u2190")]}</td>',
            '</tr>',
            '<tr>',
                '<td>{[cmp.getButtonMarkup(7)]}</td>',
                '<td>{[cmp.getButtonMarkup(8)]}</td>',
                '<td>{[cmp.getButtonMarkup(9)]}</td>',
                '<td>{[cmp.getButtonMarkup("\u00f7")]}</td>',
            '</tr>',
            '<tr>',
                '<td>{[cmp.getButtonMarkup(4)]}</td>',
                '<td>{[cmp.getButtonMarkup(5)]}</td>',
                '<td>{[cmp.getButtonMarkup(6)]}</td>',
                '<td>{[cmp.getButtonMarkup("\u00d7")]}</td>',
            '</tr>',
            '<tr>',
                '<td>{[cmp.getButtonMarkup(1)]}</td>',
                '<td>{[cmp.getButtonMarkup(2)]}</td>',
                '<td>{[cmp.getButtonMarkup(3)]}</td>',
                '<td>{[cmp.getButtonMarkup("\u2212")]}</td>',
            '</tr>',
            '<tr>',
                '<td>{[cmp.getButtonMarkup(0)]}</td>',
                '<td>{[cmp.getButtonMarkup(".")]}</td>',
                '<td>{[cmp.getButtonMarkup("=")]}</td>',
                '<td>{[cmp.getButtonMarkup("+")]}</td>',
            '</tr>',
        '</table>'
    ],

    initComponent: function() {
        var me = this;

        me.callParent();

        me.buttons = [];

        me.addEvents(
            /**
             * @event equals
             * Fires when the equals button is pressed.
             * @param {Ext.form.field.calculator.Calculator} this
             */
            'equals'
        );
    },

    onRender: function() {
        var me = this;
        me.callParent();
        me.bodyEl.on('click', me.onBodyClick, me);
    },

    onBodyClick: function(e) {
        var me = this,
            buttonEl = Ext.fly(e.target).up('.x-btn'),
            buttonValue, currentValue, newValue;

        if (buttonEl) {
            buttonValue = Ext.getCmp(buttonEl.id).value;
            currentValue = me.getValue();
            if (buttonValue === '=') {
                try {
                    /*jslint evil: true */
                    newValue = eval(currentValue);
                    /*jslint evil: false */
                } catch (e) {
                    newValue = 'Error';
                }
            } else {
                if (me.operatorRe.test(buttonValue)) {
                    newValue = currentValue + ' ' + buttonValue + ' ';
                } else {
                    newValue = currentValue + buttonValue;
                }
            }

            if (newValue) {
                me.setValue(newValue);
            }
        }
    },

    getParentSubTplMarkup: function(values) {
        var me = this,
            proto = me.self.prototype;

        if (!proto.parentFieldSubTpl) {
            proto.parentFieldSubTpl = me.superclass.fieldSubTpl;
        }

        return me.getTpl('parentFieldSubTpl').apply(values);
    },

    getButtonMarkup: function(text, value, ui, scale, width, height) {
        var me = this;

        var button = new Ext.button.Button({
            text: text + '',
            value: value || text,
            ui: ui || me.buttonUI,
            scale: scale || me.buttonScale,
            width: width || me.buttonWidth,
            height: height || me.buttonHeight
        });

        me.buttons.push(button);
        
        return Ext.DomHelper.markup(button.getRenderTree());
    },

    getSubTplData: function() {
        var data = this.callParent();

        data.$comp = this;

        return data;
    },


    finishRenderChildren: function() {
        var buttons = this.buttons,
            length = buttons.length,
            i = 0;

        for (; i < length; i++) {
            buttons[i].finishRender();
        }
    }
});