module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      // esse plugin é para fazer o build do module-resolver, 
      // caso não use não precisa colocar
      "module-resolver",
      {
        // coloque todas as linhas da propriedade paths do arquivo tsconfig.json
        // remova o trecho /* do nome e do caminho 
        // complete o caminho relativo do diretório
        alias: {
          //antes: "@modules/*": "modules/*" depois: "@modules": "./src/modules",
          "@modules": "./src/modules",
          "@config": "./src/config",
          "@shared": "./src/shared",
          "@errors": "./src/errors",
          "@utils": "./src/utils"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ]
}