import assert from 'assert';
import ServicoDePagamento from "../src/ServicoDePagamento.js";

describe('Classe de serviço de pagamento', function () {

  it('Validar que um pagamento MAIOR que R$ 100,00 reais é caro', function () {

    const servicoDePagamento = new ServicoDePagamento();
    servicoDePagamento.pagar('1234-5678-9101', 'Samsung', 145.99);
    const retorno = servicoDePagamento.consultarUltimoPagamento();
    assert.equal(retorno.categoria, 'cara');

  });

  it('Validar que um pagamento MENOR ou IGUAL a R$ 100,00 reais é padrão', function () {

    const servicoDePagamento = new ServicoDePagamento();
    servicoDePagamento.pagar('1234-5678-9101', 'Samsung', 99.99);
    const retorno = servicoDePagamento.consultarUltimoPagamento();
    assert.equal(retorno.categoria, 'padrão');

  });

  it('Validar método de consultar último pagamento', function () {

    const servicoDePagamento = new ServicoDePagamento();
    servicoDePagamento.pagar('0001', 'Xiaomi', 76.00);
    servicoDePagamento.pagar('0002', 'Apple', 299.00);
    const retorno = servicoDePagamento.consultarUltimoPagamento();
    assert.equal(retorno.valor, 299.00);

  });

  it('Validar retorno undefined quando não existir pagamento', function () {

    const servicoDePagamento = new ServicoDePagamento();
    const retorno = servicoDePagamento.consultarUltimoPagamento();
    assert.equal(retorno, undefined);

  });

});