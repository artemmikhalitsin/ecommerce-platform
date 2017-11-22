module.exports = {
  "extends": "google",
  "parserOptions": {
          					"ecmaVersion": 6
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
