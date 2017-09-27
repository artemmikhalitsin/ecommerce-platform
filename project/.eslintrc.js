module.exports = {
    "extends": "google",
    "parserOptions": {
      "ecmaVersion": 6
    },
    "rules": {
        "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"]
    }
};
