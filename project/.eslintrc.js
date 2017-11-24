module.exports = {
  "extends": "google",
  "parserOptions": {
          					"ecmaVersion": 6,
                    "sourceType": "module"
  								 },
  "rules": {
            "linebreak-style": ["error", "unix"],
						"require-jsdoc": ["error", {
							"require": {
								"FunctionDeclaration": false,
								"MethodDefinition": false,
								"ClassDeclaration": false,
								"ArrowFunctionExpression": true
							}
						}]
					},
};
