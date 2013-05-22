Ext.define('Calculator.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.calculator.Calculator',
        'Ext.form.field.calculator.Picker'
    ],

    items: [{
        xtype: 'form',
        title: 'Calculator Fields',
        items: [
            { xtype: 'calculatorfield' },
            { xtype: 'calculatorpicker' }
        ]
    }]
});
