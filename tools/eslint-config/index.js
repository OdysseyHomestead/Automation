/**
 * Central ESLint config to enforce boundaries and consistency.
 */
module.exports = {
  root: true,
  env: { es2022: true, node: true, browser: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module", project: null },
  plugins: ["import", "unused-imports"],
  extends: ["eslint:recommended", "plugin:import/recommended", "plugin:import/typescript", "prettier"],
  settings: {
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.base.json"],
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "import/no-unresolved": [
      "error",
      { "ignore": ["^react$", "^react-dom$"] }
    ],
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["apps/*"],
            "message": "Do not import from other apps; depend via packages instead.",
          },
          {
            "group": ["@automation/*/*"],
            "message": "No deep imports across packages. Import from package root only.",
          }
        ]
      }
    ],
    "unused-imports/no-unused-imports": "error"
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
