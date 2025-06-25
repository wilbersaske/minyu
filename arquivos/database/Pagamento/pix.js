const axios = require("axios");

const ACCESS_TOKEN = 'APP_USR-3340000701312861-062610-4c16352890fc37c8db37ac026798fc1c-1152040212';

// Cria pagamento PIX via Mercado Pago
async function criarPagamentoPix(valorCompra, descricao, idempotencyKey) {
    const payment_data = {
        transaction_amount: valorCompra,
        description: descricao || 'Pagamento via PIX',
        payment_method_id: "pix",
        payer: {
            email: "jeovajmp600@gmail.com",  // Pode tornar dinâmico depois
            first_name: "Cliente",
            last_name: "Teste",
            identification: {
                type: "CPF",
                number: "12345678909"
            }
        }
    };

    try {
        const response = await axios.post(
            'https://api.mercadopago.com/v1/payments',
            payment_data,
            {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                    'X-Idempotency-Key': idempotencyKey
                }
            }
        );

        if (response.data && response.data.point_of_interaction) {
            const pagamento = response.data;
            return {
                id: pagamento.id,
                qr_code: pagamento.point_of_interaction.transaction_data.qr_code,
                qr_code_base64: pagamento.point_of_interaction.transaction_data.qr_code_base64
            };
        } else {
            throw new Error('Resposta da API não contém QR code');
        }
    } catch (error) {
        console.error('Erro ao criar o pagamento:', error.response ? error.response.data : error.message);
        throw new Error('Erro ao criar o pagamento');
    }
}

// Verifica status do pagamento PIX pelo id
async function verificarPix(pagamentoId) {
    try {
        const response = await axios.get(
            `https://api.mercadopago.com/v1/payments/${pagamentoId}`,
            {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        return response.data;  // Retorna o objeto pagamento completo com o status
    } catch (error) {
        console.error('Erro ao verificar pagamento:', error.response ? error.response.data : error.message);
        throw new Error('Erro ao verificar pagamento');
    }
}

module.exports = { criarPagamentoPix, verificarPix };