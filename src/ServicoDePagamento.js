export default class ServicoDePagamento {
  constructor() {
    this.pagamentos = [];
  }

  pagar(codigoBarras, empresa, valor) {
    const pagamento = {
      codigoBarras,
      empresa,
      valor,
      categoria: valor > 100 ? 'cara' : 'padrão'
    };

    this.pagamentos.push(pagamento);
  }

  consultarUltimoPagamento() {
    return this.pagamentos[this.pagamentos.length - 1];
  }
}

/*
const servicoDePagamento = new ServicoDePagamento();

servicoDePagamento.pagar('1234-5678-9101', 'Samsung', 250.99);

console.log(servicoDePagamento.consultarUltimoPagamento());

*/
