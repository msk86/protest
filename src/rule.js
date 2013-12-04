PT = window.PT || {};

PT.Rule = (function (root) {
    function Rule(name, klass, keyFields, valueRules) {
        this.name = name;
        this.klass = klass;
        this.keyFields = keyFields;
        this.constructorParams = detectConstructorParams(klass);
        this.valueRules = valueRules;
    }

    // json in format: [Person, 'name', 'age', 'gender', {}]
    function parseRule(name, json) {
        var klass = json[0];
        var keyFields = json.slice(1, json.length - 1);
        var valueRules = json.length == 1 ? {} : json[json.length - 1];
        return new Rule(name, klass, keyFields, valueRules);
    }

    function detectConstructorParams(klass) {
        var klassDesc = klass.toString();
        var constructorParams = klassDesc.match(/.*?\((.*?)\)/)[1];
        return constructorParams.replace(/\s/g, '').split(',');
    }

    Rule.parse = function(ruleName) {
        var ruleJson = root.Rules[ruleName];
        return parseRule(ruleName, ruleJson);
    };

    return Rule;

}(window));