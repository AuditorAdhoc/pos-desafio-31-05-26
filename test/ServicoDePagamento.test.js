import assert from 'assert';
import ServicoDePagamento from "../src/ServicoDePagamento.js";

describe('Classe de serviço de pagamento', function () {

  it('Validar que um pagamento MAIOR que R$ 100,00 reais é caro', function () {

    const servicoDePagamento = new ServicoDePagamento();
    servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
    const retorno = servicoDePagamento.consultarUltimoPagamento();
    assert.equal(retorno.categoria, 'cara');

  });

  it('Validar que um pagamento MENOR ou IGUAL a R$ 100,00 reais é padrão', function () {

    const servicoDePagamento = new ServicoDePagamento();
    servicoDePagamento.pagar('1111-2222-3333', 'Empresa XPTO', 99.99);
    const retorno = servicoDePagamento.consultarUltimoPagamento();
    assert.equal(retorno.categoria, 'padrão');

  });

  it('Validar método de consultar último pagamento', function () {

    const servicoDePagamento = new ServicoDePagamento();
    servicoDePagamento.pagar('0001', 'Empresa A', 50.00);
    servicoDePagamento.pagar('0002', 'Empresa B', 250.00);
    const retorno = servicoDePagamento.consultarUltimoPagamento();
    assert.equal(retorno.valor, 250.00);

  });

  it('Validar retorno undefined quando não existir pagamento', function () {

    const servicoDePagamento = new ServicoDePagamento();
    const retorno = servicoDePagamento.consultarUltimoPagamento();
    assert.equal(retorno, undefined);

  });

});