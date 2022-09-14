// agrupa os teste e da um nome para o grupo
describe("Criar categoria", () => {
  // Cria um teste que verificar se a operação resulta no valor esperado
  it("espero que 2 + 2 seja 4", () => {
    const soma = 2 + 2;
    const resultadoEsperado = 4;

    // Verifica se o resultado é um valor válido
    expect(soma).toBe(resultadoEsperado);
  });

  // Cria um teste que verificar se a operação não resulta em um valor errado
  it("espero que 2 + 2 não seja 5", () => {
    const soma = 2 + 2;
    const resultadoErrado = 5;

    // Verifica se o resultado não é um valor inválido
    expect(soma).not.toBe(resultadoErrado);
  });
});
